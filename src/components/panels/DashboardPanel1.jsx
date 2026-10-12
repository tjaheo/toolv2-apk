/**
 * ============================================================================
 * DASHBOARD PANEL 1: FARM PROFILE & OVERVIEW (Dynamic Level & P2P Tax)
 * ============================================================================
 * Panel ini menggunakan utility terpusat (`sflCalculations.js`) untuk:
 * - Menghitung P2P Market Tax otomatis (Island + VIP status)
 * - Menghitung Level Bumpkin secara dinamis dari total Experience (XP) API
 * ============================================================================
 */

import React, { useState } from 'react';
import { useSFL } from '../../hooks/useSFL';
import { calculateP2PMarketTax, calculateBumpkinLevel } from '../../utils/sflCalculations';

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

  // Ekstraksi data dari respons API SFL
  const farm = apiFarmData?.farm || {};
  const bumpkin = farm.bumpkin || {};
  const island = farm.island || {};
  const inventory = farm.inventory || {};
  const referrals = farm.referrals || {};
  const discord = farm.discord || {};
  const telegram = farm.telegram;

  // Pemetaan Nilai dari API SFL
  const username = farm.username || 'adam';
  
  // Island & Biome
  const islandName = island.type ? `${island.type.charAt(0).toUpperCase() + island.type.slice(1)} Island` : 'Volcano Island';
  const biomeName = island.biome || 'Basic Biome';
  const expansionNo = island.previousExpansions ? island.previousExpansions + 1 : 17;

  // Hitung P2P Market Tax menggunakan utility terpusat
  const taxInfo = apiFarmData ? calculateP2PMarketTax(farm) : { label: '-' };
  const p2pMarketTax = taxInfo.label;

  // Balance & Inventory Items
  const displayCoins = farm.coins !== undefined ? Number(farm.coins).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';
  const displayFlower = farm.balance !== undefined ? Number(farm.balance).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-';
  const displayGem = inventory['Gem'] !== undefined ? Number(inventory['Gem']).toLocaleString() : '-';
  const displayMarks = inventory['Mark'] !== undefined ? Number(inventory['Mark']).toLocaleString() : '-';
  const displayLoveCharm = inventory['Love Charm'] !== undefined ? Number(inventory['Love Charm']).toLocaleString() : '-';
  const displayCheers = inventory['Cheer'] !== undefined ? Number(inventory['Cheer']).toLocaleString() : '-';

  // Created Date
  const createdDate = farm.createdAt ? new Date(farm.createdAt).toISOString().split('T')[0] : '2024-03-02';

  // Referrals
  const referralsText = referrals.totalReferrals !== undefined ? `${referrals.totalReferrals} Total ${referrals.totalVIPReferrals || 0} VIP` : '2 Total 0 VIP';

  // Telegram & Discord
  const telegramStatus = telegram ? '✓ Connected' : '-';
  const discordStatus = discord.connected ? '✓ Connected' : '-';

  // Level & Experience (Level dihitung dinamis dari XP API menggunakan kurva SFL)
  const displayExperience = bumpkin.experience !== undefined ? Number(bumpkin.experience).toLocaleString() : '-';
  const displayLevel = bumpkin.experience !== undefined ? calculateBumpkinLevel(bumpkin.experience) : '-';

  // Badges
  const hasCoder = inventory['Coder'] !== undefined || bumpkin.skills?.['Coder'];
  const hasGreenThumb = inventory['Green Thumb'] !== undefined || bumpkin.skills?.['Green Thumb'];

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
            placeholder="Masukkan Farm ID (contoh: 582579771799538)..."
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
        {apiFarmData && (
          <button
            onClick={refreshFarm}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-sm transition-colors font-medium"
            title="Refresh Data API"
          >
            🔄 Refresh
          </button>
        )}
      </div>

      {/* Notifikasi Error API jika ada */}
      {errorMessage && (
        <div className="p-4 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-sm flex items-center justify-between">
          <span>⚠️ {errorMessage}</span>
          <span className="text-xs text-red-400">Pastikan Farm ID valid dan proxy aktif.</span>
        </div>
      )}

      {/* Panduan Awal (Sebelum user melakukan pencarian API) */}
      {!apiFarmData && !isLoading && !errorMessage && (
        <div className="p-12 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="text-5xl">🌾</div>
          <h3 className="text-xl font-bold text-white">Cari & Hubungkan Farm Anda</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Masukkan nomor Farm ID atau NFT ID Anda di kolom pencarian di atas, lalu klik <span className="text-green-400 font-semibold">Open</span> untuk memuat data profil secara real-time dari Sunflower Land API.
          </p>
        </div>
      )}

      {/* Loading State Spinner */}
      {isLoading && !apiFarmData && (
        <div className="p-16 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-300 font-semibold">Sedang mengambil data Farm #{searchInput}...</p>
        </div>
      )}

      {/* =================================================================*
          2. MAIN FARM CARD (Tampil setelah data API ditarik)
          ================================================================== */}
      {apiFarmData && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden relative animate-fadeIn">

          {/* Overlay Loading saat Refresh */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-10 flex flex-col items-center justify-center gap-3 text-green-400">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-sm font-semibold">Memperbarui data Farm #{farmId}...</div>
            </div>
          )}

          {/* Card Content Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* KOLOM KIRI & TENGAH: DETAIL PROFIL & DATA (2 Span) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Nama Player & ID */}
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black text-white">{username}</h2>
              </div>

              {/* Status VIP & Verified badges */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                  ✓ VIP (lifetime)
                </span>
                <span className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs px-2.5 py-1 rounded font-semibold flex items-center gap-1">
                  ✓ Verified Live API
                </span>
              </div>

              {/* ============================================================
                  DATA PROPERTI FARM (Grid 3 Kolom - Sejajar Vertikal)
                  ============================================================ */}
              <div className="space-y-2.5 text-sm border-t border-b border-slate-800/80 py-4">
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Expansion No</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">{expansionNo}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Island</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">{islandName}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Biome</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">{biomeName}</span>
                </div>
              </div>

              {/* ============================================================
                  BALANCE & TAX (Grid 3 Kolom - Sejajar Vertikal)
                  ============================================================ */}
              <div className="space-y-2.5 text-sm border-b border-slate-800/80 pb-4">
                <div className="text-gray-400 font-semibold mb-2">Balance & Tax</div>
                <div className="space-y-2">
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Coins</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">🪙 {displayCoins}</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Flower</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">🌸 {displayFlower}</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Gem</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">💎 {displayGem}</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Marks</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">🪙 {displayMarks}</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Love Charm</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">❤️ {displayLoveCharm} ▾</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">Cheers</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-white">🚀 {displayCheers}</span>
                  </div>
                  <div className="grid grid-cols-[130px_16px_1fr] items-center">
                    <span className="text-gray-400">P2P Market Tax</span>
                    <span className="text-gray-400 text-center">:</span>
                    <span className="font-semibold text-green-400">{p2pMarketTax}</span>
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
                  <span className="font-semibold text-white">{createdDate}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Referrals</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-white">{referralsText}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Telegram</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">{telegramStatus}</span>
                </div>
                <div className="grid grid-cols-[130px_16px_1fr] items-center">
                  <span className="text-gray-400">Discord</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">{discordStatus}</span>
                </div>
              </div>

              {/* Legacy Badges & Boost */}
              <div className="space-y-3 border-t border-slate-800/80 pt-4">
                <h4 className="font-bold text-white text-sm">Legacy Badges & Boost</h4>
                <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 text-sm">
                  {hasCoder && (
                    <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                      <span className="flex items-center gap-2 font-medium text-white">💻 Coder</span>
                      <span className="font-bold text-green-400">+20% Crop Yield</span>
                    </div>
                  )}
                  {hasGreenThumb && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-2 font-medium text-white">👍 Green Thumb</span>
                      <span className="font-bold text-green-400">+5% Crop Sell Price</span>
                    </div>
                  )}
                  {!hasCoder && !hasGreenThumb && (
                    <div className="text-gray-400 italic">Tidak ada boost aktif dari badges ini.</div>
                  )}
                </div>
              </div>

            </div>

            {/* KOLOM KANAN: LEVEL, EXPERIENCE & NFT CHARACTER ARTWORK */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              
              {/* Level & XP Info */}
              <div className="text-center md:text-right w-full">
                <div className="text-2xl font-black text-white">Level {displayLevel}</div>
                <div className="text-xs text-gray-400 mt-0.5">Experience {displayExperience}</div>
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
                  Verified #{farmId}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
