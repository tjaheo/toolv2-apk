export default function DashboardPanel3() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Dashboard - Panel 3 (Manajemen Aset)</h2>
        <p className="text-gray-300">Kelola inventaris benih, alat pertanian, dan bangunan di farm Anda.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="font-semibold text-white mb-3">Inventaris Benih</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex justify-between py-1 border-b border-slate-800"><span>Sunflower</span> <span className="font-bold text-green-400">45 pcs</span></li>
            <li className="flex justify-between py-1 border-b border-slate-800"><span>Potato</span> <span className="font-bold text-green-400">20 pcs</span></li>
            <li className="flex justify-between py-1"><span>Pumpkin</span> <span className="font-bold text-green-400">12 pcs</span></li>
          </ul>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="font-semibold text-white mb-3">Peralatan Aktif</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex justify-between py-1 border-b border-slate-800"><span>Iron Axe</span> <span className="text-purple-400">Durability 85%</span></li>
            <li className="flex justify-between py-1 border-b border-slate-800"><span>Gold Pickaxe</span> <span className="text-purple-400">Durability 40%</span></li>
            <li className="flex justify-between py-1"><span>Fishing Rod</span> <span className="text-purple-400">Durability 90%</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
