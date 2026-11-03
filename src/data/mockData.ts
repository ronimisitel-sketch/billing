import { Customer, Package, Invoice, MikroTikDevice, OLTDevice, Voucher } from '../types';

export const mockCustomers: Customer[] = [
  { id: 'C001', name: 'Ahmad Fauzi', email: 'ahmad@email.com', phone: '081234567890', address: 'Jl. Merdeka No. 10', package: 'Home 20Mbps', status: 'active', joinDate: '2024-01-15', ip: '192.168.1.100', macAddress: 'AA:BB:CC:DD:EE:01', monthlyBill: 250000, lastPayment: '2025-01-01', connectionType: 'pppoe' },
  { id: 'C002', name: 'Siti Nurhaliza', email: 'siti@email.com', phone: '081234567891', address: 'Jl. Sudirman No. 25', package: 'Home 50Mbps', status: 'active', joinDate: '2024-02-20', ip: '192.168.1.101', macAddress: 'AA:BB:CC:DD:EE:02', monthlyBill: 350000, lastPayment: '2025-01-05', connectionType: 'pppoe' },
  { id: 'C003', name: 'Budi Santoso', email: 'budi@email.com', phone: '081234567892', address: 'Jl. Gatot Subroto No. 5', package: 'Business 100Mbps', status: 'active', joinDate: '2024-03-10', ip: '192.168.1.102', macAddress: 'AA:BB:CC:DD:EE:03', monthlyBill: 750000, lastPayment: '2024-12-28', connectionType: 'olt' },
  { id: 'C004', name: 'Dewi Lestari', email: 'dewi@email.com', phone: '081234567893', address: 'Jl. Diponegoro No. 15', package: 'Home 20Mbps', status: 'suspended', joinDate: '2024-04-05', ip: '192.168.1.103', macAddress: 'AA:BB:CC:DD:EE:04', monthlyBill: 250000, lastPayment: '2024-11-01', connectionType: 'pppoe' },
  { id: 'C005', name: 'Rudi Hermawan', email: 'rudi@email.com', phone: '081234567894', address: 'Jl. Ahmad Yani No. 30', package: 'Corporate 200Mbps', status: 'active', joinDate: '2024-01-01', ip: '192.168.1.104', macAddress: 'AA:BB:CC:DD:EE:05', monthlyBill: 1500000, lastPayment: '2025-01-02', connectionType: 'olt' },
  { id: 'C006', name: 'Rina Wati', email: 'rina@email.com', phone: '081234567895', address: 'Jl. Pahlawan No. 8', package: 'Home 50Mbps', status: 'active', joinDate: '2024-05-15', ip: '192.168.1.105', macAddress: 'AA:BB:CC:DD:EE:06', monthlyBill: 350000, lastPayment: '2025-01-03', connectionType: 'hotspot' },
  { id: 'C007', name: 'Agus Prasetyo', email: 'agus@email.com', phone: '081234567896', address: 'Jl. Kartini No. 12', package: 'Home 20Mbps', status: 'inactive', joinDate: '2024-06-20', ip: '192.168.1.106', macAddress: 'AA:BB:CC:DD:EE:07', monthlyBill: 250000, lastPayment: '2024-10-15', connectionType: 'pppoe' },
  { id: 'C008', name: 'Maya Sari', email: 'maya@email.com', phone: '081234567897', address: 'Jl. RA Kartini No. 22', package: 'Business 100Mbps', status: 'active', joinDate: '2024-03-25', ip: '192.168.1.107', macAddress: 'AA:BB:CC:DD:EE:08', monthlyBill: 750000, lastPayment: '2025-01-04', connectionType: 'olt' },
];

