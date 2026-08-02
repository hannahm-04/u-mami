"use client";

import { useState } from "react";

export default function MenuContent({ menus, kategoris }: { menus: any[], kategoris: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredMenus = activeCategory 
    ? menus.filter(menu => menu.kategori_id === activeCategory)
    : menus;

  return (
    <>
      {/* Category Icons */}
      <div className="flex justify-center gap-8 md:gap-16 mb-16 px-4">
        {/* "All" Category */}
        <div 
          onClick={() => setActiveCategory(null)}
          className={`flex flex-col items-center cursor-pointer group ${activeCategory === null ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${activeCategory === null ? 'border-[#3A7AD5]' : 'border-[#8CB9F1]'} overflow-hidden mb-4 shadow-sm transition-transform bg-white p-1`}>
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
                alt="All Menus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className={`${activeCategory === null ? 'text-[#3A7AD5]' : 'text-[#8CB9F1]'} font-bold text-lg md:text-xl transition-colors`}>
            Semua
          </span>
        </div>

        {kategoris.map((kategori) => (
          <div 
            key={kategori.id_kategori} 
            onClick={() => setActiveCategory(kategori.id_kategori)}
            className={`flex flex-col items-center cursor-pointer group ${activeCategory === kategori.id_kategori ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${activeCategory === kategori.id_kategori ? 'border-[#3A7AD5]' : 'border-[#8CB9F1]'} overflow-hidden mb-4 shadow-sm transition-transform bg-white p-1`}>
              <div className="w-full h-full relative rounded-full overflow-hidden">
                <img
                  src={
                    kategori.nama_kategori.toLowerCase().includes("minum") 
                      ? "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80"
                      : kategori.nama_kategori.toLowerCase().includes("dessert")
                      ? "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80"
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
                  }
                  alt={kategori.nama_kategori}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className={`${activeCategory === kategori.id_kategori ? 'text-[#3A7AD5]' : 'text-[#8CB9F1]'} font-bold text-lg md:text-xl transition-colors`}>
              {kategori.nama_kategori}
            </span>
          </div>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredMenus.map((menu) => (
            <div key={menu.id_menu} className="flex flex-col">
              <div className="w-full aspect-square bg-gray-200 rounded-2xl mb-4 relative overflow-hidden shadow-sm">
                {menu.image_url ? (
                  <img src={menu.image_url} alt={menu.nama_menu} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#8CB9F1] flex items-center justify-center text-white font-bold text-sm text-center">
                    Image Not Found
                  </div>
                )}
                {/* Sold out badge */}
                {menu.status_stok === "HABIS" && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    SOLD OUT
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start gap-4 px-2">
                <h3 className="text-[#387bd5] font-bold text-lg flex-1">{menu.nama_menu}</h3>
                <span className="text-[#3A7AD5] font-bold whitespace-nowrap">
                  Rp {menu.harga.toLocaleString("id-ID")}
                </span>
              </div>
              <p className="text-gray-500 text-sm px-2 mt-1 line-clamp-2">
                {menu.deskripsi}
              </p>
            </div>
          ))}
          {filteredMenus.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 font-bold">
              Tidak ada menu untuk kategori ini.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
