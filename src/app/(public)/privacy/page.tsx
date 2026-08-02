export default function PrivacyPage() {
  const privacyData = [
    {
      title: "1. Pendahuluan",
      points: [
        "Kebijakan Privasi ini menjelaskan bagaimana sistem U-MAMI mengumpulkan, menggunakan, dan melindungi data operasional serta informasi kredensial para staf yang menggunakan platform ini."
      ]
    },
    {
      title: "2. Informasi yang Kami Kumpulkan",
      points: [
        "Sistem U-MAMI mengumpulkan data yang diperlukan untuk kepentingan operasional restoran, meliputi:",
        "• Data Pengguna/Staf: Informasi kredensial seperti nama lengkap, username, kata sandi (password), dan peran (role) staf (Kasir, Koki, Pelayan, Pemilik).",
        "• Data Transaksi & Operasional: Catatan pesanan pelanggan, nomor meja, status antrean, rincian pembayaran, serta riwayat transaksi harian."
      ]
    },
    {
      title: "3. Penggunaan Informasi",
      points: [
        "Seluruh data yang dikumpulkan hanya digunakan untuk keperluan internal sistem restoran, di antaranya:",
        "• Memvalidasi hak akses dan keamanan akun staf.",
        "• Memproses alur pemesanan dari meja hingga penyajian di dapur.",
        "• Merekam transaksi pembayaran dan menghasilkan laporan keuangan yang akurat bagi pemilik restoran."
      ]
    },
    {
      title: "4. Keamanan dan Kerahasiaan Data",
      points: [
        "Sistem menerapkan pembatasan hak akses yang ketat berdasarkan peran pengguna.",
        "Data transaksi dan laporan keuangan bersifat rahasia dan dilindungi agar tidak disalahgunakan oleh pihak yang tidak berwenang.",
        "Pengguna (staf) diwajibkan untuk menjaga kerahasiaan akun masing-masing dan melakukan log out setelah menyelesaikan shift kerja."
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
              PRIVACY & POLICY
            </h1>
          </div>
        </div>

        {/* Content List */}
        <div className="flex flex-col gap-12">
          {privacyData.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              {/* Left Title */}
              <div className="md:w-1/3 flex-shrink-0">
                <h2 className="text-[#387bd5] text-xl font-extrabold leading-snug">
                  {item.title}
                </h2>
              </div>
              
              {/* Right Box with list */}
              <div className="md:w-2/3 bg-[#8CB9F1] rounded-xl p-6 text-white shadow-sm w-full">
                <div className="space-y-2 text-sm md:text-base font-medium">
                  {item.points.map((point, i) => (
                    <div key={i} className={`leading-relaxed ${point.startsWith("•") ? "pl-5" : ""}`}>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
