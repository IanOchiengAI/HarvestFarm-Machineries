import React from 'react';
import { useData } from '../../store/DataContext';
import { useStats } from '../../store/StatsContext';
import { Package, MessageSquare, BarChart3, TrendingUp, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { products, testimonials, categories } = useData();
  const { getEventCount, events } = useStats();

  const whatsappClicks = getEventCount('whatsapp_click');
  const callClicks = getEventCount('call_click');
  const productViews = getEventCount('product_view');

  const recentEvents = [...events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

  return (
    <div>
      <h1 className="text-3xl font-black text-harvest-brown mb-2 tracking-tight">Dashboard</h1>
      <p className="text-gray-500 mb-8 font-medium">Welcome to your HarvestFarm command center.</p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-harvest-green/10 p-4 rounded-2xl">
            <Package className="text-harvest-green" size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Catalog</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">{products.length}</span>
              <span className="text-sm font-bold text-gray-500">Products</span>
            </div>
            <p className="text-xs font-semibold text-harvest-green mt-1">in {categories.length} categories</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-[#25D366]/10 p-4 rounded-2xl">
            <MessageCircle className="text-[#25D366]" size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp Leads</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">{whatsappClicks}</span>
              <span className="text-sm font-bold text-gray-500">Clicks</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-harvest-orange/10 p-4 rounded-2xl">
            <BarChart3 className="text-harvest-orange" size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Engagement</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">{productViews}</span>
              <span className="text-sm font-bold text-gray-500">Prod. Views</span>
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-1">{callClicks} Phone Calls</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-harvest-green" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="bg-gray-50 p-4 rounded-2xl border-2 border-transparent hover:border-harvest-green transition-all group flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Package size={20} className="text-harvest-brown" />
              </div>
              <span className="font-bold text-sm text-gray-800">Manage Products</span>
            </Link>
            <Link to="/admin/testimonials" className="bg-gray-50 p-4 rounded-2xl border-2 border-transparent hover:border-harvest-green transition-all group flex flex-col items-center text-center">
              <div className="bg-white p-3 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare size={20} className="text-harvest-brown" />
              </div>
              <span className="font-bold text-sm text-gray-800">Manage Reviews</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            Activity Log
          </h2>
          {recentEvents.length > 0 ? (
            <div className="space-y-4">
              {recentEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{event.eventName}</p>
                    {event.data?.product_name && (
                      <p className="text-xs text-gray-500 font-medium truncate max-w-[200px]">{event.data.product_name}</p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-400">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm font-medium text-gray-400">No activity recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
