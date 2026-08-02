"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getMenuLengkap() {
  return await db.menu.findMany({
    include: { kategori: true }
  });
}

export async function getMejaTersedia() {
  return await db.meja.findMany({
    // Hanya meja yang sudah terisi (pelanggan sudah dapat meja) yang bisa memesan
    where: { status_meja: "TERISI" }
  });
}

// Data keranjang yang dikirim dari client
export type CartItem = {
  id_menu: string;
  harga: number;
  qty: number;
};

export async function buatPesanan(meja_id: number, cart: CartItem[]) {
  if (!meja_id || cart.length === 0) throw new Error("Data tidak lengkap");

  let total_harga = 0;
  cart.forEach(item => {
    total_harga += item.harga * item.qty;
  });

  // Meja sudah TERISI dari awal (berdasarkan antrean/pelayan), jadi tidak perlu di-update lagi.
  // Tapi untuk berjaga-jaga:
  await db.meja.update({
    where: { id_meja: meja_id },
    data: { status_meja: "TERISI" }
  });

  const pesanan = await db.pesanan.create({
    data: {
      meja_id,
      total_harga,
      status_pesanan: "DIPROSES", // Langsung masuk dapur
      detail_pesanan: {
        create: cart.map(item => ({
          menu_id: item.id_menu,
          jml_pesanan: item.qty,
          subtotal: item.harga * item.qty
        }))
      }
    }
  });

  // Kurangi stok menu
  for (const item of cart) {
    await db.menu.update({
      where: { id_menu: item.id_menu },
      data: { stok: { decrement: item.qty } }
    });
  }

  return pesanan.id_pesanan;
}

export async function getPesananUntukDibayar(id_pesanan: number) {
  return await db.pesanan.findUnique({
    where: { id_pesanan },
    include: {
      meja: true,
      detail_pesanan: {
        include: { menu: true }
      }
    }
  });
}

export async function prosesPembayaran(
  id_pesanan: number, 
  user_id: string, 
  metode: "CASH" | "QRIS" | "DEBIT", 
  nominal: number
) {
  await db.pembayaran.create({
    data: {
      pesanan_id: id_pesanan,
      user_id,
      metode_pembayaran: metode,
      nominal
    }
  });

  revalidatePath("/kasir/pembayaran");
  revalidatePath("/koki/pembuatan");
}

export async function getRiwayatPesanan(dateStart?: Date, dateEnd?: Date) {
  // Ambil pesanan yang sudah dibayar
  return await db.pesanan.findMany({
    where: {
      pembayaran: { isNot: null }
    },
    include: {
      meja: true,
      pembayaran: true
    },
    orderBy: { waktu_pesan: "desc" }
  });
}
