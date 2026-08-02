"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type MenuTerlaris = {
  id_menu: string;
  nama_menu: string;
  kategori: string;
  total_terjual: number;
  total_pendapatan: number;
};

export default function MenuTerlarisPage() {
  const [data, setData] = useState<MenuTerlaris[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenuTerlaris() {
      try {
        const res = await fetch("/api/pemilik/menu-terlaris");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenuTerlaris();
  }, []);

  return (
    <div className="flex flex-col h-full gap-6">
      <h2 className="text-2xl font-bold text-[#387bd5]">Menu Terlaris</h2>

      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm flex-1">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#387bd5]" />
          </div>
        ) : data.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-gray-500 font-semibold">
            Belum ada data penjualan menu.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="p-4 text-gray-500 font-bold">Peringkat</th>
                  <th className="p-4 text-gray-500 font-bold">Nama Menu</th>
                  <th className="p-4 text-gray-500 font-bold">Kategori</th>
                  <th className="p-4 text-gray-500 font-bold">Total Terjual</th>
                  <th className="p-4 text-gray-500 font-bold">Total Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id_menu} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">
                      {index === 0 ? "🥇 1" : index === 1 ? "🥈 2" : index === 2 ? "🥉 3" : index + 1}
                    </td>
                    <td className="p-4 font-bold text-[#387bd5]">{item.nama_menu}</td>
                    <td className="p-4 text-gray-600">{item.kategori}</td>
                    <td className="p-4 font-bold text-gray-700">{item.total_terjual} porsi</td>
                    <td className="p-4 font-bold text-green-600">
                      Rp {item.total_pendapatan.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
