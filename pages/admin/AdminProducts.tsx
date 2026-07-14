import React, { useState } from 'react';
import { useData } from '../../store/DataContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, X, Save, AlertCircle } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleEditClick = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleNewClick = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      price: 0,
      category: categories[0]?.name || '',
      description: '',
      image: '',
      specs: {},
      stockStatus: 'in-stock'
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData as Product);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
    }
  };

  const handleQuickPriceUpdate = (id: string, newPrice: string) => {
    const parsed = parseInt(newPrice.replace(/,/g, ''), 10);
    if (!isNaN(parsed)) {
      updateProduct(id, { price: parsed });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-harvest-brown tracking-tight">Products</h1>
        <button onClick={handleNewClick} className="bg-harvest-green text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Image</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Name & Category</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Price (KSh)</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="100%" height="100%" fill="%23eee"/></svg>'; }} />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-xs text-harvest-green font-semibold mt-0.5">{product.category}</div>
                  </td>
                  <td className="p-4">
                    <input 
                      type="text" 
                      defaultValue={product.price.toLocaleString()}
                      onBlur={(e) => handleQuickPriceUpdate(product.id, e.target.value)}
                      className="w-24 px-2 py-1 border border-transparent hover:border-gray-200 focus:border-harvest-green rounded bg-transparent focus:bg-white outline-none font-bold text-gray-900"
                    />
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      product.stockStatus === 'in-stock' ? 'bg-green-100 text-green-700' :
                      product.stockStatus === 'limited' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {product.stockStatus || 'in-stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEditClick(product)} className="p-2 text-gray-400 hover:text-harvest-green transition-colors inline-block"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-gray-400 hover:text-red-500 transition-colors inline-block ml-2"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-20">
              <h2 className="text-xl font-black text-harvest-brown">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full"><X size={16} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                  <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                  <select required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium bg-white">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (KSh)</label>
                  <input required type="number" value={formData.price || 0} onChange={e => setFormData({...formData, price: parseInt(e.target.value, 10)})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Stock Status</label>
                  <select value={formData.stockStatus || 'in-stock'} onChange={e => setFormData({...formData, stockStatus: e.target.value as any})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium bg-white">
                    <option value="in-stock">In Stock</option>
                    <option value="limited">Limited Stock</option>
                    <option value="made-to-order">Made to Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Image URL</label>
                <input required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium" />
                {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-20 rounded-lg object-cover" />}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                <textarea required rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-harvest-green outline-none font-medium resize-none" />
              </div>

              <div className="flex items-center gap-2 bg-harvest-gold/10 p-4 rounded-xl border border-harvest-gold/30">
                <input type="checkbox" id="isBestSeller" checked={formData.isBestSeller || false} onChange={e => setFormData({...formData, isBestSeller: e.target.checked})} className="w-5 h-5 accent-harvest-orange" />
                <label htmlFor="isBestSeller" className="font-bold text-harvest-brown cursor-pointer select-none">Mark as Best Seller</label>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-start gap-3">
                <AlertCircle className="text-gray-400 mt-0.5" size={18} />
                <p className="text-xs text-gray-500 font-medium">Technical specs can be fully customized by exporting to JSON, editing, and re-importing in the Settings panel.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                <button type="submit" className="bg-harvest-brown text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-lg">
                  <Save size={18} /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
