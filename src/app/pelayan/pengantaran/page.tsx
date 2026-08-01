import { getPesananSiapAntar, konfirmasiDiantar } from "@/actions/pelayan";

export default async function PengantaranPesananPage() {
  const pesananList = await getPesananSiapAntar();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#387bd5] mb-8 uppercase">
        Pengantaran Pesanan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pesananList.map((p, index) => (
          <div key={p.id_pesanan} className="rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            {/* Header Kartu */}
            <div className="bg-[#6b9ce8] p-4">
              <h3 className="text-white font-bold text-xl tracking-wide">
                P-{String(index + 1).padStart(3, '0')}
              </h3>
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
                  await konfirmasiDiantar(p.id_pesanan);
                }}>
                  <button 
                    type="submit" 
                    className="bg-[#387bd5] hover:bg-[#2b64b1] transition text-white font-bold px-6 py-2 rounded-xl shadow-md"
                  >
                    Konfirmasi Diantar
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {pesananList.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 font-semibold text-xl">
            Belum ada pesanan yang siap diantar.
          </div>
        )}
      </div>
    </div>
  );
}
