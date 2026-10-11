/**
 * ============================================================================
 * SFL API SERVICE (Layanan Integrasi API Sunflower Land)
 * ============================================================================
 * Berkomunikasi dengan Sunflower Land Community API melalui Cloudflare Worker Proxy baru:
 * https://sfl.tjah.workers.dev
 * ============================================================================
 */

const PROXY_URL = 'https://sfl.tjah.workers.dev';

/**
 * Mengambil data farm secara real-time berdasarkan Farm ID / NFT ID.
 * @param {string|number} farmId 
 * @returns {Promise<Object>} Data respons dari API SFL
 */
export async function fetchFarmData(farmId) {
  try {
    const url = `${PROXY_URL}/community/farms/${farmId}`;
    console.log('[SFL API] Fetching from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Farm tidak ditemukan (Farm ID tidak valid).');
      }
      if (response.status === 401) {
        throw new Error('API Key tidak valid pada Proxy Worker.');
      }
      if (response.status === 429) {
        throw new Error('Terlalu banyak permintaan (Rate limited). Coba beberapa saat lagi.');
      }
      throw new Error(`Gagal mengambil data farm (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[SFL API Error]:', error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Gagal terhubung (CORS/Network error). Pastikan Cloudflare Worker mengizinkan domain preview AI Studio.');
    }
    throw error;
  }
}

/**
 * Mengambil profil marketplace dari suatu farm.
 * @param {string|number} farmId 
 * @returns {Promise<Object|null>}
 */
export async function fetchMarketplaceProfile(farmId) {
  try {
    const response = await fetch(`${PROXY_URL}/community/data?type=marketplaceProfile&farmId=${farmId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching marketplace profile:', error);
    return null;
  }
}
