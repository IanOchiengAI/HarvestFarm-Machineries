import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Testimonial, Category } from '../types';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, PHONE_NUMBER, WHATSAPP_LINK } from '../constants';

export interface AdminSettings {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  officeHours: string;
  adminPin: string;
}

const DEFAULT_SETTINGS: AdminSettings = {
  phone: PHONE_NUMBER,
  whatsapp: WHATSAPP_LINK,
  email: 'info@harvestfarm.co.ke',
  location: 'Nakuru Industrial Area, Nakuru, Kenya',
  officeHours: 'Mon-Sat: 8am - 6pm',
  adminPin: '1234'
};

interface AppData {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  settings: AdminSettings;
}

interface DataContextType extends AppData {
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateSettings: (updates: Partial<AdminSettings>) => void;
  resetToDefaults: () => void;
  importData: (data: string) => boolean;
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEY = 'harvestfarm_data_v3';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local data', e);
      }
    }
    return {
      products: PRODUCTS,
      categories: CATEGORIES,
      testimonials: TESTIMONIALS,
      settings: DEFAULT_SETTINGS
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const addProduct = (product: Product) => {
    setData(prev => ({ ...prev, products: [...prev.products, product] }));
  };

  const deleteProduct = (id: string) => {
    setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setData(prev => ({ ...prev, testimonials: [...prev.testimonials, testimonial] }));
  };

  const deleteTestimonial = (id: string) => {
    setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
  };

  const updateSettings = (updates: Partial<AdminSettings>) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }));
  };

  const resetToDefaults = () => {
    setData({
      products: PRODUCTS,
      categories: CATEGORIES,
      testimonials: TESTIMONIALS,
      settings: DEFAULT_SETTINGS
    });
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products && parsed.settings) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  };

  return (
    <DataContext.Provider value={{
      ...data,
      updateProduct, addProduct, deleteProduct,
      updateTestimonial, addTestimonial, deleteTestimonial,
      updateSettings, resetToDefaults, importData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
