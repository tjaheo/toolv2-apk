/**
 * ============================================================================
 * SFL DATA SERVICE (Pusat Data Master Game Sunflower Land)
 * ============================================================================
 * File ini bertindak sebagai "Peta & Sumber Data" (Tanah yang Kokoh) untuk 
 * seluruh fitur aplikasi SFL Hub. Berisi konstanta game resmi:
 * - Daftar Tanaman (Crops) beserta modal, harga jual, durasi, dan XP.
 * - Daftar Sumber Daya (Resources) seperti kayu, batu, besi, emas.
 * - Konfigurasi bangunan dan alat.
 * ============================================================================
 */

export const CROPS = [
  { id: 'sunflower', name: 'Sunflower', durationMinutes: 1, cost: 0.01, sell: 0.02, xp: 1, category: 'crop' },
  { id: 'potato', name: 'Potato', durationMinutes: 5, cost: 0.1, sell: 0.14, xp: 2, category: 'crop' },
  { id: 'pumpkin', name: 'Pumpkin', durationMinutes: 30, cost: 0.2, sell: 0.4, xp: 5, category: 'crop' },
  { id: 'carrot', name: 'Carrot', durationMinutes: 60, cost: 0.5, sell: 0.8, xp: 10, category: 'crop' },
  { id: 'cabbage', name: 'Cabbage', durationMinutes: 120, cost: 1.0, sell: 1.5, xp: 15, category: 'crop' },
  { id: 'soybean', name: 'Soybean', durationMinutes: 180, cost: 1.5, sell: 2.3, xp: 20, category: 'crop' },
  { id: 'beetroot', name: 'Beetroot', durationMinutes: 240, cost: 2.0, sell: 3.1, xp: 25, category: 'crop' },
  { id: 'cauliflower', name: 'Cauliflower', durationMinutes: 480, cost: 3.0, sell: 4.2, xp: 35, category: 'crop' },
  { id: 'parsnip', name: 'Parsnip', durationMinutes: 720, cost: 5.0, sell: 6.8, xp: 50, category: 'crop' },
  { id: 'eggplant', name: 'Eggplant', durationMinutes: 960, cost: 6.0, sell: 8.2, xp: 65, category: 'crop' },
  { id: 'corn', name: 'Corn', durationMinutes: 1200, cost: 7.5, sell: 10.0, xp: 80, category: 'crop' },
  { id: 'radish', name: 'Radish', durationMinutes: 1440, cost: 9.0, sell: 12.0, xp: 100, category: 'crop' },
  { id: 'wheat', name: 'Wheat', durationMinutes: 1440, cost: 10.0, sell: 13.5, xp: 120, category: 'crop' },
  { id: 'turnip', name: 'Turnip', durationMinutes: 2880, cost: 15.0, sell: 20.0, xp: 150, category: 'crop' },
];

export const RESOURCES = [
  { id: 'wood', name: 'Wood', respawnHours: 2, tool: 'Axe' },
  { id: 'stone', name: 'Stone', respawnHours: 4, tool: 'Pickaxe' },
  { id: 'iron', name: 'Iron', respawnHours: 8, tool: 'Stone Pickaxe' },
  { id: 'gold', name: 'Gold', respawnHours: 24, tool: 'Iron Pickaxe' },
];
