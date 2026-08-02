"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotificationPelayan() {
  const [pesananBaru, setPesananBaru] = useState<any>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    // Polling notifikasi dihentikan sesuai permintaan
  }, []);

  if (!pesananBaru) return null;

  const handleAntarPesanan = () => {
    setPesananBaru(null);
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-[#387bd5] mb-6 text-center">
          Pesanan Siap
        </h2>

        <div className="w-full bg-[#a8ccf8] rounded-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#6b9ce8] p-4 flex justify-between items-center text-white">
            <span className="font-bold text-xl tracking-wide">P-{String(pesananBaru.id_pesanan).padStart(3, '0')}</span>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-4 text-[#387bd5]">
            <p className="font-bold text-lg">
              No Meja : M{String(pesananBaru.meja.no_meja).padStart(2, '0')}
            </p>
            <div>
              <p className="font-bold text-lg mb-1">Pesanan:</p>
              <ul className="list-disc list-inside text-sm font-semibold space-y-1 ml-2">
                {pesananBaru.detail_pesanan.map((d: any) => (
                  <li key={d.id_detail}>
                    {d.menu.nama_menu} ({d.jml_pesanan}x)
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-center">
              <button 
                onClick={handleAntarPesanan}
                className="bg-[#387bd5] hover:bg-[#2b64b1] transition text-white font-bold px-6 py-2 rounded-xl shadow-md w-full"
              >
                Antar Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
