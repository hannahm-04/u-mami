import Link from "next/link";
import Image from "next/image";
import { getMenuTerlarisPublik } from "@/actions/public";

export default async function LandingPage() {
  const topMenus = await getMenuTerlarisPublik();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1 bg-[#8CB9F1] rounded-[24px] p-8 md:p-12 text-white shadow-md relative overflow-hidden h-[300px] md:h-[400px] flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Selamat Datang di U-MAMI🐰✨
          </h1>
          <p className="text-sm md:text-base font-medium mb-8 max-w-md opacity-90 leading-relaxed">
            Nikmati kelezatan rasa umami sejati di setiap gigitan. Dibuat dengan bahan segar, resep andalan, dan sentuhan kehangatan yang bikin kamu selalu ingin kembali!
          </p>
          <div>
            <Link
              href="/menu"
              className="inline-block border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-[#8CB9F1] transition-colors"
            >
              LIHAT MENU
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full h-[300px] md:h-[400px] relative rounded-[24px] overflow-hidden shadow-md">
          {/* Using standard img for external URLs to avoid next.config.js issues */}
          <img
            src="/hero-food.jpg"
            alt="Delicious Food"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="w-full bg-[#c5e0fc] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#387bd5] mb-12 uppercase tracking-wide">
            OUR BEST SELLER THIS MONTH
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {topMenus.map((menu) => (
              <div key={menu.id_menu} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-[#8CB9F1] rounded-xl p-4 shadow-sm mb-4 relative overflow-hidden flex items-center justify-center">
                  {menu.image_url ? (
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                      <img src={menu.image_url} alt={menu.nama_menu} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#6FA6EB] rounded-lg flex items-center justify-center text-white font-bold text-sm text-center">
                      Image Not Found
                    </div>
                  )}
                </div>
                <h3 className="text-[#387bd5] font-bold text-xl">{menu.nama_menu}</h3>
              </div>
            ))}

            {/* Fill empty spots if less than 3 */}
            {Array.from({ length: Math.max(0, 3 - topMenus.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-[#8CB9F1] rounded-xl p-4 shadow-sm mb-4 relative flex items-center justify-center">
                  <div className="w-full h-full bg-[#6FA6EB] rounded-lg flex items-center justify-center text-white font-bold text-sm text-center">
                    Image Not Found
                  </div>
                </div>
                <h3 className="text-[#387bd5] font-bold text-xl">Coming Soon</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="w-full h-[400px] md:h-[600px] relative">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}
