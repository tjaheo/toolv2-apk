export default function EtcPanel1() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Etc - Panel 1 (Catatan & Memo)</h2>
        <p className="text-gray-300">Catat rencana harian, target panen, atau pengingat penting lainnya.</p>
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <textarea 
          rows={5} 
          placeholder="Tulis catatan di sini... (contoh: Panen pumpkin jam 15.00)" 
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
        ></textarea>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors">
          Simpan Catatan
        </button>
      </div>
    </div>
  );
}
