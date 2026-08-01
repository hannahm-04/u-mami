import { getMeja, createMeja, deleteMeja } from "@/actions/master";

export default async function MejaPage() {
  const mejaList = await getMeja();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Meja</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-4">Tambah Meja</h3>
            <form action={createMeja} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-blue-900">Nomor Meja</label>
                <input 
                  type="number" 
                  name="nomor" 
                  required 
                  className="w-full mt-1 p-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-blue-900">Kapasitas (Orang)</label>
                <input 
                  type="number" 
                  name="kapasitas" 
                  required 
                  className="w-full mt-1 p-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition mt-2"
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
                  <th className="p-4 border-b">Nomor Meja</th>
                  <th className="p-4 border-b text-center">Kapasitas</th>
                  <th className="p-4 border-b text-center">Status</th>
                  <th className="p-4 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mejaList.map((m) => (
                  <tr key={m.id_meja} className="hover:bg-gray-50 border-b last:border-0">
                    <td className="p-4 font-bold text-lg text-gray-800">Meja {m.nomor_meja}</td>
                    <td className="p-4 text-center">{m.kapasitas} orang</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        m.status === "KOSONG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <form action={async () => {
                        "use server";
                        await deleteMeja(m.id_meja);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-1 rounded-md">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {mejaList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada meja.</td>
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
