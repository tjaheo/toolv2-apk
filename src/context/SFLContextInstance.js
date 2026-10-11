/**
 * ============================================================================
 * SFL CONTEXT INSTANCE (Instance Context Global)
 * ============================================================================
 * File khusus untuk membuat React Context instance agar terpisah dari komponen 
 * dan hook (mendukung Fast Refresh Vite secara optimal).
 * ============================================================================
 */

import { createContext } from 'react';

export const SFLContext = createContext(undefined);
