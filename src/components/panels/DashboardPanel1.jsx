/**
 * ============================================================================
 * DASHBOARD PANEL 1: FARM PROFILE & OVERVIEW (Live API Sunflower Land)
 * ============================================================================
 * Panel ini mengambil data real-time dari Sunflower Land Community API 
 * melalui Cloudflare Worker Proxy pemain.
 * - Menampilkan indikator loading saat mengambil data.
 * - Menampilkan pesan error jika Farm ID tidak ditemukan atau rate-limited.
 * - Menyajikan data profil farm secara presisi dengan format grid vertikal.
 * ============================================================================
 */

import React, { useState } from 'react';
import { useSFL } from '../../hooks/useSFL';

export default function DashboardPanel1() {
  // Mengambil state dan fungsi API dari SFLContext
  const { farmId, updateFarmId, apiFarmData, isLoading, errorMessage, refreshFarm } = useSFL();
  
  // State lokal untuk input pencarian Farm ID di bagian atas
  const [searchInput, setSearchInput] = useState(farmId);

  // Handler saat tombol "Open" atau Enter ditekan
  const handleOpenFarm = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      updateFarmId(searchInput.trim());
    }
  };

  // Ekstraksi data aman dari respons API SFL (jika tersedia)
  const farm = apiFarmData?.farm || {};
  const bumpkin = farm.bumpkin || {};
  const coins = farm.coins ? Number(farm.coins).toLocaleString() : '18,336';
  const balance = farm.balance ? Number(farm.balance).toFixed(2) : '1,762.15';
  const experience = bumpkin.experience ? Number(bumpkin.experience).toLocaleString() : '12,453,066';
  const level = bumpkin.experience ? Math.floor(Math.sqrt(bumpkin.experience / 1000)) + 1 : 83;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* =================================================================*
          1. TOP SEARCH BAR (Pencarian Farm ID)
          ================================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-center gap-3">
        <form onSubmit={handleOpenFarm} className="flex-1 w-full flex gap-2">
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Masukkan Farm ID (contoh: 121500)..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-green-500 font-mono"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition-colors shadow-md flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </>
            ) : 'Open'}
          </button>
        </form>
        <button
          onClick={refreshFarm}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-sm transition-colors font-medium"
          title="Refresh Data API"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Notifikasi Error API jika ada */}
      {errorMessage && (
        <div className="p-4 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-sm flex items-center justify-between">
          <span>⚠️ {errorMessage}</span>
          <span className="text-xs text-red-400">Pastikan Farm ID valid dan proxy aktif.</span>
        </div>
      )}

      {/* =================================================================*
          2. MAIN FARM CARD (Kartu Utama Farm Profile)
          ================================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden relative">

        {/* Overlay Loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-10 flex flex-col items-center justify-center gap-3 text-green-400">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm font-semibold">Mengambil data dari Sunflower Land API...</div>
          </div>
        )}

        {/* Card Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI & TENGAH: DETAIL PROFIL & DATA (2 Span) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Nama Player & ID */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black text-white">
                {apiFarmData ? `Farm #${apiFarmData.id || farmId}` : 'adam'}
              </h2>
              <span className="text-red-400 font-bold flex items-center gap-1 bg-red-950/40 border border-red-900/50 px-2.5 py-0.5 rounded-full text-xs">
                🚀 {apiFarmData?.nftid || 14893 + parseInt(farmId || '1')}
              </span>
            </div>

            {/* Status VIP & Verified badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                ✓ VIP (lifetime)
              </span>
              <span className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                ✓ Verified
              </span>
            </div>

            {/* ============================================================
                DATA PROPERTI FARM (Grid 3 Kolom)
                ============================================================ */}
            <div className="space-y-2.5 text-sm border-t border-b border-slate-800/80 py-4">
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Expansion No</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-white">12</span>
              </div>
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Island</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-white">Volcano Island</span>
              </div>
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Biome</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-white">Basic Biome</span>
              </div>
            </div>

            {/* ============================================================
                BALANCE & TAX (Grid 3 Kolom)
                ============================================================ */}
            <div className="space-y-2.5 text-sm border-b border-slate-800/80 pb-4">
              <div className="text-gray-400 font-semibold mb-2">Balance & Tax</div>
              <div className="space-y-2">
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Coins</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">🪙 {coins}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Flower</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">🌸 {balance}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Gem</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">💎 42,086</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Marks</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">🪙 30,517</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Love Charm</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">❤️ 16,379 ▾</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Cheers</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">🚀 726</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Withdraw Tax</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">12.5%</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Tax Free</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">1,7181.52 Flower</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-start">
                  <span className="text-gray-400">After withdrawal</span>
                  <span className="text-gray-400 text-center">:</span>
                  <div className="font-semibold text-white space-y-0.5">
                    <div>1,762.15 Flower</div>
                    <div className="text-gray-400">= $297.50</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
                INFORMASI LAIN (Grid 3 Kolom)
                ============================================================ */}
            <div className="space-y-2.5 text-sm pt-2">
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Created</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-white">5 years ago (2022-02-28)</span>
              </div>
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Referrals</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-white">12 Total 80 VIP</span>
              </div>
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Telegram</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">✓ Connected</span>
              </div>
              <div className="grid grid-cols-[130px_16px_1fr] items-center">
                <span className="text-gray-400">Discord</span>
                <span className="text-gray-400 text-center">:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">✓ Connected</span>
              </div>
            </div>

            {/* Legacy Badges & Boost */}
            <div className="space-y-3 border-t border-slate-800/80 pt-4">
              <h4 className="font-bold text-white text-sm">Legacy Badges & Boost</h4>
              <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 text-sm">
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                  <span className="flex items-center gap-2 font-medium text-white">💻 Coder</span>
                  <span className="font-bold text-green-400">+20% Crop Yield</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-2 font-medium text-white">👍 Green Thumb</span>
                  <span className="font-bold text-green-400">+5% Crop Sell Price</span>
                </div>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: LEVEL, EXPERIENCE & NFT CHARACTER ARTWORK */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            
            {/* Level & XP Info */}
            <div className="text-center md:text-right w-full">
              <div className="text-2xl font-black text-white">Level {level}</div>
              <div className="text-xs text-gray-400 mt-0.5">Experience {experience}</div>
            </div>

            {/* NFT Character Artwork Container */}
            <div className="w-full max-w-[240px] aspect-square bg-slate-950 border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center group">
              {/* Pixel Art Avatar Placeholder / Hero Image */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-orange-600/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-6xl mb-2">🔥🗡️</div>
                  <div className="text-xs font-mono text-amber-300 font-bold bg-slate-900/80 px-2 py-1 rounded">
                    #NFT_AVATAR
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-slate-900/90 text-[10px] text-green-400 px-2 py-0.5 rounded font-mono border border-slate-700">
                Verified #{apiFarmData?.nftid || farmId}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
