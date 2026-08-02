"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";

export default function LaporanKeuangan() {
  const [filter, setFilter] = useState("harian");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLaporan() {
      setLoading(true);
      try {
        const res = await fetch(`/api/pemilik/laporan?filter=${filter}`);
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
    fetchLaporan();
  }, [filter]);

  const totalOmzet = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#387bd5]">Laporan Keuangan</h2>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-[#8CB9F1] rounded-full px-4 py-2 font-bold text-[#387bd5] focus:outline-none focus:ring-2 focus:ring-[#3A7AD5]"
        >
          <option value="harian">7 Hari Terakhir</option>
          <option value="bulanan">12 Bulan Terakhir</option>
          <option value="tahunan">5 Tahun Terakhir</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
        <p className="text-gray-500 font-semibold mb-1">Total Pendapatan ({filter})</p>
        <h3 className="text-3xl font-extrabold text-[#387bd5]">
          Rp {totalOmzet.toLocaleString("id-ID")}
        </h3>
      </div>

      <div className="flex-1 bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm min-h-[400px]">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#387bd5]" />
          </div>
        ) : data.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center text-gray-500 font-semibold">
            Tidak ada data transaksi.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 600 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontWeight: 600 }}
                tickFormatter={(value) => `Rp ${(value / 1000)}k`}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#f3f7fb' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, "Pendapatan"]}
              />
              <Bar dataKey="total" fill="#8CB9F1" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
