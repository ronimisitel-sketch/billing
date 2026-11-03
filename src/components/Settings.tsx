import { useState } from 'react';
import { Save, Globe, Bell, Shield, Database, Wifi, Server, CreditCard } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Umum', icon: Globe },
    { id: 'notification', label: 'Notifikasi', icon: Bell },
    { id: 'payment', label: 'Pembayaran', icon: CreditCard },
    { id: 'network', label: 'Jaringan', icon: Wifi },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'security', label: 'Keamanan', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500">Konfigurasi sistem billing internet</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pengaturan Umum</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama ISP</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" defaultValue="NetBill Pro ISP" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" defaultValue="Jl. Teknologi No. 1, Jakarta" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" defaultValue="021-12345678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" defaultValue="admin@netbillpro.id" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mata Uang</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      <option>IDR - Rupiah</option>
                      <option>USD - Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zona Waktu</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                      <option>Asia/Jakarta (WIB)</option>
                      <option>Asia/Makassar (WITA)</option>
                      <option>Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Jatuh Tempo Default</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>Setiap tanggal 1</option>
                    <option>Setiap tanggal 5</option>
                    <option>Setiap tanggal 10</option>
                    <option>Setiap tanggal 15</option>
                    <option>Setiap tanggal 20</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notification' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pengaturan Notifikasi</h3>
              <div className="space-y-4">
                {[
                  { label: 'Notifikasi tagihan baru', desc: 'Kirim notifikasi saat invoice baru dibuat', enabled: true },
                  { label: 'Pengingat jatuh tempo', desc: 'Kirim reminder H-3 sebelum jatuh tempo', enabled: true },
                  { label: 'Notifikasi pembayaran', desc: 'Kirim konfirmasi saat pembayaran diterima', enabled: true },
                  { label: 'Alert koneksi down', desc: 'Notifikasi saat pelanggan offline', enabled: false },
                  { label: 'Laporan harian', desc: 'Kirim ringkasan harian via email', enabled: true },
                  { label: 'Alert OLT/MikroTik', desc: 'Notifikasi saat device bermasalah', enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel Notifikasi</label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">SMS</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pengaturan Pembayaran</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gateway Pembayaran</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Midtrans', 'Xendit', 'Tripay', 'Manual'].map((gw) => (
                      <label key={gw} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="gateway" defaultChecked={gw === 'Midtrans'} className="text-blue-600" />
                        <span className="text-sm">{gw}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rekening Bank</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="BCA - 1234567890 - PT NetBill Pro" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auto Disconnect</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option>3 hari setelah jatuh tempo</option>
                    <option>5 hari setelah jatuh tempo</option>
                    <option>7 hari setelah jatuh tempo</option>
                    <option>Tidak otomatis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Denda Keterlambatan</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2" placeholder="Jumlah (Rp)" defaultValue="25000" />
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                      <option>Per hari</option>
                      <option>Flat sekali</option>
                      <option>Persentase (%)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pengaturan Jaringan</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNS Primary</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="8.8.8.8" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNS Secondary</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="8.8.4.4" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PPPoE Interface</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="pppoe-server" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Pool PPPoE</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="10.10.0.0/16" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NAT IP (Public)</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="103.xx.xx.xx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Bandwidth</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="2 Gbps" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monitoring Interval</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option>30 detik</option>
                    <option>1 menit</option>
                    <option>5 menit</option>
                    <option>15 menit</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Backup & Restore</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Backup terakhir: 15 Januari 2025, 03:00 WIB (Otomatis)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Backup Otomatis</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option>Setiap hari (03:00 WIB)</option>
                    <option>Setiap minggu (Minggu, 03:00)</option>
                    <option>Setiap bulan (Tanggal 1, 03:00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Backup</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                    <option>Local Server</option>
                    <option>Google Drive</option>
                    <option>AWS S3</option>
                    <option>FTP Server</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Database size={18} /> Backup Sekarang
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Database size={18} /> Restore
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Keamanan</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password Admin</label>
                  <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2" defaultValue="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key MikroTik</label>
                  <div className="flex gap-2">
                    <input type="password" className="flex-1 border border-gray-200 rounded-lg px-3 py-2" defaultValue="••••••••••••" />
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Generate</button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Tambahkan lapisan keamanan ekstra</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto logout setelah tidak aktif</p>
                  </div>
                  <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
                    <option>30 menit</option>
                    <option>1 jam</option>
                    <option>2 jam</option>
                    <option>8 jam</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
              <Save size={18} />
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
