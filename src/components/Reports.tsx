import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { revenueData } from '../data/mockData';

export default function Reports() {
  const packageDistribution = [
    { name: 'Home 20Mbps', value: 45, color: '#3b82f6' },
    { name: 'Home 50Mbps', value: 32, color: '#10b981' },
    { name: 'Home 100Mbps', value: 15, color: '#f59e0b' },
    { name: 'Business', value: 22, color: '#8b5cf6' },
    { name: 'Corporate', value: 8, color: '#ef4444' },
  ];

  const paymentMethodData = [
    { method: 'Transfer Bank', amount: 8500000 },
    { method: 'E-Wallet', amount: 4200000 },
    { method: 'Tunai', amount: 2800000 },
    { method: 'Auto Debet', amount: 3100000 },
  ];

  const monthlyGrowth = [
    { month: 'Aug', growth: 4.2 },
    { month: 'Sep', growth: 6.8 },
    { month: 'Oct', growth: -2.1 },
    { month: 'Nov', growth: 10.1 },
    { month: 'Dec', growth: 8.5 },
    { month: 'Jan', growth: 7.9 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500">Analisis dan laporan bisnis internet Anda</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>Januari 2025</option>
            <option>Desember 2024</option>
            <option>November 2024</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pendapatan</p>
              <p className="text-xl font-bold text-gray-900">Rp 17.8jt</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp size={16} />
              7.9%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pelanggan Baru</p>
              <p className="text-xl font-bold text-gray-900">14</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp size={16} />
              12%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Churn Rate</p>
              <p className="text-xl font-bold text-gray-900">2.3%</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown size={16} />
              -0.5%
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Collection Rate</p>
              <p className="text-xl font-bold text-gray-900">94.2%</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp size={16} />
              2.1%
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Pendapatan</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(value: number) => [`Rp ${(value/1000000).toFixed(1)}jt`, 'Pendapatan']} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Rate */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pertumbuhan Pelanggan (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Pertumbuhan']} />
              <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Package Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Paket</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={packageDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {packageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={paymentMethodData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" tickFormatter={(v) => `${(v/1000000).toFixed(1)}jt`} />
              <YAxis dataKey="method" type="category" stroke="#9ca3af" width={100} />
              <Tooltip formatter={(value: number) => [`Rp ${(value/1000000).toFixed(1)}jt`, 'Jumlah']} />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Tables */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Bulanan</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Bulan</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Pendapatan</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Pelanggan</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">ARPU</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Pertumbuhan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {revenueData.map((data, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{data.month} 2024</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Rp {(data.revenue / 1000000).toFixed(1)}jt</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{data.customers}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Rp {Math.round(data.revenue / data.customers).toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3">
                    {i > 0 ? (
                      <span className={`text-sm ${data.revenue > revenueData[i-1].revenue ? 'text-green-600' : 'text-red-600'}`}>
                        {data.revenue > revenueData[i-1].revenue ? '+' : ''}{((data.revenue - revenueData[i-1].revenue) / revenueData[i-1].revenue * 100).toFixed(1)}%
                      </span>
                    ) : <span className="text-sm text-gray-400">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
