import { useState } from 'react';
import { Plus, Edit, Trash2, Wifi, Zap, Building2, Users } from 'lucide-react';
import { mockPackages } from '../data/mockData';

export default function Packages() {
  const [packages] = useState(mockPackages);
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = packages.filter(p => filterType === 'all' || p.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Users size={20} className="text-blue-500" />;
      case 'business': return <Building2 size={20} className="text-purple-500" />;
      case 'corporate': return <Zap size={20} className="text-orange-500" />;
      default: return <Wifi size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'home': return 'from-blue-500 to-blue-600';
      case 'business': return 'from-purple-500 to-purple-600';
      case 'corporate': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paket Internet</h1>
          <p className="text-gray-500">Kelola paket layanan internet</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          Tambah Paket
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'home', 'business', 'corporate'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type === 'all' ? 'Semua' : type === 'home' ? 'Rumahan' : type === 'business' ? 'Bisnis' : 'Korporat'}
          </button>
        ))}
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`bg-gradient-to-r ${getTypeColor(pkg.type)} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(pkg.type)}
                  <h3 className="font-semibold">{pkg.name}</h3>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/20 rounded"><Edit size={14} /></button>
                  <button className="p-1 hover:bg-white/20 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-gray-900">{pkg.speed}</p>
                <p className="text-sm text-gray-500 mt-1">Download / Upload</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bandwidth</span>
                  <span className="font-medium text-gray-900">{pkg.bandwidth}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">FUP</span>
                  <span className="font-medium text-gray-900">{pkg.fup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tipe</span>
                  <span className="font-medium text-gray-900 capitalize">{pkg.type}</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-center">
                  <span className="text-2xl font-bold text-gray-900">Rp {pkg.price.toLocaleString('id-ID')}</span>
                  <span className="text-sm text-gray-500">/bulan</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">{pkg.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah Paket Baru</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Home 30Mbps" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speed Download</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="30 Mbps" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speed Upload</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="15 Mbps" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="300000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="home">Rumahan</option>
                    <option value="business">Bisnis</option>
                    <option value="corporate">Korporat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FUP (Fair Usage Policy)</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Unlimited" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" rows={2} placeholder="Deskripsi paket"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
