export default function CalculatorPanel2() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Kalkulator - Panel 2 (Kalkulator Profit)</h2>
        <p className="text-gray-300">Estimasi keuntungan koin bersih setelah dikurangi modal bibit.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <h3 className="font-semibold text-white">Parameter Input</h3>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Modal Bibit (SFL)</label>
            <input type="number" defaultValue={50} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Harga Jual Hasil Panen (SFL)</label>
            <input type="number" defaultValue={120} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" />
          </div>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
          <h3 className="font-semibold text-white">Hasil Analisis</h3>
          <div className="py-4">
            <div className="text-sm text-gray-400">Estimasi Profit Bersih</div>
            <div className="text-3xl font-black text-green-400 mt-1">+70 SFL</div>
            <div className="text-xs text-purple-400 mt-2">ROI: 140%</div>
          </div>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded transition-colors">
            Simpan Simulasi
          </button>
        </div>
      </div>
    </div>
  );
}
