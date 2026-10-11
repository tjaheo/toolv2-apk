/**
 * ============================================================================
 * CUSTOM HOOK: useSFL
 * ============================================================================
 * Hook kustom untuk mengakses SFLContext dengan aman.
 * ============================================================================
 */

import { useContext } from 'react';
import { SFLContext } from '../context/SFLContextInstance';

export function useSFL() {
  const context = useContext(SFLContext);
  if (!context) {
    throw new Error('useSFL harus digunakan di dalam SFLProvider');
  }
  return context;
}
