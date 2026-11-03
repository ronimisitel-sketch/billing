# NetBill Pro - Internet Billing System

Sistem billing internet lengkap dengan integrasi MikroTik dan OLT/FTTH.

## 🚀 Fitur Utama

- **Dashboard** - Ringkasan bisnis, pendapatan, dan statistik jaringan
- **Manajemen Pelanggan** - Kelola data pelanggan PPPoE, Hotspot, dan OLT
- **Paket Internet** - Kelola paket layanan (Home, Business, Corporate)
- **Billing & Invoice** - Sistem tagihan dan pembayaran otomatis
- **Integrasi MikroTik** - Monitor dan kelola device MikroTik via API
- **Integrasi OLT/FTTH** - Monitoring ONU/ONT, signal level, port management
- **Voucher Hotspot** - Generate dan kelola voucher hotspot
- **Laporan** - Analitik bisnis, pendapatan, dan pertumbuhan
- **Pengaturan** - Konfigurasi sistem, notifikasi, pembayaran, dan keamanan

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts & graphs
- **Lucide React** - Icons

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/username/netbill-pro.git
cd netbill-pro

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 🌐 Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📁 Struktur Project

```
src/
├── components/
│   ├── Dashboard.tsx
│   ├── Customers.tsx
│   ├── Packages.tsx
│   ├── Billing.tsx
│   ├── MikroTik.tsx
│   ├── OLT.tsx
│   ├── Vouchers.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🔌 Integrasi

### MikroTik
- RouterOS API (port 8728)
- PPPoE Secret Management
- Hotspot User Management
- Bandwidth Queue Control
- DHCP Lease Monitoring

### OLT/FTTH
- SNMP v2c/v3
- OMCI Protocol
- ONU Discovery & Monitoring
- Signal Level Monitoring
- Remote ONU Reboot
- Support: ZTE, Huawei, FiberHome, DASAN

## 📄 License

MIT License
