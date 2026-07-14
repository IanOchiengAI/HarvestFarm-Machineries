import React, { useState } from 'react';
import { useData } from '../../store/DataContext';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});

  const handleEditClick = (t: Testimonial) => {
    setFormData(t);
    setEditingId(t.id);
    setIsModalOpen(true);
  };

  const handleNewClick = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      location: '',
      text: '',
      image: '',
      productRef: ''
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial(formData as Testimonial);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from ${name}?`)) {
      deleteTestimonial(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-harvest-brown tracking-tight">Testimonials</h1>
        <button onClick={handleNewClick} className="bg-harvest-green text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors">
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="100%" height="100%" fill="%23eee"/></svg>'; }} />
              <div>
                <h3 className="font-bold text-gray-900">{t.name}</h3>
                <span className="text-xs font-black text-harvest-orange uppercase tracking-wider">{t.location}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mb-4 flex-grow">"{t.text}"</p>
            {t.productRef && <p className="text-xs font-bold text-gray-400 mb-4">Ref: {t.productRef}</p>}
            
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
              <button onClick={() => handleEditClick(t)} className="p-2 text-gray-400 hover:text-harvest-green transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(t.id, t.name)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10">
            <div className="border-b border-gray-100 p-6 flex justify-between items-center">
              <h2 className="text-xl font-black text-harvest-brown">{editingId ? 'Edit Review' : 'Add New Review'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Farmer Name</label>
                  <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location/County</label>
                  <input required type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Review Text</label>
                <textarea required rows={4} value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium resize-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Photo URL</label>
                <input required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Machine Bought (Optional)</label>
                <input type="text" value={formData.productRef || ''} onChange={e => setFormData({...formData, productRef: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium text-sm" placeholder="e.g. 5HP Posho Mill" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                <button type="submit" className="bg-harvest-brown text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-lg">
                  <Save size={18} /> Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
