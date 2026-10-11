export default function DashboardPanel1() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Dashboard - Panel 1 (Utama)</h2>
        <p className="text-gray-300">Selamat datang di SFL Hub! Ini adalah halaman utama dan panel default Anda.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Status Farm</div>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Aktif / Online
          </div>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Total Panen Hari Ini</div>
          <div className="text-2xl font-bold text-green-400">142 SFL</div>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-1">Efisiensi</div>
          <div className="text-2xl font-bold text-purple-400">98.5%</div>
        </div>
      </div>
    </div>
  );
}
