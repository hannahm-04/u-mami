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
          
          {/* Checkered pattern overlay at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-16 opacity-30 flex">
            {/* Simple CSS checkered pattern */}
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), repeating-linear-gradient(45deg, #ffffff 25%, #8CB9F1 25%, #8CB9F1 75%, #ffffff 75%, #ffffff)',
              backgroundPosition: '0 0, 10px 10px',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          {/* Curvy border effect SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.85,30.34,121.26,56.55,182.23,71.29c60.2,14.61,121.7,11.39,182.23,6.33Z" fill="#ffffff" opacity="0.5"></path>
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#8CB9F1" opacity="0.3"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" fill="#ffffff"></path>
            </svg>
          </div>
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-full aspect-square bg-[#d0d0d0] rounded-xl flex items-center justify-center relative overflow-hidden text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                </div>
                <div className="w-full h-4 bg-[#d0d0d0] rounded"></div>
                <div className="w-3/4 h-4 bg-[#d0d0d0] rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
