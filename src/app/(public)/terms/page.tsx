export default function TermsPage() {
  const termsData = [
    {
      title: "1. Akses & Keamanan Akun",
      points: [
        "Gunakan akun sesuai peran masing-masing dan jaga kerahasiaan password.",
        "Dilarang menggunakan akun staf lain dan wajib logout setelah shift selesai."
      ]
    },
    {
      title: "2. Tanggung Jawab Peran",
      points: [
        "Kasir: Cek ketersediaan stok sebelum mengkonfirmasi pesanan dan catat pembayaran dengan teliti.",
        "Koki: Masak sesuai urutan antrean di layar (FIFO) dan perbarui status makanan jika sudah siap.",
        "Pelayan: Cocokkan nomor meja pada sistem dengan nota fisik sebelum mengantarkan makanan.",
        "Pemilik Restoran: Mengelola data menu beserta harga, mengatur hak akses pegawai, serta mengevaluasi laporan keuangan secara berkala."
      ]
    },
    {
      title: "3. Integritas & Kerahasiaan Data",
      points: [
        "Dilarang memanipulasi atau mengubah data transaksi operasional.",
        "Data penjualan harian dan laporan keuangan bersifat rahasia dan hanya dapat diakses secara eksklusif oleh Pemilik Restoran."
      ]
    },
    {
      title: "4. Kendala Teknis",
      points: [
        "Segera laporkan kepada supervisor atau tim teknis jika terjadi gangguan internet, error sistem, atau kerusakan perangkat keras."
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white pb-20 pt-16 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Title */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#c5e0fc] px-16 py-3 rounded-xl inline-block shadow-sm">
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.15)" }}>
              TERM & CONDITION
            </h1>
          </div>
        </div>

        {/* Content List */}
        <div className="flex flex-col gap-12">
          {termsData.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              {/* Left Title */}
              <div className="md:w-1/3 flex-shrink-0">
                <h2 className="text-[#387bd5] text-xl font-extrabold leading-snug">
                  {item.title}
                </h2>
              </div>
              
              {/* Right Box with list */}
              <div className="md:w-2/3 bg-[#8CB9F1] rounded-xl p-6 text-white shadow-sm w-full">
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base font-medium">
                  {item.points.map((point, i) => (
                    <li key={i} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
