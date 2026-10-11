/**
 * ============================================================================
 * SFL HUB - MAIN APPLICATION COMPONENT (App.jsx)
 * ============================================================================
 * File ini adalah komponen utama aplikasi yang mengatur:
 * 1. State manajemen halaman aktif (activePanel) dan kategori sidebar (openCategories).
 * 2. Navigasi Sidebar model Accordion (buka/tutup kategori dengan sub-panel).
 * 3. Render komponen panel sesuai pilihan user.
 * ============================================================================
 */

import React, { useState } from 'react';

// Import komponen panel untuk kategori Dashboard
import DashboardPanel1 from './components/panels/DashboardPanel1';
import DashboardPanel2 from './components/panels/DashboardPanel2';
import DashboardPanel3 from './components/panels/DashboardPanel3';

// Import komponen panel untuk kategori Kalkulator
import CalculatorPanel1 from './components/panels/CalculatorPanel1';
import CalculatorPanel2 from './components/panels/CalculatorPanel2';
import CalculatorPanel3 from './components/panels/CalculatorPanel3';

// Import komponen panel untuk kategori Etc (Lain-lain)
import EtcPanel1 from './components/panels/EtcPanel1';
import EtcPanel2 from './components/panels/EtcPanel2';
import EtcPanel3 from './components/panels/EtcPanel3';

