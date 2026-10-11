/**
 * ============================================================================
 * SFL PROVIDER (Penyedia State & Penyimpanan Data Global)
 * ============================================================================
 * Komponen Provider yang membungkus aplikasi dan mengelola state global:
 * - Farm ID pemain
 * - Profil pemain (level, saldo SFL)
 * - Penyimpanan localStorage
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { SFLContext } from './SFLContextInstance';

export function SFLProvider({ children }) {
  // State Farm ID
  const [farmId, setFarmId] = useState(() => {
    return localStorage.getItem('sfl_farm_id') || '12345';
  });

  // State Profil Pemain
  const [playerProfile, setPlayerProfile] = useState(() => {
    const saved = localStorage.getItem('sfl_player_profile');
    return saved ? JSON.parse(saved) : {
      level: 15,
      sflBalance: 250.50,
      totalPlots: 22,
    };
  });

  // State Simulasi Tersimpan
  const [savedSimulations, setSavedSimulations] = useState(() => {
    const saved = localStorage.getItem('sfl_simulations');
    return saved ? JSON.parse(saved) : [];
  });

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
  };

  return <SFLContext.Provider value={value}>{children}</SFLContext.Provider>;
}
