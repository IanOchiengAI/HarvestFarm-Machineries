import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { useData } from '../../store/DataContext';

export const isAuthenticated = () => sessionStorage.getItem('admin_auth') === 'true';

const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { settings } = useData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === settings.adminPin) {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-harvest-cream flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="bg-harvest-brown p-3 rounded-2xl inline-block mb-4 shadow-xl">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="text-2xl font-black text-harvest-brown">Admin Panel</h1>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-gray-100">
        <div className="flex justify-center mb-6 text-harvest-green">
          <div className="bg-harvest-green/10 p-4 rounded-full">
            <Lock size={32} />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Enter Admin PIN</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm font-bold animate-pulse">
            <AlertCircle size={16} /> Incorrect PIN
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(false); }}
            placeholder="••••"
            className="w-full text-center text-3xl tracking-[1em] font-bold bg-gray-50 border-2 border-gray-200 focus:border-harvest-green rounded-xl p-4 outline-none mb-6 transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-harvest-green text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
          >
            Access Panel
          </button>
        </form>
      </div>
      
      <a href="/" className="mt-8 text-sm font-bold text-gray-500 hover:text-harvest-brown underline underline-offset-4">
        &larr; Back to Website
      </a>
    </div>
  );
};

export default AdminLogin;
