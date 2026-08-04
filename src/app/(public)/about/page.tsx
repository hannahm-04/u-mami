import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white pb-20 pt-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-12 items-center">
        
        {/* Main Banner */}
        <div className="w-full bg-[#8CB9F1] rounded-[32px] pt-12 pb-24 px-8 md:px-16 text-center text-white relative overflow-hidden shadow-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-widest uppercase">
            U-MAMI
          </h1>
          <p className="text-sm md:text-lg font-medium leading-relaxed max-w-3xl mx-auto z-10 relative">
            Selamat datang di U-Mami restoran yang menghadirkan beragam hidangan berkualitas dengan suasana yang nyaman.
            Kami percaya bahwa pengalaman makan yang menyenangkan tidak hanya berasal dari cita rasa makanan, tapi juga dari kenyamanan serta kemudahan yang dirasakan setiap pelanggan selama berada di restoran.
          </p>
          

        </div>

        {/* First Block */}
        <div className="w-full md:w-[80%]">
          <div className="bg-[#8CB9F1] bg-opacity-30 p-2 rounded-xl mb-4 inline-block shadow-sm">
            <h2 className="bg-[#8CB9F1] text-white px-6 py-2 rounded-lg font-bold text-xl md:text-2xl">
              Menggunakan sistem operasional berintegrasi
            </h2>
          </div>
          <div className="bg-[#e4effb] p-6 rounded-xl text-[#387bd5] font-semibold text-sm md:text-base leading-relaxed shadow-sm">
            Menghubungkan setiap tahap pelayanan mulai dari pemesanan, antrean meja, proses dapur, hingga pembayaran dan pelaporan penjualan di mana semua berjalan baik.
          </div>
        </div>

        {/* Second Block */}
        <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#e4effb] shadow-md flex-shrink-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" 
              alt="Food" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
             <div className="bg-[#8CB9F1] bg-opacity-30 p-2 rounded-xl mb-4 inline-block shadow-sm w-fit">
              <h2 className="bg-[#8CB9F1] text-white px-8 py-2 rounded-lg font-bold text-xl md:text-2xl text-center md:text-left">
                Komitmen Kami
              </h2>
            </div>
            <div className="bg-[#e4effb] p-6 rounded-xl text-[#387bd5] font-semibold text-sm md:text-base leading-relaxed shadow-sm text-center md:text-left">
              Akan terus menghadirkan inovasi dalam pelayanan dan operasional agar setiap kunjungan ke U-Mami menjadi pengalaman yang nyaman, praktis dan berkesan.
            </div>
          </div>
        </div>

        {/* Team Block */}
        <div className="w-full bg-[#e4effb] rounded-3xl p-8 md:p-12 shadow-sm flex flex-col items-center mt-8">
          <div className="bg-[#8CB9F1] bg-opacity-30 p-2 rounded-xl mb-12 inline-block">
            <h2 className="bg-[#8CB9F1] text-white px-10 py-3 rounded-lg font-extrabold text-2xl md:text-3xl uppercase tracking-wider">
              OUR TEAM
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl">
            {/* Siti Marhamah */}
            <div className="flex flex-col gap-3 items-center">
              <div className="w-full aspect-square bg-[#d0d0d0] rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
                <img src="/siti-marhamah.jpg" alt="Siti Marhamah" className="w-full h-full object-cover" />
              </div>
              <div className="w-full text-center font-bold text-[#387bd5] text-lg">Siti Marhamah</div>
            </div>
            
            {/* Siti Nurhaliza */}
            <div className="flex flex-col gap-3 items-center">
              <div className="w-full aspect-square bg-[#d0d0d0] rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
                <img src="/siti-nurhaliza.jpg" alt="Siti Nurhaliza" className="w-full h-full object-cover" />
              </div>
              <div className="w-full text-center font-bold text-[#387bd5] text-lg">Siti Nurhaliza</div>
            </div>
            
            {/* Hanna Hanifa Maulidina */}
            <div className="flex flex-col gap-3 items-center">
              <div className="w-full aspect-square bg-[#d0d0d0] rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
                <img src="/hanna-hanifa.jpg" alt="Hanna Hanifa Maulidina" className="w-full h-full object-cover" />
              </div>
              <div className="w-full text-center font-bold text-[#387bd5] text-lg">Hanna Hanifa Maulidina</div>
            </div>
            
            {/* Wa Ode Calisyah Anastasya */}
            <div className="flex flex-col gap-3 items-center">
              <div className="w-full aspect-square bg-[#d0d0d0] rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
                <img src="/wa-ode-calisyah.jpg" alt="Wa Ode Calisyah Anastasya" className="w-full h-full object-cover" />
              </div>
              <div className="w-full text-center font-bold text-[#387bd5] text-lg">Wa Ode Calisyah Anastasya</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
