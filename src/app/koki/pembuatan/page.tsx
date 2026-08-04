import { getPesananDiproses, tandaiSelesaiDimasak } from "@/actions/koki";

export default async function PembuatanPesananPage() {
  const pesananList = await getPesananDiproses();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#387bd5] mb-8 uppercase">
        Pembuatan Pesanan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pesananList.map((p, index) => {
          // Format time (e.g. 10.32 a.m)
          const timeString = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).format(new Date(p.waktu_pesan)).toLowerCase().replace(":", ".");

          return (
            <div key={p.id_pesanan} className="rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
              {/* Header Kartu */}
              <div className="bg-[#6b9ce8] p-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-xl tracking-wide">
                  P-{String(p.id_pesanan).padStart(3, '0')}
                </h3>
                <span className="text-white font-semibold text-sm">
                  {timeString}
                </span>
              </div>
              
              {/* Body Kartu */}
              <div className="bg-[#a8ccf8] p-6 flex-1 flex flex-col">
                <div className="mb-6 flex-1">
                  <p className="text-[#387bd5] font-bold text-lg mb-2">
                    No Meja : <span className="text-[#387bd5]">{p.meja.no_meja}</span>
                  </p>
                  <p className="text-[#387bd5] font-bold text-lg mb-2">
                    Pesanan:
                  </p>
                  <ul className="list-disc list-inside text-[#387bd5] font-semibold text-sm space-y-1 ml-2">
                    {p.detail_pesanan.map(d => (
                      <li key={d.id_detail}>
                        {d.menu.nama_menu} ({d.jml_pesanan}x)
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto flex justify-center">
                  <form action={async () => {
                    "use server";
                    await tandaiSelesaiDimasak(p.id_pesanan);
                  }}>
                    <button 
                      type="submit" 
                      className="bg-[#387bd5] hover:bg-[#2b64b1] transition text-white font-bold px-6 py-2 rounded-xl shadow-md"
                    >
                      Konfirmasi Selesai
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}

        {pesananList.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 font-semibold text-xl">
            Belum ada pesanan yang masuk.
          </div>
        )}
      </div>
    </div>
  );
}
