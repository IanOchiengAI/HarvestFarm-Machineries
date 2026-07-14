import React, { createContext, useContext, useState, useEffect } from 'react';

interface EventStat {
  id: string;
  eventName: string;
  timestamp: number;
  data?: any;
}

interface StatsData {
  events: EventStat[];
}

interface StatsContextType {
  events: EventStat[];
  trackAdminEvent: (eventName: string, data?: any) => void;
  clearStats: () => void;
  getEventCount: (eventName: string) => number;
}

const StatsContext = createContext<StatsContextType | null>(null);

const STATS_STORAGE_KEY = 'harvestfarm_stats_v1';

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<StatsData>(() => {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local stats', e);
      }
    }
    return { events: [] };
  });

  useEffect(() => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const trackAdminEvent = (eventName: string, data?: any) => {
    const newEvent: EventStat = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      timestamp: Date.now(),
      data
    };
    setStats(prev => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  const clearStats = () => {
    setStats({ events: [] });
  };

  const getEventCount = (eventName: string) => {
    return stats.events.filter(e => e.eventName === eventName).length;
  };

  return (
    <StatsContext.Provider value={{
      events: stats.events,
      trackAdminEvent,
      clearStats,
      getEventCount
    }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStats must be used within StatsProvider');
  return ctx;
};

// Global reference for the analytics service to hook into
let trackAdminEventGlobal: ((name: string, data?: any) => void) | null = null;

export const setGlobalAdminTracker = (tracker: (name: string, data?: any) => void) => {
  trackAdminEventGlobal = tracker;
};

export const dispatchAdminEvent = (name: string, data?: any) => {
  if (trackAdminEventGlobal) {
    trackAdminEventGlobal(name, data);
  }
};
