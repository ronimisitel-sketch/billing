export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  package: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  ip: string;
  macAddress: string;
  monthlyBill: number;
  lastPayment: string;
  connectionType: 'pppoe' | 'hotspot' | 'olt';
}

export interface Package {
  id: string;
  name: string;
  speed: string;
  price: number;
  description: string;
  type: 'home' | 'business' | 'corporate';
  bandwidth: string;
  fup: string;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'partial';
  dueDate: string;
  paidDate?: string;
  period: string;
}

export interface MikroTikDevice {
  id: string;
  name: string;
  ip: string;
  port: number;
  username: string;
  status: 'connected' | 'disconnected' | 'error';
  uptime: string;
  cpuLoad: number;
  memoryUsage: number;
  activeUsers: number;
  model: string;
}

export interface OLTDevice {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: 'online' | 'offline' | 'warning';
  totalPorts: number;
  activePorts: number;
  onuCount: number;
  signalLevel: string;
  model: string;
}

export interface Voucher {
  id: string;
  code: string;
  package: string;
  duration: string;
  status: 'available' | 'used' | 'expired';
  usedBy?: string;
  usedDate?: string;
  createdDate: string;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  monthlyRevenue: number;
  unpaidInvoices: number;
  bandwidthUsage: number;
  activeConnections: number;
}
