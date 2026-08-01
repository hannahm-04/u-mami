"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { prosesPembayaran } from "@/actions/kasir";

export default function PembayaranClient({ pesanan }: { pesanan: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [metode, setMetode] = useState<"CASH" | "QRIS" | "DEBIT">("CASH");
  const [isLoading, setIsLoading] = useState(false);

  const pajak = pesanan.total_harga * 0.1; // Asumsi pajak 10%
  const totalTagihan = pesanan.total_harga + pajak;

  const handleProses = async () => {
    if (!session?.user?.id) return alert("Sesi login tidak ditemukan. Harap relogin.");
    setIsLoading(true);
    try {
      await prosesPembayaran(pesanan.id_pesanan, session.user.id, metode, totalTagihan);
      alert("Pembayaran Berhasil! Pesanan sedang diproses di dapur.");
      router.push("/kasir/riwayat");
    } catch (error) {
      console.error(error);
      alert("Gagal memproses pembayaran");
    } finally {
      setIsLoading(false);
    }
  };

  const timeString = new Intl.DateTimeFormat('en-US', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  }).format(new Date(pesanan.waktu_pesan));

  return (
    <div className="bg-[#a8ccf8] rounded-3xl p-8 max-w-2xl mx-auto shadow-md">
      <h3 className="text-3xl font-bold text-[#387bd5] mb-8 text-center uppercase tracking-widest">
        Pesanan
      </h3>
      
      <div className="flex flex-col gap-4 text-[#387bd5] font-bold text-lg max-w-lg mx-auto">
        <div className="flex">
          <span className="w-48">Tgl/Waktu</span>
          <div className="bg-white px-4 py-1 rounded-full flex-1">{timeString}</div>
        </div>
        <div className="flex">
          <span className="w-48">No. Pesanan</span>
          <div className="bg-white px-4 py-1 rounded-full flex-1 truncate">{pesanan.id_pesanan}</div>
        </div>
        <div className="flex">
          <span className="w-48">No. Meja</span>
          <div className="bg-white px-4 py-1 rounded-full flex-1">Meja {pesanan.meja.no_meja}</div>
        </div>
        
        <div className="mt-4">
          <span className="mb-2 block">Rincian Pesanan</span>
          <div className="flex flex-col gap-2">
            {pesanan.detail_pesanan.map((d: any) => (
              <div key={d.id_detail} className="bg-white px-4 py-1 rounded-full flex justify-between">
                <span>{d.menu.nama_menu} ({d.jml_pesanan}x)</span>
                <span>Rp {d.subtotal.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 w-2/3 ml-auto text-right">
          <div className="flex justify-between items-center">
            <span>Total Harga</span>
            <div className="bg-white px-4 py-1 rounded-full w-40 text-left">Rp {pesanan.total_harga.toLocaleString("id-ID")}</div>
          </div>
          <div className="flex justify-between items-center">
            <span>Pajak (10%)</span>
            <div className="bg-white px-4 py-1 rounded-full w-40 text-left">Rp {pajak.toLocaleString("id-ID")}</div>
          </div>
          <div className="flex justify-between items-center text-[#2b64b1]">
            <span>Total Tagihan</span>
            <div className="bg-white px-4 py-1 rounded-full w-40 text-left">Rp {totalTagihan.toLocaleString("id-ID")}</div>
          </div>
        </div>
        
        <div className="mt-8">
          <span className="block mb-3">Metode Pembayaran</span>
          <div className="flex gap-4">
            {(["CASH", "QRIS", "DEBIT"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetode(m)}
                className={`flex-1 py-2 rounded-xl text-center text-white font-bold transition ${metode === m ? "bg-[#387bd5] border-2 border-white" : "bg-[#6b9ce8]"}`}
              >
                {m === "CASH" ? "Tunai" : m === "QRIS" ? "Qris" : "Debit"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={handleProses}
            disabled={isLoading}
            className="bg-white text-[#387bd5] hover:bg-gray-100 transition px-16 py-3 rounded-xl font-bold text-xl shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Proses"}
          </button>
        </div>
      </div>
    </div>
  );
}
