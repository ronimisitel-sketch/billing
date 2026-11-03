import { useState } from 'react';
import { 
  LayoutDashboard, Users, Package, FileText, Server, Network, 
  Ticket, BarChart3, Settings, Menu, X, Wifi, Bell, Search, ChevronDown
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Packages from './components/Packages';
import Billing from './components/Billing';
import MikroTik from './components/MikroTik';
import OLT from './components/OLT';
import Vouchers from './components/Vouchers';
import Reports from './components/Reports';
import SettingsPage from './components/Settings';

type Page = 'dashboard' | 'customers' | 'packages' | 'billing' | 'mikrotik' | 'olt' | 'vouchers' | 'reports' | 'settings';

const navItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers' as Page, label: 'Pelanggan', icon: Users },
  { id: 'packages' as Page, label: 'Paket Internet', icon: Package },
  { id: 'billing' as Page, label: 'Billing & Invoice', icon: FileText },
  { id: 'mikrotik' as Page, label: 'MikroTik', icon: Server },
  { id: 'olt' as Page, label: 'OLT / FTTH', icon: Network },
  { id: 'vouchers' as Page, label: 'Voucher Hotspot', icon: Ticket },
  { id: 'reports' as Page, label: 'Laporan', icon: BarChart3 },
  { id: 'settings' as Page, label: 'Pengaturan', icon: Settings },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'customers': return <Customers />;
      case 'packages': return <Packages />;
      case 'billing': return <Billing />;
      case 'mikrotik': return <MikroTik />;
      case 'olt': return <OLT />;
      case 'vouchers': return <Vouchers />;
      case 'reports': return <Reports />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wifi className="text-white" size={20} />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">NetBill Pro</h1>
                <p className="text-[10px] text-gray-500">Internet Billing System</p>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto hidden lg:block text-gray-400 hover:text-gray-600">
            <Menu size={18} />
          </button>
          <button onClick={() => setMobileMenuOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@netbillpro.id</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900">
            <Menu size={24} />
          </button>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pelanggan, invoice, device..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Quick Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Sistem Online</span>
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-gray-100 bg-white text-center">
          <p className="text-xs text-gray-400">© 2025 NetBill Pro - Internet Billing System v2.1.0 | MikroTik & OLT Integration</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
