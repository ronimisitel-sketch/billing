import { useState } from 'react';
import { Server, RefreshCw, Settings, AlertCircle, CheckCircle, XCircle, Cpu, HardDrive, Users, Plus, Trash2, Terminal } from 'lucide-react';
import { mockMikroTikDevices } from '../data/mockData';

export default function MikroTik() {
  const [devices] = useState(mockMikroTikDevices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="text-green-500" size={18} />;
      case 'disconnected': return <XCircle className="text-red-500" size={18} />;
      case 'error': return <AlertCircle className="text-yellow-500" size={18} />;
      default: return <XCircle className="text-gray-400" size={18} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected': return 'Terhubung';
      case 'disconnected': return 'Terputus';
      case 'error': return 'Error';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'border-green-200 bg-green-50';
      case 'disconnected': return 'border-red-200 bg-red-50';
      case 'error': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Koneksi MikroTik</h1>
          <p className="text-gray-500">Monitor dan kelola perangkat MikroTik RouterOS</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTerminal(true)} className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Terminal size={18} />
            Terminal
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Tambah Device
          </button>
        </div>
      </div>

      {/* Connection Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Settings className="text-blue-500 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-blue-900">API MikroTik RouterOS</p>
            <p className="text-sm text-blue-700 mt-1">
              Koneksi menggunakan RouterOS API (default port: 8728). Pastikan firewall mengizinkan koneksi dari server billing ke perangkat MikroTik.
              Mendukung fitur: PPPoE Management, Hotspot Users, Bandwidth Control, Queue Management, dan DHCP Lease.
            </p>
          </div>
        </div>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {devices.map((device) => (
          <div key={device.id} className={`bg-white rounded-xl shadow-sm border ${getStatusColor(device.status)} overflow-hidden`}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${device.status === 'connected' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Server className={device.status === 'connected' ? 'text-green-600' : 'text-red-600'} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-xs text-gray-500">{device.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  <span className="text-xs font-medium text-gray-600">{getStatusLabel(device.status)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">IP Address</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{device.ip}:{device.port}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Uptime</p>
                  <p className="text-sm font-medium text-gray-900">{device.uptime}</p>
                </div>
              </div>

              {device.status === 'connected' && (
                <div className="space-y-3">
                  {/* CPU Usage */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <Cpu size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-500">CPU Load</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{device.cpuLoad}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${device.cpuLoad > 80 ? 'bg-red-500' : device.cpuLoad > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${device.cpuLoad}%` }}></div>
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <HardDrive size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Memory</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{device.memoryUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${device.memoryUsage > 80 ? 'bg-red-500' : device.memoryUsage > 50 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${device.memoryUsage}%` }}></div>
                    </div>
                  </div>

                  {/* Active Users */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">Active Sessions</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{device.activeUsers}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  <RefreshCw size={12} /> Refresh
                </button>
                <button className="flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  <Settings size={12} /> Config
                </button>
                {device.status === 'connected' && (
                  <button className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100">
                    <Terminal size={12} /> Terminal
                  </button>
                )}
                <button className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 ml-auto">
                  <Trash2 size={12} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MikroTik Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitur Integrasi MikroTik</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'PPPoE Secret', desc: 'Kelola user PPPoE' },
            { name: 'Hotspot Users', desc: 'Manajemen user hotspot' },
            { name: 'Simple Queue', desc: 'Bandwidth management' },
            { name: 'DHCP Lease', desc: 'Monitor IP assignment' },
            { name: 'Firewall Rules', desc: 'Kelola firewall' },
            { name: 'Interface', desc: 'Monitor interface' },
            { name: 'DNS Settings', desc: 'Konfigurasi DNS' },
            { name: 'System Resource', desc: 'Monitor resource' },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-900">{feature.name}</p>
              <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah Device MikroTik</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Device</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Core Router" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="10.10.10.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Port API</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="8728" defaultValue="8728" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="admin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: CCR2004-1G-12S+2XS" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Test & Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Modal */}
      {showTerminal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl w-full max-w-3xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-green-400" />
                <span className="text-green-400 text-sm font-mono">MikroTik Terminal</span>
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto">
              <p>[admin@MikroTik] &gt; /system resource print</p>
              <p className="text-green-300">uptime: 45d12h30m22s</p>
              <p className="text-green-300">version: 7.12.1 (stable)</p>
              <p className="text-green-300">board-name: CCR2004-1G-12S+2XS</p>
              <p className="text-green-300">cpu-load: 23%</p>
              <p className="text-green-300">free-memory: 1024MiB</p>
              <p className="text-green-300">total-memory: 2048MiB</p>
              <p className="mt-2">[admin@MikroTik] &gt; <span className="animate-pulse">_</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
