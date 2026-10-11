export default function CalculatorPanel3() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Kalkulator - Panel 3 (Kalkulator Efisiensi)</h2>
        <p className="text-gray-300">Hitung tingkat efisiensi penggunaan energi dan waktu dalam aktivitas bertani.</p>
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-gray-300">Energi per Aksi</span>
          <span className="font-bold text-white">5 Stamina</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-gray-300">Total Stamina Harian</span>
          <span className="font-bold text-white">250 Stamina</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-300">Maksimal Aksi Optimal</span>
          <span className="font-bold text-purple-400">50 Kali Tindakan</span>
        </div>
      </div>
    </div>
  );
}
