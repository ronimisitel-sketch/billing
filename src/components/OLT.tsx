import { useState } from 'react';
import { Network, Signal, AlertTriangle, CheckCircle, XCircle, Plus, RefreshCw, Settings, Activity, Wifi, WifiOff } from 'lucide-react';
import { mockOLTDevices } from '../data/mockData';

export default function OLT() {
  const [devices] = useState(mockOLTDevices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="text-green-500" size={18} />;
      case 'offline': return <XCircle className="text-red-500" size={18} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={18} />;
      default: return <XCircle className="text-gray-400" size={18} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'warning': return 'Warning';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-200 bg-green-50';
      case 'offline': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  // Mock ONU data
  const onuList = [
    { id: 'ONU-001', serial: 'ZTEG12345678', name: 'ONT Rumah Ahmad', status: 'active', signal: '-18.5 dBm', distance: '2.3 km', package: 'Home 20Mbps' },
    { id: 'ONU-002', serial: 'ZTEG23456789', name: 'ONT Rumah Siti', status: 'active', signal: '-22.1 dBm', distance: '3.8 km', package: 'Home 50Mbps' },
    { id: 'ONU-003', serial: 'HWTC34567890', name: 'ONT Bisnis Budi', status: 'active', signal: '-15.2 dBm', distance: '1.2 km', package: 'Business 100Mbps' },
    { id: 'ONU-004', serial: 'ZTEG45678901', name: 'ONT Rumah Dewi', status: 'los', signal: '-', distance: '4.5 km', package: 'Home 20Mbps' },
    { id: 'ONU-005', serial: 'HWTC56789012', name: 'ONT Corporate Rudi', status: 'active', signal: '-12.8 dBm', distance: '0.8 km', package: 'Corporate 200Mbps' },
    { id: 'ONU-006', serial: 'ZTEG67890123', name: 'ONT Rumah Rina', status: 'active', signal: '-20.3 dBm', distance: '3.1 km', package: 'Home 50Mbps' },
    { id: 'ONU-007', serial: 'FHTG78901234', name: 'ONT Rumah Maya', status: 'offline', signal: '-', distance: '5.2 km', package: 'Business 100Mbps' },
    { id: 'ONU-008', serial: 'ZTEG89012345', name: 'ONT Rumah Tono', status: 'active', signal: '-24.7 dBm', distance: '4.0 km', package: 'Home 20Mbps' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Koneksi OLT / FTTH</h1>
          <p className="text-gray-500">Monitor dan kelola perangkat OLT (Optical Line Terminal)</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          Tambah OLT
        </button>
      </div>

      {/* OLT Info */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Network className="text-emerald-500 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-emerald-900">Integrasi OLT via SNMP / OMCI</p>
            <p className="text-sm text-emerald-700 mt-1">
              Mendukung protokol SNMP v2c/v3 dan OMCI untuk monitoring ONU/ONT. Kompatibel dengan ZTE, Huawei, FiberHome, dan DASAN OLT.
              Fitur: ONU Discovery, Signal Monitoring, Port Management, VLAN Configuration, dan Remote ONU Reboot.
            </p>
          </div>
        </div>
      </div>

      {/* OLT Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{devices.length}</p>
          <p className="text-sm text-gray-500">Total OLT</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{devices.filter(d => d.status === 'online').length}</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{devices.reduce((s, d) => s + d.onuCount, 0)}</p>
          <p className="text-sm text-gray-500">Total ONU</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{devices.reduce((s, d) => s + d.activePorts, 0)}/{devices.reduce((s, d) => s + d.totalPorts, 0)}</p>
          <p className="text-sm text-gray-500">Port Aktif</p>
        </div>
      </div>

      {/* OLT Device Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {devices.map((device) => (
          <div key={device.id} className={`bg-white rounded-xl shadow-sm border ${getStatusColor(device.status)} overflow-hidden`}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${device.status === 'online' ? 'bg-green-100' : device.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                    <Network className={device.status === 'online' ? 'text-green-600' : device.status === 'warning' ? 'text-yellow-600' : 'text-red-600'} size={24} />
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
                  <p className="text-xs text-gray-500">Signal Level</p>
                  <p className="text-sm font-medium text-gray-900">{device.signalLevel}</p>
                </div>
              </div>

              {/* Port Usage */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Port Usage ({device.activePorts}/{device.totalPorts})</span>
                  <span className="text-xs font-medium text-gray-700">{Math.round((device.activePorts / device.totalPorts) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(device.activePorts / device.totalPorts) * 100}%` }}></div>
                </div>
              </div>

              {/* ONU Count */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Total ONU/ONT</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{device.onuCount}</span>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  <RefreshCw size={12} /> Refresh
                </button>
                <button onClick={() => setSelectedDevice(device.id)} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-100">
                  <Wifi size={12} /> ONU List
                </button>
                <button className="flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                  <Settings size={12} /> Config
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ONU List Panel */}
      {selectedDevice && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Daftar ONU/ONT</h3>
            <button onClick={() => setSelectedDevice(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Serial Number</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Nama</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Status</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Signal</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Jarak</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Paket</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {onuList.map((onu) => (
                  <tr key={onu.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-mono text-gray-600">{onu.serial}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{onu.name}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        onu.status === 'active' ? 'bg-green-100 text-green-700' :
                        onu.status === 'los' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {onu.status === 'active' ? <Wifi size={10} /> : <WifiOff size={10} />}
                        {onu.status === 'active' ? 'Active' : onu.status === 'los' ? 'LOS' : 'Offline'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-gray-700">{onu.signal}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{onu.distance}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{onu.package}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-1">
                        <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">Detail</button>
                        <button className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-100">Reboot</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OLT Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitur Integrasi OLT</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'ONU Discovery', desc: 'Auto-detect ONU baru' },
            { name: 'Signal Monitor', desc: 'Monitoring Rx/Tx power' },
            { name: 'VLAN Config', desc: 'Service VLAN management' },
            { name: 'Port Management', desc: 'PON port control' },
            { name: 'Remote Reboot', desc: 'Reboot ONU remote' },
            { name: 'Alarm Monitor', desc: 'LOS/LOF detection' },
            { name: 'ONU Auth', desc: 'Password & SN auth' },
            { name: 'Traffic Monitor', desc: 'Bandwidth per ONU' },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-900">{feature.name}</p>
              <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add OLT Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tambah Device OLT</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama OLT</label>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Contoh: OLT Utama" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="10.20.1.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="830" defaultValue="830" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>ZTE</option>
                    <option>Huawei</option>
                    <option>FiberHome</option>
                    <option>DASAN</option>
                    <option>Nokia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="C320" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SNMP Community</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="public" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total PON Port</label>
                  <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="16" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Test & Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
