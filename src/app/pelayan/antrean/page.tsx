import { getAntreanAktif, tambahAntrean } from "@/actions/pelayan";
import PanggilAntreanButton from "@/components/PanggilAntreanButton";

export default async function DaftarAntreanPage() {
  const antrean = await getAntreanAktif();

  return (
    <div>
      {/* Form Input Antrean (meniru referensi gambar) */}
      <div className="bg-[#a8ccf8] rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 mb-8 shadow-sm">
        <form action={tambahAntrean} className="flex flex-col md:flex-row items-center gap-6 w-full">
          <div className="flex items-center gap-2">
            <label className="text-[#387bd5] font-extrabold text-lg">Nama</label>
            <input 
              type="text" 
              name="nama" 
              required 
              className="w-48 px-3 py-1.5 rounded-lg border-2 border-[#387bd5] bg-white text-gray-900 focus:ring-2 focus:ring-[#387bd5] outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[#387bd5] font-extrabold text-lg">Jml Kursi</label>
            <input 
              type="number" 
              name="jumlahKursi" 
              required 
              min={1}
              className="w-20 px-3 py-1.5 rounded-lg border-2 border-[#387bd5] bg-white text-gray-900 focus:ring-2 focus:ring-[#387bd5] outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="ml-auto bg-[#387bd5] hover:bg-[#2b64b1] transition text-white font-bold px-6 py-2 rounded-lg"
          >
            Tambah Antrian
          </button>
        </form>
      </div>

      {/* Grid Kartu Antrean */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
        {antrean.map((a, index) => (
          <div key={a.id_antrean} className="rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            <div className="bg-[#6b9ce8] p-3">
              <h3 className="text-white font-bold text-xl tracking-wide">
                A-{String(a.id_antrean).padStart(3, '0')}
              </h3>
            </div>
            {/* Body Kartu */}
            <div className="bg-[#a8ccf8] p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <p className="text-white font-bold text-xl">{a.nama_pelanggan}</p>
                <p className="text-white font-bold text-xl">{a.jumlah_orang} Kursi</p>
              </div>
              
              <div className="mt-auto flex justify-center">
                <PanggilAntreanButton id_antrean={a.id_antrean} />
              </div>
            </div>
          </div>
        ))}

        {antrean.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 font-semibold text-xl">
            Belum ada antrean saat ini.
          </div>
        )}
      </div>
    </div>
  );
}
