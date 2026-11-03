import { Users, DollarSign, Wifi, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { revenueData, bandwidthData, connectionTypeData, mockInvoices, mockCustomers } from '../data/mockData';

export default function Dashboard() {
  const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const unpaidCount = mockInvoices.filter(i => i.status === 'unpaid' || i.status === 'overdue').length;
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;

  const stats = [
    { label: 'Total Pelanggan', value: mockCustomers.length.toString(), icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Pelanggan Aktif', value: activeCustomers.toString(), icon: Wifi, color: 'bg-green-500', change: '+8%' },
    { label: 'Pendapatan Bulan Ini', value: `Rp ${(totalRevenue / 1000000).toFixed(1)}jt`, icon: DollarSign, color: 'bg-purple-500', change: '+15%' },
    { label: 'Tagihan Belum Bayar', value: unpaidCount.toString(), icon: AlertTriangle, color: 'bg-red-500', change: '-3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Ringkasan sistem billing internet Anda</p>
        </div>
        <div className="text-sm text-gray-500">
          Terakhir update: {new Date().toLocaleString('id-ID')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} />
                  {stat.change} dari bulan lalu
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pendapatan 7 Bulan Terakhir</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(value: number) => [`Rp ${(value/1000000).toFixed(1)}jt`, 'Pendapatan']} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Connection Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipe Koneksi</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={connectionTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {connectionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {connectionTypeData.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bandwidth & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bandwidth Usage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" />
            Penggunaan Bandwidth Hari Ini (Mbps)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={bandwidthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="download" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Download" />
              <Area type="monotone" dataKey="upload" stroke="#10b981" fill="#10b981" fillOpacity={0.1} name="Upload" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagihan Terbaru</h3>
          <div className="space-y-3">
            {mockInvoices.slice(0, 6).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{invoice.customerName}</p>
                  <p className="text-xs text-gray-500">{invoice.period}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">Rp {invoice.amount.toLocaleString('id-ID')}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                    invoice.status === 'unpaid' ? 'bg-yellow-100 text-yellow-700' :
                    invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {invoice.status === 'paid' ? 'Lunas' : invoice.status === 'unpaid' ? 'Belum Bayar' : invoice.status === 'overdue' ? 'Jatuh Tempo' : 'Sebagian'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{revenueData[revenueData.length - 1].customers}</p>
            <p className="text-blue-100 text-sm">Total Koneksi Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">99.8%</p>
            <p className="text-blue-100 text-sm">Uptime Jaringan</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">2.4 Gbps</p>
            <p className="text-blue-100 text-sm">Total Bandwidth</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">4</p>
            <p className="text-blue-100 text-sm">Perangkat Aktif</p>
          </div>
        </div>
      </div>
    </div>
  );
}
