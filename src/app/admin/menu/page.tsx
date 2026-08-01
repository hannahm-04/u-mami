import { getMenu, createMenu, deleteMenu, toggleStokMenu, getKategori } from "@/actions/master";

export default async function MenuPage() {
  const [menuList, kategoriList] = await Promise.all([
    getMenu(),
    getKategori(),
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Menu</h2>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-1">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-4">Tambah Menu</h3>
            <form action={createMenu} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-blue-900">Kategori</label>
                <select name="id_kategori" required className="w-full mt-1 p-2 rounded-lg border border-blue-200">
                  <option value="">Pilih Kategori</option>
                  {kategoriList.map(k => (
                    <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-blue-900">Nama Menu</label>
                <input type="text" name="nama" required className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-blue-900">Harga (Rp)</label>
                <input type="number" name="harga" required className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-blue-900">Deskripsi</label>
                <textarea name="deskripsi" rows={2} className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
              </div>
              <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
                Simpan Menu
              </button>
            </form>
          </div>
        </div>

        <div className="xl:col-span-3">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-4 border-b">Menu</th>
                  <th className="p-4 border-b">Kategori</th>
                  <th className="p-4 border-b">Harga</th>
                  <th className="p-4 border-b text-center">Status Stok</th>
                  <th className="p-4 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {menuList.map((m) => (
                  <tr key={m.id_menu} className="hover:bg-gray-50 border-b last:border-0 text-sm">
                    <td className="p-4">
                      <p className="font-bold text-gray-800">{m.nama_menu}</p>
                      <p className="text-xs text-gray-500">{m.deskripsi}</p>
                    </td>
                    <td className="p-4">{m.kategori.nama_kategori}</td>
                    <td className="p-4 font-mono">Rp {m.harga.toLocaleString("id-ID")}</td>
                    <td className="p-4 text-center">
                      <form action={async () => {
                        "use server";
                        await toggleStokMenu(m.id_menu, m.status_stok);
                      }}>
                        <button 
                          type="submit" 
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            m.status_stok === "TERSEDIA" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {m.status_stok}
                        </button>
                      </form>
                    </td>
                    <td className="p-4 text-center">
                      <form action={async () => {
                        "use server";
                        await deleteMenu(m.id_menu);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-3 py-1 rounded-md">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {menuList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">Belum ada menu.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
