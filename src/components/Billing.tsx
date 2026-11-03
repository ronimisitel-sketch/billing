import { useState } from 'react';
import { Search, Download, Send, Filter, CheckCircle, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { mockInvoices } from '../data/mockData';

export default function Billing() {
  const [invoices] = useState(mockInvoices);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = invoices.filter(i => {
    const matchSearch = i.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || i.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalUnpaid = invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return { class: 'bg-green-100 text-green-700', label: 'Lunas', icon: CheckCircle };
      case 'unpaid': return { class: 'bg-yellow-100 text-yellow-700', label: 'Belum Bayar', icon: Clock };
      case 'overdue': return { class: 'bg-red-100 text-red-700', label: 'Jatuh Tempo', icon: AlertCircle };
      case 'partial': return { class: 'bg-blue-100 text-blue-700', label: 'Sebagian', icon: DollarSign };
      default: return { class: 'bg-gray-100 text-gray-700', label: status, icon: Clock };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoice</h1>
          <p className="text-gray-500">Kelola tagihan dan pembayaran pelanggan</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Send size={18} />
            Kirim Tagihan
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-green-600">Total Lunas</p>
              <p className="text-xl font-bold text-green-700">Rp {totalPaid.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-yellow-600">Belum Bayar</p>
              <p className="text-xl font-bold text-yellow-700">Rp {totalUnpaid.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-red-600">Jatuh Tempo</p>
              <p className="text-xl font-bold text-red-700">Rp {totalOverdue.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari invoice berdasarkan nama atau ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="paid">Lunas</option>
            <option value="unpaid">Belum Bayar</option>
            <option value="overdue">Jatuh Tempo</option>
            <option value="partial">Sebagian</option>
          </select>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No. Invoice</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pelanggan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Periode</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jumlah</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jatuh Tempo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((invoice) => {
                const badge = getStatusBadge(invoice.status);
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-blue-600 font-medium">{invoice.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{invoice.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{invoice.period}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">Rp {invoice.amount.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(invoice.dueDate).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${badge.class}`}>
                        <badge.icon size={12} />
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {invoice.status !== 'paid' && (
                          <button className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">Catat Bayar</button>
                        )}
                        <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">Detail</button>
                        <button className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded hover:bg-gray-100">Print</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
          Menampilkan {filtered.length} dari {invoices.length} invoice
        </div>
      </div>
    </div>
  );
}
