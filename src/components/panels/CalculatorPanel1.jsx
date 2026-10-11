export default function CalculatorPanel1() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Kalkulator - Panel 1 (Kalkulator Tanaman)</h2>
        <p className="text-gray-300">Hitung durasi waktu panen dan jadwal tanam optimal.</p>
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Pilih Jenis Tanaman</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
            <option>Sunflower (1 jam)</option>
            <option>Potato (4 jam)</option>
            <option>Pumpkin (8 jam)</option>
            <option>Carrot (12 jam)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Jumlah Plot Tanah</label>
          <input type="number" defaultValue={22} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" />
        </div>
        <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors">
          Hitung Jadwal Panen
        </button>
      </div>
    </div>
  );
}
