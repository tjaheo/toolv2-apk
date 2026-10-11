/**
 * ============================================================================
 * SFL PROVIDER (Penyedia State & Integrasi API Global)
 * ============================================================================
 * Mengelola state global aplikasi dan menghubungkannya dengan Sunflower Land API
 * melalui layanan Cloudflare Worker Proxy pemain.
 * ============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SFLContext } from './SFLContextInstance';
import { fetchFarmData } from '../services/sflApi';

export function SFLProvider({ children }) {
  // State Farm ID aktif
  const [farmId, setFarmId] = useState(() => {
    return localStorage.getItem('sfl_farm_id') || '121500';
  });

  // State data mentah dari API SFL
  const [apiFarmData, setApiFarmData] = useState(null);

  // State status loading saat mengambil data API
  const [isLoading, setIsLoading] = useState(false);

  // State pesan error jika pengambilan API gagal
  const [errorMessage, setErrorMessage] = useState(null);

  // State profil pemain lokal
  const [playerProfile, setPlayerProfile] = useState(() => {
    const saved = localStorage.getItem('sfl_player_profile');
    return saved ? JSON.parse(saved) : {
      level: 83,
      sflBalance: 1250.42,
      totalPlots: 22,
    };
  });

  // State simulasi tersimpan
  const [savedSimulations, setSavedSimulations] = useState(() => {
    const saved = localStorage.getItem('sfl_simulations');
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * Fungsi untuk mengambil data farm dari API Sunflower Land via Proxy Worker
   */
  const loadFarmData = useCallback(async (targetId) => {
    if (!targetId) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await fetchFarmData(targetId);
      setApiFarmData(result);
      
      if (result?.farm?.balance) {
        setPlayerProfile(prev => ({
          ...prev,
          sflBalance: parseFloat(result.farm.balance || '0'),
        }));
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal terhubung ke API SFL.');
      setApiFarmData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data awal saat mount pertama kali
  useEffect(() => {
    loadFarmData(farmId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sinkronisasi ke localStorage
  useEffect(() => {
    localStorage.setItem('sfl_farm_id', farmId);
  }, [farmId]);

  useEffect(() => {
    localStorage.setItem('sfl_player_profile', JSON.stringify(playerProfile));
  }, [playerProfile]);

  useEffect(() => {
    localStorage.setItem('sfl_simulations', JSON.stringify(savedSimulations));
  }, [savedSimulations]);

  const updateFarmId = (newId) => {
    setFarmId(newId);
    loadFarmData(newId);
  };

  const addSimulation = (simData) => {
    setSavedSimulations(prev => [ { id: Date.now(), ...simData }, ...prev ]);
  };

  const removeSimulation = (id) => {
    setSavedSimulations(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    farmId,
    updateFarmId,
    playerProfile,
    setPlayerProfile,
    savedSimulations,
    addSimulation,
    removeSimulation,
    apiFarmData,
    isLoading,
    errorMessage,
    refreshFarm: () => loadFarmData(farmId),
  };

  return <SFLContext.Provider value={value}>{children}</SFLContext.Provider>;
}
