import React, { useEffect } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { isAuthenticated } from './AdminLogin';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin | HarvestFarm';
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/admin/testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-harvest-brown text-white md:min-h-screen flex flex-col sticky top-0 z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded bg-white p-1" />
          <span className="font-black tracking-widest text-sm">ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-harvest-gold text-harvest-brown shadow-lg' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <ArrowLeft size={16} /> View Live Site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors w-full text-left">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-[100vw]">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
