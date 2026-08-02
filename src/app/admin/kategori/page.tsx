import { getKategori, createKategori, deleteKategori } from "@/actions/master";

export default async function KategoriPage() {
  const kategoriList = await getKategori();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Kategori Menu</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-4">Tambah Kategori</h3>
            <form action={createKategori} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-blue-900">Nama Kategori</label>
                <input 
                  type="text" 
                  name="nama" 
                  required 
                  className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-4 border-b">ID</th>
                  <th className="p-4 border-b">Nama Kategori</th>
                  <th className="p-4 border-b w-24">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kategoriList.map((k) => (
                  <tr key={k.id_kategori} className="hover:bg-gray-50 border-b last:border-0 text-gray-900">
                    <td className="p-4 text-gray-800">#{k.id_kategori}</td>
                    <td className="p-4 font-semibold">{k.nama_kategori}</td>
                    <td className="p-4">
                      <form action={async () => {
                        "use server";
                        await deleteKategori(k.id_kategori);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-1 rounded-md">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {kategoriList.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">Belum ada kategori.</td>
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
