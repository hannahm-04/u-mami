"use client";

import { useState, useEffect } from "react";
import { getRiwayatPesanan } from "@/actions/kasir";

export default function RiwayatPesananPage() {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    getRiwayatPesanan().then(setRiwayat);
  }, []);

  const filteredRiwayat = riwayat.filter(r => {
    if (!startDate && !endDate) return true;
    const date = new Date(r.waktu_pesan);
    date.setHours(0, 0, 0, 0); // normalize time for exact date comparison
    
    let passStart = true;
    let passEnd = true;

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      passStart = date >= start;
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      passEnd = date <= end;
    }

    return passStart && passEnd;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-[#387bd5] uppercase bg-blue-200 inline-block px-8 py-2 rounded-xl">
          Riwayat Pesanan
        </h2>
        <div className="flex flex-wrap gap-2 text-[#387bd5] items-center font-bold">
          <div className="border-2 border-blue-400 rounded-lg px-3 py-1 bg-white flex items-center gap-2">
            <input 
              type="date" 
              className="outline-none text-gray-900 bg-transparent text-sm w-full"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <span>To</span>
          <div className="border-2 border-blue-400 rounded-lg px-3 py-1 bg-white flex items-center gap-2">
            <input 
              type="date" 
              className="outline-none text-gray-900 bg-transparent text-sm w-full"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { setStartDate(""); setEndDate(""); }}
            className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-[#a8ccf8] rounded-xl p-4 min-h-[500px]">
        {filteredRiwayat.length === 0 ? (
          <p className="text-white text-center mt-20 font-bold text-xl">Belum ada riwayat pesanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[#387bd5] font-semibold bg-white rounded-lg overflow-hidden whitespace-nowrap">
              <thead className="bg-[#6b9ce8] text-white">
                <tr>
                  <th className="p-3">Waktu</th>
                  <th className="p-3">No. Pesanan</th>
                  <th className="p-3">Meja</th>
                  <th className="p-3">Total Harga</th>
                  <th className="p-3">Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiwayat.map(r => (
                  <tr key={r.id_pesanan} className="border-b border-blue-100 last:border-0 hover:bg-blue-50 transition">
                    <td className="p-3 text-gray-900">
                      {new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(r.waktu_pesan))}
                    </td>
                    <td className="p-3 text-gray-900">P-{String(r.id_pesanan).padStart(3, '0')}</td>
                    <td className="p-3 text-gray-900">Meja {r.meja?.no_meja}</td>
                    <td className="p-3 text-gray-900">Rp {r.total_harga?.toLocaleString("id-ID")}</td>
                    <td className="p-3 text-gray-900">
                      {r.pembayaran?.metode_pembayaran}
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
