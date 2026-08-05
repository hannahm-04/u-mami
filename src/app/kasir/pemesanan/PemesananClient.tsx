"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buatPesanan, CartItem } from "@/actions/kasir";

type Menu = {
  id_menu: number;
  nama_menu: string;
  harga: number;
  image_url: string | null;
  stok: number;
  kategori: {
    id_kategori: number;
    nama_kategori: string;
  };
};

type Meja = {
  id_meja: number;
  no_meja: string;
};

export default function PemesananClient({ menus, mejaList }: { menus: Menu[], mejaList: Meja[] }) {
  const router = useRouter();
  const [selectedKategori, setSelectedKategori] = useState<string>("ALL");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeja, setSelectedMeja] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Unik kategori
  const categories = Array.from(new Set(menus.map(m => m.kategori.nama_kategori)));

  const filteredMenus = selectedKategori === "ALL" 
    ? menus 
    : menus.filter(m => m.kategori.nama_kategori === selectedKategori);

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleAdd = (menu: Menu) => {
    if (menu.stok <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id_menu === menu.id_menu);
      if (existing) {
        if (existing.qty >= menu.stok) return prev; // Limit to available stock
        return prev.map(item => 
          item.id_menu === menu.id_menu ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id_menu: menu.id_menu, harga: menu.harga, qty: 1 }];
    });
  };

  const handleRemove = (menu: Menu) => {
    setCart(prev => {
      const existing = prev.find(item => item.id_menu === menu.id_menu);
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter(item => item.id_menu !== menu.id_menu);
      }
      return prev.map(item => 
        item.id_menu === menu.id_menu ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const handleCheckout = async () => {
    if (!selectedMeja) return alert("Pilih meja terlebih dahulu!");
    setIsLoading(true);
    try {
      const id_pesanan = await buatPesanan(Number(selectedMeja), cart);
      router.push(`/kasir/pembayaran?id=${id_pesanan}`);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Kategori */}
      <div className="flex justify-center gap-6 mb-8">
        <button 
          onClick={() => setSelectedKategori("ALL")}
          className={`flex flex-col items-center gap-2 font-bold ${selectedKategori === "ALL" ? "text-[#387bd5]" : "text-gray-400"}`}
        >
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 ${selectedKategori === "ALL" ? "border-[#387bd5]" : "border-gray-200"} overflow-hidden shadow-sm transition-transform bg-white p-1`}>
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
                alt="Semua"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          Semua
        </button>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedKategori(cat)}
            className={`flex flex-col items-center gap-2 font-bold ${selectedKategori === cat ? "text-[#387bd5]" : "text-gray-400"}`}
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 ${selectedKategori === cat ? "border-[#387bd5]" : "border-gray-200"} overflow-hidden shadow-sm transition-transform bg-white p-1`}>
              <div className="w-full h-full relative rounded-full overflow-hidden">
                <img
                  src={
                    cat.toLowerCase().includes("minum") 
                      ? "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80"
                      : (cat.toLowerCase().includes("dessert") || cat.toLowerCase().includes("penutup"))
                      ? "/hidangan-penutup.jpg"
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
                  }
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMenus.map(menu => {
          const qtyInCart = cart.find(c => c.id_menu === menu.id_menu)?.qty || 0;
          const isHabis = menu.stok === 0;

          return (
            <div key={menu.id_menu} className={`relative flex flex-col items-center ${isHabis ? 'opacity-50 grayscale' : ''}`}>
              <div className="w-full aspect-square relative rounded-2xl overflow-hidden mb-3 shadow-md bg-gray-100">
                {menu.image_url ? (
                  <img src={menu.image_url} alt={menu.nama_menu} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-300">No Image</div>
                )}
                
                <div className="absolute bottom-2 right-2 flex gap-2">
                  {qtyInCart > 0 && (
                    <button 
                      onClick={() => handleRemove(menu)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 font-bold text-2xl shadow-lg hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                  )}
                  <button 
                    onClick={() => handleAdd(menu)}
                    disabled={isHabis || qtyInCart >= menu.stok}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold text-2xl shadow-lg hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                {qtyInCart > 0 && (
                  <span className="absolute top-2 right-2 bg-[#387bd5] text-white font-bold px-2 py-1 rounded-lg text-sm">
                    {qtyInCart}
                  </span>
                )}
              </div>
              <p className="text-[#387bd5] font-bold text-sm text-center w-full truncate">{menu.nama_menu}</p>
              <p className="text-[#387bd5] font-bold text-sm text-center w-full">Rp {menu.harga.toLocaleString("id-ID")}</p>
              <span className={`text-xs font-bold ${isHabis ? "text-red-500" : "text-green-600"}`}>
                Stok: {menu.stok}
              </span>
            </div>
          )
        })}
      </div>

      {/* Bottom Floating Bar */}
      {totalQty > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#387bd5] rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <span className="text-white font-bold text-xl ml-4">Jumlah Pesanan : {totalQty}</span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#387bd5] font-bold text-lg px-8 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Bayar
          </button>
        </div>
      )}

      {/* Modal Pilih Meja */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl w-96 max-w-full">
            <h3 className="text-2xl font-bold text-[#387bd5] mb-4">Pilih Meja Pelanggan</h3>
            <select 
              value={selectedMeja} 
              onChange={e => setSelectedMeja(e.target.value)}
              className="w-full p-3 border-2 border-blue-400 bg-white rounded-xl mb-6 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Meja --</option>
              {mejaList.map(m => (
                <option key={m.id_meja} value={m.id_meja}>Meja {m.no_meja}</option>
              ))}
            </select>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Batal
              </button>
              <button 
                onClick={handleCheckout}
                disabled={!selectedMeja || isLoading}
                className="flex-1 py-3 rounded-xl font-bold bg-[#387bd5] text-white hover:bg-[#2b64b1] disabled:opacity-50"
              >
                {isLoading ? "Memproses..." : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
