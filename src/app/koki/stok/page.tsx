"use client";

import { useEffect, useState } from "react";
import { getMenu, updateStokMenu } from "@/actions/master";

export default function DaftarStokPage() {
  const [menuList, setMenuList] = useState<any[]>([]);

  const fetchMenu = async () => {
    const data = await getMenu();
    setMenuList(data);
  };

  useEffect(() => {
    fetchMenu();
    const interval = setInterval(fetchMenu, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id: string, change: number) => {
    // Optimistic UI update
    setMenuList(prev => prev.map(m => m.id_menu === id ? { ...m, stok: Math.max(0, m.stok + change) } : m));
    await updateStokMenu(id, change);
    fetchMenu();
  };

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
              <th className="p-4 border-b text-center">Stok</th>
              <th className="p-4 border-b text-center">Aksi (Ubah)</th>
            </tr>
          </thead>
          <tbody>
            {menuList.map((m) => (
              <tr key={m.id_menu} className="hover:bg-gray-50 border-b last:border-0 text-sm text-gray-900">
                <td className="p-4 font-bold text-gray-800">{m.nama_menu}</td>
                <td className="p-4">{m.kategori?.nama_kategori}</td>
                <td className="p-4 text-center font-bold text-lg">
                  <span className={`px-3 py-1 rounded-full ${m.stok > 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}>
                    {m.stok}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-center items-center">
                    <button 
                      onClick={() => handleUpdate(m.id_menu, -1)}
                      disabled={m.stok <= 0}
                      className="bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 font-bold px-4 py-1.5 rounded-lg border border-red-200 transition"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => handleUpdate(m.id_menu, 1)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 py-1.5 rounded-lg border border-blue-200 transition"
                    >
                      +
                    </button>
                  </div>
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
