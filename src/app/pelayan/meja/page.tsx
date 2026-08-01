import { getSemuaMeja, toggleStatusMeja } from "@/actions/pelayan";
import { Armchair } from "lucide-react";

export default async function StatusMejaPage() {
  const semuaMeja = await getSemuaMeja();

  // Asumsi untuk referensi UI: Meja 1-10 = Indoor, Meja 11+ = Outdoor
  // Atau pisahkan berdasarkan prefix jika menggunakan string. Kita coba pisahkan jadi dua array.
  const indoorMeja = semuaMeja.filter(m => {
    const num = parseInt(m.no_meja.replace(/\D/g, ''));
    return !isNaN(num) && num <= 10;
  });
  
  const outdoorMeja = semuaMeja.filter(m => {
    const num = parseInt(m.no_meja.replace(/\D/g, ''));
    return isNaN(num) || num > 10;
  });

  const renderTableGroup = (title: string, tables: typeof semuaMeja) => (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-[#387bd5] flex items-center gap-2 mb-4">
        {/* Placeholder for Home Icon as in reference */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-4">
        {tables.map(m => {
          const isTersedia = m.status_meja === "KOSONG";
          return (
            <div 
              key={m.id_meja} 
              className={`relative w-40 h-48 rounded-xl p-4 flex flex-col items-center justify-between shadow-sm transition ${
                isTersedia ? "bg-[#a8ccf8]" : "bg-[#656565]"
              }`}
            >
              {/* Header (Icon + Number) */}
              <div className="w-full flex items-center justify-start gap-1 text-white font-bold text-2xl">
                <Armchair size={24} />
                <span>{m.no_meja.replace(/\D/g, '').padStart(2, '0')}</span>
              </div>
              
              {/* Capacity */}
              <div className="text-white font-bold text-xl text-center">
                {m.kapasitas} kursi
              </div>
              
              {/* Toggle Form / Button */}
              <form action={async () => {
                "use server";
                await toggleStatusMeja(m.id_meja, m.status_meja);
              }} className="w-full">
                <button 
                  type="submit" 
                  className={`w-full py-1.5 rounded-full font-bold text-sm bg-white ${
                    isTersedia ? "text-[#387bd5]" : "text-gray-700"
                  }`}
                >
                  {isTersedia ? "Tersedia" : "Terisi"}
                </button>
              </form>
            </div>
          );
        })}
        {tables.length === 0 && (
          <p className="text-gray-400">Tidak ada meja untuk kategori ini.</p>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Container ini sudah di dalam bg-white yang rounding */}
      {indoorMeja.length > 0 && renderTableGroup("Indoor", indoorMeja)}
      {outdoorMeja.length > 0 && renderTableGroup("Outdoor", outdoorMeja)}
    </div>
  );
}
