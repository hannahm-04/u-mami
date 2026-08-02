"use client";

import { useState } from "react";
import { panggilAntrean } from "@/actions/pelayan";

export default function PanggilAntreanButton({ id_antrean }: { id_antrean: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePanggil = async () => {
    setIsLoading(true);
    try {
      const res = await panggilAntrean(id_antrean);
      if (res?.error) {
        alert(res.error);
      } else if (res?.success) {
        alert(`Antrean berhasil dipanggil dan diarahkan ke Meja M${String(res.meja.replace('M','')).padStart(2, '0')}`);
      }
    } catch (err) {
      alert("Terjadi kesalahan saat memanggil antrean.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePanggil}
      disabled={isLoading}
      className="bg-[#387bd5] hover:bg-[#2b64b1] transition text-white font-bold px-4 py-2 rounded-lg text-sm shadow-md disabled:opacity-50"
    >
      {isLoading ? "Memproses..." : "Panggil Antrean"}
    </button>
  );
}
