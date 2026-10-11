/**
 * ============================================================================
 * DASHBOARD PANEL 1: UTAMA (Profil & Status Farm SFL)
 * ============================================================================
 * Panel ini terhubung langsung dengan `SFLContext` (Fondasi Data Global),
 * memungkinkan pemain memasukkan Farm ID mereka, melihat saldo SFL, level, 
 * dan status pertanian secara real-time yang tersimpan di localStorage.
 * ============================================================================
 */

import React from 'react';
import { useSFL } from '../../hooks/useSFL';

export default function DashboardPanel1() {
  // Mengambil state dan fungsi dari global context melalui custom hook useSFL
  const { farmId, updateFarmId, playerProfile, setPlayerProfile } = useSFL();

  return (
    <div className="space-y-6">
      {/* Kartu Informasi & Input Farm ID */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Dashboard - Panel 1 (Utama)</h2>
        <p className="text-gray-300">
          Selamat datang di SFL Hub! Masukkan Farm ID Anda untuk mempersonalisasi data dan sinkronisasi alat.
        </p>
        
        {/* Form Pengaturan Farm ID & Saldo */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 font-medium">Farm ID Anda</label>
            <input 
              type="text" 
              value={farmId}
              onChange={(e) => updateFarmId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-green-500 font-mono"
              placeholder="Contoh: 12345"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 font-medium">Saldo SFL (Wallet/In-game)</label>
            <div className="flex items-center gap-2">
              <input 
                type="number"
                value={playerProfile.sflBalance}
                onChange={(e) => setPlayerProfile(prev => ({ ...prev, sflBalance: parseFloat(e.target.value) || 0 }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-green-400 font-bold text-sm focus:outline-none focus:border-green-500"
              />
              <span className="text-sm font-semibold text-gray-400">SFL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Status Ringkasan Farm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Status Farm #{farmId}</div>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Terhubung
          </div>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Level Petani</div>
          <div className="text-2xl font-bold text-green-400">Level {playerProfile.level}</div>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Total Plot Tanah</div>
          <div className="text-2xl font-bold text-purple-400">{playerProfile.totalPlots} Plot</div>
        </div>
      </div>
    </div>
  );
}