export default function App() {
  /**
   * STATE: activePanel
   * Menyimpan ID panel yang sedang aktif ditampilkan di layar utama.
   * Default diset ke 'dashboard-1' (Panel 1 Dashboard sebagai halaman utama).
   */
  const [activePanel, setActivePanel] = useState('dashboard-1');

  /**
   * STATE: openCategories
   * Mengontrol status buka/tutup (accordion) setiap kategori di sidebar.
   * Default semua bernilai false (tertutup semua sampai diinteraksi user).
   */
  const [openCategories, setOpenCategories] = useState({
    dashboard: false,
    kalkulator: false,
    etc: false,
  });

  /**
   * STATE: isSidebarOpen
   * Mengontrol buka/tutup sidebar drawer (terutama untuk tampilan mobile/responsif).
   */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * FUNGSI: toggleCategory
   * Dipanggil saat tombol kategori utama di sidebar ditekan untuk membuka/menutup sub-panel.
   */
  const toggleCategory = (categoryName) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  /**
   * FUNGSI: handleSelectPanel
   * Dipanggil saat user mengklik salah satu sub-panel di sidebar.
   * - Mengubah panel aktif
   * - Memastikan kategori induk tetap terbuka
   * - Menutup sidebar drawer (pada mobile view)
   */
  const handleSelectPanel = (panelId, categoryName) => {
    setActivePanel(panelId);
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: true
    }));
    setIsSidebarOpen(false);
  };

  /**
   * FUNGSI: renderActivePanel
   * Mengembalikan komponen panel yang sesuai berdasarkan state `activePanel`.
   */
  const renderActivePanel = () => {
    switch (activePanel) {
      // Kategori Dashboard
      case 'dashboard-1': return <DashboardPanel1 />;
      case 'dashboard-2': return <DashboardPanel2 />;
      case 'dashboard-3': return <DashboardPanel3 />;
      
      // Kategori Kalkulator
      case 'kalkulator-1': return <CalculatorPanel1 />;
      case 'kalkulator-2': return <CalculatorPanel2 />;
      case 'kalkulator-3': return <CalculatorPanel3 />;
      
      // Kategori Etc
      case 'etc-1': return <EtcPanel1 />;
      case 'etc-2': return <EtcPanel2 />;
      case 'etc-3': return <EtcPanel3 />;
      
      // Fallback default ke Dashboard Panel 1 jika tidak ada yang cocok
      default: return <DashboardPanel1 />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-gray-100 overflow-hidden relative">
      
      {/* ==================================================================
          BACKDROP: Latar belakang gelap saat sidebar terbuka di layar mobile
          ================================================================== */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-black/60 z-20 backdrop-blur-sm"
        />
      )}

      {/* ==================================================================
          SIDEBAR NAVIGATION (DRAWER)
          ================================================================== */}
      <aside className={`
        absolute inset-y-0 left-0 z-30 
        w-72 bg-slate-900 border-r border-slate-800 flex flex-col 
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header Sidebar (Logo & Tombol Tutup) */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-xl font-black text-green-400 tracking-wider">
            SFL HUB
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-1 focus:outline-none"
            title="Tutup Menu"
          >
            ✕
          </button>
        </div>
        
        {/* Daftar Menu Accordion */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          
          {/* --------------------------------------------------------------
              KATEGORI 1: DASHBOARD
              -------------------------------------------------------------- */}
          <div className="space-y-1">
            {/* Tombol Kategori Utama */}
            <button 
              onClick={() => toggleCategory('dashboard')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-gray-200 bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/50"
            >
              <span className="flex items-center gap-2">📊 Dashboard</span>
              <span className={`transform transition-transform duration-200 text-xs text-gray-400 ${openCategories.dashboard ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Sub-panel (Muncul ke bawah jika openCategories.dashboard bernilai true) */}
            {openCategories.dashboard && (
              <div className="pl-4 space-y-1 pt-1">
                <button 
                  onClick={() => handleSelectPanel('dashboard-1', 'dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'dashboard-1' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 1 (Utama)
                </button>
                <button 
                  onClick={() => handleSelectPanel('dashboard-2', 'dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'dashboard-2' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 2 (Statistik)
                </button>
                <button 
                  onClick={() => handleSelectPanel('dashboard-3', 'dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'dashboard-3' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 3 (Aset)
                </button>
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------
              KATEGORI 2: KALKULATOR
              -------------------------------------------------------------- */}
          <div className="space-y-1">
            {/* Tombol Kategori Utama */}
            <button 
              onClick={() => toggleCategory('kalkulator')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-gray-200 bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/50"
            >
              <span className="flex items-center gap-2">🧮 Kalkulator</span>
              <span className={`transform transition-transform duration-200 text-xs text-gray-400 ${openCategories.kalkulator ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Sub-panel (Muncul ke bawah jika openCategories.kalkulator bernilai true) */}
            {openCategories.kalkulator && (
              <div className="pl-4 space-y-1 pt-1">
                <button 
                  onClick={() => handleSelectPanel('kalkulator-1', 'kalkulator')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'kalkulator-1' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 1 (Tanaman)
                </button>
                <button 
                  onClick={() => handleSelectPanel('kalkulator-2', 'kalkulator')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'kalkulator-2' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 2 (Profit)
                </button>
                <button 
                  onClick={() => handleSelectPanel('kalkulator-3', 'kalkulator')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'kalkulator-3' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 3 (Efisiensi)
                </button>
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------
              KATEGORI 3: ETC (LAIN-LAIN)
              -------------------------------------------------------------- */}
          <div className="space-y-1">
            {/* Tombol Kategori Utama */}
            <button 
              onClick={() => toggleCategory('etc')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-gray-200 bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/50"
            >
              <span className="flex items-center gap-2">⚙️ Etc</span>
              <span className={`transform transition-transform duration-200 text-xs text-gray-400 ${openCategories.etc ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Sub-panel (Muncul ke bawah jika openCategories.etc bernilai true) */}
            {openCategories.etc && (
              <div className="pl-4 space-y-1 pt-1">
                <button 
                  onClick={() => handleSelectPanel('etc-1', 'etc')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'etc-1' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 1 (Catatan)
                </button>
                <button 
                  onClick={() => handleSelectPanel('etc-2', 'etc')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'etc-2' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 2 (Panduan)
                </button>
                <button 
                  onClick={() => handleSelectPanel('etc-3', 'etc')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activePanel === 'etc-3' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  • Panel 3 (Pengaturan)
                </button>
              </div>
            )}
          </div>

        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 text-xs text-center text-gray-500">
          SFL Hub v2.0
        </div>
      </aside>

      {/* ==================================================================
          MAIN CONTENT AREA (KONTEN UTAMA)
          ================================================================== */}
      <main className="flex-1 flex flex-col overflow-y-auto w-full">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 md:px-8 backdrop-blur shrink-0">
          
          {/* Tombol Buka Menu Sidebar & Indikator Panel Aktif */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 text-gray-200 hover:bg-slate-700 focus:outline-none border border-slate-700 transition-colors"
              title="Buka Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 hidden sm:inline">
              Active Panel: <span className="text-white">{activePanel}</span>
            </span>
          </div>

          {/* Indikator Status Online di Kanan Header */}
          <div className="text-xs md:text-sm bg-slate-800 px-3 py-1 rounded-full text-green-400 border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Online</span>
          </div>
        </header>

        {/* Container Render Panel Aktif */}
        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          {renderActivePanel()}
        </div>
      </main>
    </div>
  );
}