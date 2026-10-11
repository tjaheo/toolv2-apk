export default function DashboardPanel2() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Dashboard - Panel 2 (Statistik & Grafik)</h2>
        <p className="text-gray-300">Analisis tren hasil panen dan pendapatan koin dalam beberapa hari terakhir.</p>
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Grafik Pertumbuhan</h3>
        <div className="h-64 flex items-end gap-4 justify-between pt-6 border-b border-slate-800 px-4">
          {[40, 65, 30, 85, 60, 95, 75].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-green-500/80 rounded-t hover:bg-green-400 transition-all duration-300" 
                style={{ height: `${val}%` }}
              ></div>
              <span className="text-xs text-gray-400">Hari {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
