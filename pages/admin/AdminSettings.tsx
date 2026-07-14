import React, { useState } from 'react';
import { useData } from '../../store/DataContext';
import { Save, Download, Upload, AlertTriangle, RotateCcw } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults, importData, products, testimonials, categories } = useData();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    const data = { products, categories, testimonials, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `harvestfarm_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      setImportStatus(success ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 3000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to original defaults? This cannot be undone.')) {
      resetToDefaults();
      setFormData(settings); // Settings might not update immediately in this local state
      window.location.reload(); // Quick way to resync state from the context reset
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-harvest-brown mb-8 tracking-tight">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">WhatsApp Link</label>
                <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Office Hours</label>
              <input type="text" name="officeHours" value={formData.officeHours} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Admin PIN</label>
                <input type="password" name="adminPin" value={formData.adminPin} onChange={handleChange} className="w-32 border-2 border-gray-200 rounded-xl p-2 focus:border-harvest-green outline-none font-bold text-center tracking-[0.5em]" />
              </div>
              <button type="submit" className="bg-harvest-brown text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
                <Save size={18} /> {saved ? 'Saved!' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {/* Data Management */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Data Backup</h2>
            <p className="text-sm text-gray-500 mb-6 font-medium">Export your products and settings as a JSON file to keep them safe, or import a previous backup.</p>
            
            <div className="space-y-3">
              <button onClick={handleExport} className="w-full bg-harvest-green/10 text-harvest-green border border-harvest-green/20 px-4 py-3 rounded-xl font-bold hover:bg-harvest-green hover:text-white transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> Export Backup
              </button>
              
              <label className="w-full bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Upload size={18} /> Import Backup
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              
              {importStatus === 'success' && <p className="text-xs text-green-600 font-bold text-center">Import successful!</p>}
              {importStatus === 'error' && <p className="text-xs text-red-600 font-bold text-center">Import failed. Invalid file.</p>}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
            <h2 className="text-xl font-bold text-red-700 mb-2 flex items-center gap-2"><AlertTriangle size={20} /> Danger Zone</h2>
            <p className="text-sm text-red-600/80 mb-6 font-medium">Resetting will wipe all changes and restore the original hardcoded products.</p>
            <button onClick={handleReset} className="w-full bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={18} /> Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
