import { useState } from 'react';
import { Ticket, Plus, Copy, Check, Trash2, Filter, Download, RefreshCw } from 'lucide-react';
import { mockVouchers } from '../data/mockData';

export default function Vouchers() {
  const [vouchers] = useState(mockVouchers);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = vouchers.filter(v => filterStatus === 'all' || v.status === filterStatus);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return { class: 'bg-green-100 text-green-700', label: 'Tersedia' };
      case 'used': return { class: 'bg-blue-100 text-blue-700', label: 'Terpakai' };
      case 'expired': return { class: 'bg-gray-100 text-gray-700', label: 'Kadaluarsa' };
      default: return { class: 'bg-gray-100 text-gray-700', label: status };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Voucher Hotspot</h1>
          <p className="text-gray-500">Generate dan kelola voucher hotspot</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowGenerateModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Generate Voucher
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Ticket className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-green-600">Tersedia</p>
              <p className="text-2xl font-bold text-green-700">{vouchers.filter(v => v.status === 'available').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Terpakai</p>
              <p className="text-2xl font-bold text-blue-700">{vouchers.filter(v => v.status === 'used').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-500 p-2 rounded-lg">
              <Trash2 size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Kadaluarsa</p>
              <p className="text-2xl font-bold text-gray-700">{vouchers.filter(v => v.status === 'expired').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'available', 'used', 'expired'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'Semua' : status === 'available' ? 'Tersedia' : status === 'used' ? 'Terpakai' : 'Kadaluarsa'}
          </button>
        ))}
      </div>

      {/* Voucher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((voucher) => {
          const badge = getStatusBadge(voucher.status);
          return (
            <div key={voucher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${badge.class}`}>{badge.label}</span>
                  <span className="text-xs text-gray-400">{voucher.createdDate}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-500 mb-1">Kode Voucher</p>
                  <p className="text-lg font-mono font-bold text-gray-900">{voucher.code}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Paket:</span>
                    <span className="font-medium text-gray-900">{voucher.package}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Durasi:</span>
                    <span className="font-medium text-gray-900">{voucher.duration}</span>
                  </div>
                  {voucher.usedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Digunakan oleh:</span>
                      <span className="font-medium text-gray-900">{voucher.usedBy}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
                {voucher.status === 'available' && (
                  <button onClick={() => handleCopy(voucher.code)} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                    {copiedCode === voucher.code ? <Check size={12} /> : <Copy size={12} />}
                    {copiedCode === voucher.code ? 'Tersalin!' : 'Salin Kode'}
                  </button>
                )}
                <button className="flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  <Download size={12} /> Print
                </button>
                <button className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 ml-auto">
                  <Trash2 size={12} /> Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Voucher</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Voucher</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="10" defaultValue="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paket</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>Hotspot 5Mbps - 24 Jam</option>
                    <option>Hotspot 5Mbps - 7 Hari</option>
                    <option>Hotspot 5Mbps - 30 Hari</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prefix Kode</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="NET" defaultValue="NET" />
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Preview:</strong> Voucher akan di-generate dengan format NET-XXXX-1234 dan otomatis ditambahkan ke MikroTik Hotspot User.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowGenerateModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowGenerateModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