export const mockPackages: Package[] = [
  { id: 'P001', name: 'Home 20Mbps', speed: '20/10 Mbps', price: 250000, description: 'Paket internet rumah standar', type: 'home', bandwidth: '20 Mbps', fup: 'Unlimited', status: 'active' },
  { id: 'P002', name: 'Home 50Mbps', speed: '50/25 Mbps', price: 350000, description: 'Paket internet rumah menengah', type: 'home', bandwidth: '50 Mbps', fup: 'Unlimited', status: 'active' },
  { id: 'P003', name: 'Home 100Mbps', speed: '100/50 Mbps', price: 500000, description: 'Paket internet rumah premium', type: 'home', bandwidth: '100 Mbps', fup: 'Unlimited', status: 'active' },
  { id: 'P004', name: 'Business 100Mbps', speed: '100/100 Mbps', price: 750000, description: 'Paket internet bisnis symmetric', type: 'business', bandwidth: '100 Mbps', fup: 'Unlimited', status: 'active' },
  { id: 'P005', name: 'Business 200Mbps', speed: '200/100 Mbps', price: 1200000, description: 'Paket internet bisnis premium', type: 'business', bandwidth: '200 Mbps', fup: 'Unlimited', status: 'active' },
  { id: 'P006', name: 'Corporate 200Mbps', speed: '200/200 Mbps', price: 1500000, description: 'Paket dedicated corporate', type: 'corporate', bandwidth: '200 Mbps', fup: 'Unlimited + SLA', status: 'active' },
  { id: 'P007', name: 'Corporate 500Mbps', speed: '500/500 Mbps', price: 3500000, description: 'Paket dedicated enterprise', type: 'corporate', bandwidth: '500 Mbps', fup: 'Unlimited + SLA 99.9%', status: 'active' },
  { id: 'P008', name: 'Hotspot 5Mbps', speed: '5/2 Mbps', price: 50000, description: 'Paket hotspot harian', type: 'home', bandwidth: '5 Mbps', fup: '500MB/hari', status: 'active' },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-2025-001', customerId: 'C001', customerName: 'Ahmad Fauzi', amount: 250000, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-01', period: 'Januari 2025' },
  { id: 'INV-2025-002', customerId: 'C002', customerName: 'Siti Nurhaliza', amount: 350000, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-05', period: 'Januari 2025' },
  { id: 'INV-2025-003', customerId: 'C003', customerName: 'Budi Santoso', amount: 750000, status: 'unpaid', dueDate: '2025-01-31', period: 'Januari 2025' },
  { id: 'INV-2025-004', customerId: 'C004', customerName: 'Dewi Lestari', amount: 250000, status: 'overdue', dueDate: '2024-12-31', period: 'Desember 2024' },
  { id: 'INV-2025-005', customerId: 'C005', customerName: 'Rudi Hermawan', amount: 1500000, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-02', period: 'Januari 2025' },
  { id: 'INV-2025-006', customerId: 'C006', customerName: 'Rina Wati', amount: 350000, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-03', period: 'Januari 2025' },
  { id: 'INV-2025-007', customerId: 'C007', customerName: 'Agus Prasetyo', amount: 250000, status: 'overdue', dueDate: '2024-12-31', period: 'Desember 2024' },
  { id: 'INV-2025-008', customerId: 'C008', customerName: 'Maya Sari', amount: 750000, status: 'partial', dueDate: '2025-01-31', paidDate: '2025-01-04', period: 'Januari 2025' },
  { id: 'INV-2025-009', customerId: 'C001', customerName: 'Ahmad Fauzi', amount: 250000, status: 'unpaid', dueDate: '2025-02-28', period: 'Februari 2025' },
  { id: 'INV-2025-010', customerId: 'C003', customerName: 'Budi Santoso', amount: 750000, status: 'unpaid', dueDate: '2025-02-28', period: 'Februari 2025' },
];

export const mockMikroTikDevices: MikroTikDevice[] = [
  { id: 'MT001', name: 'Core Router', ip: '10.10.10.1', port: 8728, username: 'admin', status: 'connected', uptime: '45d 12h 30m', cpuLoad: 23, memoryUsage: 45, activeUsers: 156, model: 'CCR2004-1G-12S+2XS' },
  { id: 'MT002', name: 'PPPoE Server', ip: '10.10.10.2', port: 8728, username: 'admin', status: 'connected', uptime: '30d 8h 15m', cpuLoad: 35, memoryUsage: 52, activeUsers: 89, model: 'CCR1036-8G-2S+' },
  { id: 'MT003', name: 'Hotspot Gateway', ip: '10.10.10.3', port: 8728, username: 'admin', status: 'connected', uptime: '15d 4h 45m', cpuLoad: 18, memoryUsage: 38, activeUsers: 34, model: 'RB4011iGS+5HacQ2HnD' },
  { id: 'MT004', name: 'Branch Router', ip: '10.10.10.4', port: 8728, username: 'admin', status: 'disconnected', uptime: '-', cpuLoad: 0, memoryUsage: 0, activeUsers: 0, model: 'RB3011UiAS' },
  { id: 'MT005', name: 'NAT Gateway', ip: '10.10.10.5', port: 8728, username: 'admin', status: 'connected', uptime: '60d 2h 10m', cpuLoad: 42, memoryUsage: 61, activeUsers: 200, model: 'CCR2116-12G-4S+' },
];

export const mockOLTDevices: OLTDevice[] = [
  { id: 'OLT001', name: 'OLT Utama - Pusat', ip: '10.20.1.1', port: 830, status: 'online', totalPorts: 16, activePorts: 12, onuCount: 156, signalLevel: '-8 dBm s/d -25 dBm', model: 'ZTE C320' },
  { id: 'OLT002', name: 'OLT Cabang Utara', ip: '10.20.2.1', port: 830, status: 'online', totalPorts: 8, activePorts: 6, onuCount: 78, signalLevel: '-10 dBm s/d -27 dBm', model: 'Huawei MA5800-X7' },
  { id: 'OLT003', name: 'OLT Cabang Selatan', ip: '10.20.3.1', port: 830, status: 'warning', totalPorts: 8, activePorts: 7, onuCount: 92, signalLevel: '-12 dBm s/d -28 dBm', model: 'FiberHome AN5516-04' },
  { id: 'OLT004', name: 'OLT Cabang Timur', ip: '10.20.4.1', port: 830, status: 'offline', totalPorts: 4, activePorts: 0, onuCount: 0, signalLevel: '-', model: 'ZTE C300' },
];

export const mockVouchers: Voucher[] = [
  { id: 'V001', code: 'NET-ABCD-1234', package: 'Hotspot 5Mbps', duration: '24 Jam', status: 'available', createdDate: '2025-01-10' },
  { id: 'V002', code: 'NET-EFGH-5678', package: 'Hotspot 5Mbps', duration: '24 Jam', status: 'used', usedBy: 'Tamu Hotel A', usedDate: '2025-01-12', createdDate: '2025-01-10' },
  { id: 'V003', code: 'NET-IJKL-9012', package: 'Hotspot 5Mbps', duration: '7 Hari', status: 'available', createdDate: '2025-01-11' },
  { id: 'V004', code: 'NET-MNOP-3456', package: 'Hotspot 5Mbps', duration: '30 Hari', status: 'used', usedBy: 'Kafe Sejahtera', usedDate: '2025-01-08', createdDate: '2025-01-05' },
  { id: 'V005', code: 'NET-QRST-7890', package: 'Hotspot 5Mbps', duration: '24 Jam', status: 'expired', createdDate: '2024-12-01' },
  { id: 'V006', code: 'NET-UVWX-2345', package: 'Hotspot 5Mbps', duration: '7 Hari', status: 'available', createdDate: '2025-01-13' },
  { id: 'V007', code: 'NET-YZAB-6789', package: 'Hotspot 5Mbps', duration: '24 Jam', status: 'available', createdDate: '2025-01-14' },
];

export const revenueData = [
  { month: 'Jul', revenue: 12500000, customers: 120 },
  { month: 'Aug', revenue: 13200000, customers: 125 },
  { month: 'Sep', revenue: 14100000, customers: 130 },
  { month: 'Oct', revenue: 13800000, customers: 128 },
  { month: 'Nov', revenue: 15200000, customers: 135 },
  { month: 'Dec', revenue: 16500000, customers: 142 },
  { month: 'Jan', revenue: 17800000, customers: 156 },
];

export const bandwidthData = [
  { time: '00:00', download: 450, upload: 120 },
  { time: '04:00', download: 200, upload: 80 },
  { time: '08:00', download: 680, upload: 250 },
  { time: '12:00', download: 890, upload: 340 },
  { time: '16:00', download: 750, upload: 280 },
  { time: '20:00', download: 950, upload: 380 },
  { time: '23:00', download: 520, upload: 180 },
];

export const connectionTypeData = [
  { name: 'PPPoE', value: 89, color: '#3b82f6' },
  { name: 'OLT/FTTH', value: 45, color: '#10b981' },
  { name: 'Hotspot', value: 22, color: '#f59e0b' },
];
