"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { prosesPembayaran } from "@/actions/kasir";
import * as htmlToImage from "html-to-image";

export default function PembayaranClient({ pesanan }: { pesanan: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [metode, setMetode] = useState<"CASH" | "QRIS" | "DEBIT">("CASH");
  const [isLoading, setIsLoading] = useState(false);
  const [showStruk, setShowStruk] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const pajak = pesanan.total_harga * 0.1; // Asumsi pajak 10%
  const totalTagihan = pesanan.total_harga + pajak;

  const handleProses = async () => {
    if (!session?.user?.id) return alert("Sesi login tidak ditemukan. Harap relogin.");
    setIsLoading(true);
    try {
      await prosesPembayaran(pesanan.id_pesanan, session.user.id, metode, totalTagihan);
      setShowStruk(true); // Show receipt modal instead of redirecting immediately
    } catch (error) {
      console.error(error);
      alert("Gagal memproses pembayaran");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadStruk = async () => {
    if (receiptRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(receiptRef.current, { pixelRatio: 2 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Struk_${pesanan.id_pesanan}.png`;
        link.click();
      } catch (err) {
        console.error("Gagal mendownload struk:", err);
      }
    }
  };

  const closeAndRedirect = () => {
    setShowStruk(false);
    router.push("/kasir/riwayat");
  };

  const timeString = new Intl.DateTimeFormat('en-US', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  }).format(new Date(pesanan.waktu_pesan));

  return (
    <>
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
            <div className="bg-white px-4 py-1 rounded-full flex-1 truncate">P-{String(pesanan.id_pesanan).padStart(3, '0')}</div>
          </div>
          <div className="flex">
            <span className="w-48">No. Meja</span>
            <div className="bg-white px-4 py-1 rounded-full flex-1">Meja M{String(pesanan.meja.no_meja).padStart(2, '0')}</div>
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

      {/* MODAL STRUK */}
      {showStruk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* The element to be captured by html2canvas */}
            <div ref={receiptRef} className="p-8 bg-white text-black font-sans w-full">
              {/* Logo (Simulated for receipt) */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 border-2 border-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-extrabold text-2xl text-center leading-none">U-<br/>MAMI</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6">Struk Pembelian</h2>
              
              <div className="space-y-2 text-sm md:text-base font-semibold">
                <div className="flex justify-between">
                  <span>No Pesanan</span>
                  <span>P-{String(pesanan.id_pesanan).padStart(3, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span>No Meja</span>
                  <span>M{String(pesanan.meja.no_meja).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu Pemesanan</span>
                  <span>{timeString}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kasir</span>
                  <span>{session?.user?.name || session?.user?.username || "Kasir"}</span>
                </div>
                
                <div className="mt-6 mb-2">
                  <span>Rincian Pesanan</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs border-b border-black pb-1">
                  <span className="w-1/2">Nama menu</span>
                  <span className="w-1/4 text-center">Jumlah</span>
                  <span className="w-1/4 text-right">Harga</span>
                </div>
                {pesanan.detail_pesanan.map((d: any) => (
                  <div key={d.id_detail} className="flex justify-between py-1 border-b border-gray-100 border-dashed text-sm">
                    <span className="w-1/2 line-clamp-1">{d.menu.nama_menu}</span>
                    <span className="w-1/4 text-center">{d.jml_pesanan}x</span>
                    <span className="w-1/4 text-right">Rp {d.subtotal.toLocaleString("id-ID")}</span>
                  </div>
                ))}

                <div className="mt-6 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Harga</span>
                    <span>Rp {pesanan.total_harga.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak (10%)</span>
                    <span>Rp {pajak.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total Tagihan</span>
                    <span>Rp {totalTagihan.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span>Metode ({metode})</span>
                    <span>Rp {totalTagihan.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kembali</span>
                    <span>Rp 0</span>
                  </div>
                </div>

                <div className="mt-8 text-center font-bold text-lg">
                  Terimakasih telah berkunjung
                </div>
              </div>
            </div>

            {/* Modal Actions (Not part of the canvas screenshot) */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-4 justify-center rounded-b-xl sticky bottom-0">
              <button 
                onClick={closeAndRedirect}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition"
              >
                Tutup
              </button>
              <button 
                onClick={downloadStruk}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Download Struk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
