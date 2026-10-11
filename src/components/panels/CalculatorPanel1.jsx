/**
 * ============================================================================
 * CALCULATOR PANEL 1: CROP & HARVEST CALCULATOR (Kalkulator Tanaman SFL)
 * ============================================================================
 * Komponen ini adalah fondasi utama bagi pemain Sunflower Land (SFL) untuk:
 * 1. Memilih jenis tanaman (crops) berdasarkan durasi, modal benih, dan hasil.
 * 2. Menghitung total modal, hasil jual, profit bersih (SFL), dan XP.
 * 3. Menjalankan timer hitung mundur (countdown) waktu panen interaktif.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';

// Data master tanaman Sunflower Land (SFL)
const CROP_DATA = [
  { id: 'sunflower', name: 'Sunflower', durationMinutes: 1, cost: 0.01, sell: 0.02, xp: 1 },
  { id: 'potato', name: 'Potato', durationMinutes: 5, cost: 0.1, sell: 0.14, xp: 2 },
  { id: 'pumpkin', name: 'Pumpkin', durationMinutes: 30, cost: 0.2, sell: 0.4, xp: 5 },
  { id: 'carrot', name: 'Carrot', durationMinutes: 60, cost: 0.5, sell: 0.8, xp: 10 },
  { id: 'cabbage', name: 'Cabbage', durationMinutes: 120, cost: 1.0, sell: 1.5, xp: 15 },
  { id: 'soybean', name: 'Soybean', durationMinutes: 180, cost: 1.5, sell: 2.3, xp: 20 },
  { id: 'beetroot', name: 'Beetroot', durationMinutes: 240, cost: 2.0, sell: 3.1, xp: 25 },
  { id: 'cauliflower', name: 'Cauliflower', durationMinutes: 480, cost: 3.0, sell: 4.2, xp: 35 },
  { id: 'parsnip', name: 'Parsnip', durationMinutes: 720, cost: 5.0, sell: 6.8, xp: 50 },
  { id: 'eggplant', name: 'Eggplant', durationMinutes: 960, cost: 6.0, sell: 8.2, xp: 65 },
  { id: 'corn', name: 'Corn', durationMinutes: 1200, cost: 7.5, sell: 10.0, xp: 80 },
  { id: 'radish', name: 'Radish', durationMinutes: 1440, cost: 9.0, sell: 12.0, xp: 100 },
  { id: 'wheat', name: 'Wheat', durationMinutes: 1440, cost: 10.0, sell: 13.5, xp: 120 },
  { id: 'turnip', name: 'Turnip', durationMinutes: 2880, cost: 15.0, sell: 20.0, xp: 150 },
];

export default function CalculatorPanel1() {
  // State untuk tanaman yang dipilih (default: Pumpkin)
  const [selectedCrop, setSelectedCrop] = useState(CROP_DATA[2]);
  
  // State untuk jumlah plot tanah yang ditanami (default: 22 plot)
  const [plotCount, setPlotCount] = useState(22);

  // State untuk hitung mundur timer panen (dalam detik)
  const [timeLeft, setTimeLeft] = useState(CROP_DATA[2].durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /**
   * Handler saat user memilih tanaman baru dari daftar.
   * Mereset timer dan menghentikan hitung mundur aktif.
   */
  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    setTimeLeft(crop.durationMinutes * 60);
    setIsTimerRunning(false);
  };

  /**
   * useEffect untuk menjalankan countdown timer setiap 1 detik jika aktif
   */
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  /**
   * Format detik menjadi format Jam:Menit:Detik
   */
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Kalkulasi Finansial & XP Berdasarkan Jumlah Plot
  const totalCost = Number((selectedCrop.cost * plotCount).toFixed(2));
  const totalRevenue = Number((selectedCrop.sell * plotCount).toFixed(2));
  const netProfit = Number((totalRevenue - totalCost).toFixed(2));
  const totalXp = selectedCrop.xp * plotCount;
  const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">🌾 Kalkulator & Timer Tanaman SFL</h2>
        <p className="text-gray-300">
          Pilih tanaman dan jumlah plot tanah Anda untuk menghitung modal, estimasi profit bersih (SFL), XP, serta timer panen real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM 1 & 2: INPUT & PILIHAN TANAMAN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-white">Pilih Jenis Tanaman</h3>
            
            {/* Grid Pilihan Tanaman */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
              {CROP_DATA.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => handleSelectCrop(crop)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedCrop.id === crop.id
                      ? 'bg-purple-600/30 border-purple-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-gray-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-sm">{crop.name}</div>
                  <div className="text-xs text-purple-300 mt-1">⏱️ {crop.durationMinutes >= 60 ? `${crop.durationMinutes / 60} jam` : `${crop.durationMinutes} mnt`}</div>
                </button>
              ))}
            </div>

            {/* Input Jumlah Plot Tanah */}
            <div className="pt-2">
              <label className="block text-sm text-gray-300 mb-1 font-medium">
                Jumlah Plot Tanah Tersedia
              </label>
              <input 
                type="number" 
                min={1} 
                max={200}
                value={plotCount} 
                onChange={(e) => setPlotCount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* KOLOM 3: HASIL KALKULASI & TIMER */}
        <div className="space-y-6">
          
          {/* Card Kalkulasi Profit & XP */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">
              Analisis Hasil ({plotCount} Plot)
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Modal (Bibit):</span>
                <span className="font-bold text-red-400">{totalCost} SFL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Penjualan:</span>
                <span className="font-bold text-green-400">{totalRevenue} SFL</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-gray-300 font-semibold">Profit Bersih:</span>
                <span className="font-bold text-lg text-green-400">+{netProfit} SFL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Return on Investment:</span>
                <span className="font-bold text-purple-400">{roi}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-gray-400">Total XP Didapat:</span>
                <span className="font-bold text-blue-400">+{totalXp} XP</span>
              </div>
            </div>
          </div>

          {/* Card Timer Panen Real-Time */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Timer Panen: {selectedCrop.name}
            </h3>
            <div className="text-4xl font-black font-mono text-purple-400">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                  isTimerRunning 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {isTimerRunning ? 'Jeda Timer' : 'Mulai Timer'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimeLeft(selectedCrop.durationMinutes * 60);
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors text-sm font-medium"
              >
                Reset
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
