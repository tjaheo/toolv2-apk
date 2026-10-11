export default function EtcPanel3() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Etc - Panel 3 (Pengaturan & Info)</h2>
        <p className="text-gray-300">Informasi aplikasi dan pengaturan preferensi pengguna.</p>
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-gray-300">Versi Aplikasi</span>
          <span className="font-bold text-white">v2.0.0</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-gray-300">Tema</span>
          <span className="font-bold text-green-400">Dark Mode (SFL)</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-300">Status Sinkronisasi</span>
          <span className="font-bold text-green-400">Tersinkronisasi</span>
        </div>
      </div>
    </div>
  );
}
