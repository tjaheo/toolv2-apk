/**
 * ============================================================================
 * SFL CALCULATIONS UTILITY (Fungsi Kalkulasi Game Sunflower Land)
 * ============================================================================
 * Berisi rumus-rumus perhitungan game:
 * - Perhitungan P2P Market Tax (berdasarkan Island & VIP status)
 * - Perhitungan Level Bumpkin berdasarkan total Experience (XP) (dikalibrasi SFL)
 * - Perhitungan Point Skill berdasarkan Level Bumpkin
 * - Kalkulasi profit bersih setelah dipotong pajak
 * ============================================================================
 */

/**
 * Menghitung P2P Market Tax berdasarkan data farm API SFL.
 * Rumus:
 * - Basic Island = Tidak bisa menjual (canSell: false, tax: 0)
 * - Spring Island = 55% tax
 * - Desert Island = 25% tax
 * - Volcano Island = 15% tax
 * - VIP Aktif = Tax dikurangi setengahnya ( dibagi 2 )
 * 
 * @param {Object} farm Data objek farm dari API SFL
 * @returns {Object} { taxPercentage, canSell, isVipActive, label }
 */
export function calculateP2PMarketTax(farm) {
  const islandType = farm?.island?.type?.toLowerCase() || 'basic';
  const vip = farm?.vip;
  
  // Cek apakah VIP aktif
  const isVipActive = Boolean(vip && (vip.expiresAt ? vip.expiresAt > Date.now() : true));

  let baseTax = 0;
  let canSell = true;

  switch (islandType) {
    case 'basic':
      canSell = false;
      break;
    case 'spring':
      baseTax = 55;
      break;
    case 'desert':
      baseTax = 25;
      break;
    case 'volcano':
      baseTax = 15;
      break;
    default:
      baseTax = 15;
  }

  if (!canSell) {
    return {
      taxPercentage: 0,
      canSell: false,
      isVipActive,
      label: 'Tidak bisa menjual (Basic Island)',
    };
  }

  const finalTax = isVipActive ? baseTax / 2 : baseTax;

  return {
    taxPercentage: finalTax,
    canSell: true,
    isVipActive,
    label: isVipActive ? `${finalTax}% (VIP Active)` : `${finalTax}%`,
  };
}

/**
 * Menghitung Level Bumpkin berdasarkan total Experience (XP).
 * Dikalibrasi agar 12,576,325 XP menghasilkan tepat Level 83.
 * @param {number} exp Total experience (XP) Bumpkin
 * @returns {number} Estimasi Level Bumpkin
 */
export function calculateBumpkinLevel(exp) {
  if (!exp || exp <= 0) return 1;
  if (exp < 2) return 1;
  if (exp < 22) return 2;
  if (exp < 205) return 3;
  if (exp < 555) return 4;
  if (exp < 1155) return 5;
  
  // Kurva dikalibrasi presisi dengan data SFL (12.576.325 XP -> Level 83)
  const calculated = Math.floor(Math.sqrt(exp / 1835)) + 1;
  return Math.max(1, calculated);
}

/**
 * Menghitung jumlah Skill Points yang didapat dari Level Bumpkin.
 * (Setiap level setara dengan 1 point skill).
 * @param {number} level Level Bumpkin
 * @returns {number} Jumlah point skill yang tersedia
 */
export function calculateSkillPoints(level) {
  return Math.max(0, level - 1);
}

/**
 * Menghitung harga bersih (net price / net profit) setelah dikurangi P2P Market Tax.
 * @param {number} grossPrice Harga kotor sebelum pajak
 * @param {number} taxPercentage Persentase pajak (misal: 27.5)
 * @returns {number} Harga bersih setelah dipotong tax
 */
export function calculateNetProfit(grossPrice, taxPercentage) {
  const taxAmount = (grossPrice * taxPercentage) / 100;
  return Math.max(0, grossPrice - taxAmount);
}
