import { getMenu, toggleStokMenu } from "@/actions/master";

export default async function DaftarStokPage() {
  const menuList = await getMenu();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#387bd5] mb-8 uppercase">
        Daftar Stok Menu
      </h2>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-4 border-b">Menu</th>
              <th className="p-4 border-b">Kategori</th>
              <th className="p-4 border-b text-center">Status Stok</th>
              <th className="p-4 border-b text-center">Aksi (Ubah)</th>
            </tr>
          </thead>
          <tbody>
            {menuList.map((m) => (
              <tr key={m.id_menu} className="hover:bg-gray-50 border-b last:border-0 text-sm">
                <td className="p-4 font-bold text-gray-800">{m.nama_menu}</td>
                <td className="p-4">{m.kategori.nama_kategori}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    m.status_stok === "TERSEDIA" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {m.status_stok}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <form action={async () => {
                    "use server";
                    await toggleStokMenu(m.id_menu, m.status_stok);
                  }}>
                    <button 
                      type="submit" 
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 py-1.5 rounded-lg border border-blue-200 transition"
                    >
                      Toggle Stok
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {menuList.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada menu terdaftar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
