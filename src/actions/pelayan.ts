"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- ANTREAN ---
export async function getAntreanAktif() {
  return await db.antrean.findMany({
    where: { status_antrean: "MENUNGGU" },
    orderBy: { waktu_kedatangan: "asc" },
  });
}

export async function tambahAntrean(formData: FormData) {
  const nama = formData.get("nama") as string;
  const jumlahKursi = parseInt(formData.get("jumlahKursi") as string);

  if (!nama || !jumlahKursi) return;

  await db.antrean.create({
    data: {
      nama_pelanggan: nama,
      jumlah_orang: jumlahKursi,
      status_antrean: "MENUNGGU",
    },
  });

  revalidatePath("/pelayan/antrean");
}

export async function panggilAntrean(id_antrean: number) {
  const antrean = await db.antrean.findUnique({ where: { id_antrean } });
  if (!antrean) return { error: "Antrean tidak ditemukan!" };

  // Cari meja kosong yang kapasitasnya cukup (paling kecil yang muat)
  const mejaKosong = await db.meja.findFirst({
    where: { 
      status_meja: "KOSONG",
      kapasitas: { gte: antrean.jumlah_orang }
    },
    orderBy: { kapasitas: "asc" }
  });

  if (!mejaKosong) {
    return { error: `Tidak ada meja kosong yang muat untuk ${antrean.jumlah_orang} orang saat ini!` };
  }

  // Tandai meja terisi
  await db.meja.update({
    where: { id_meja: mejaKosong.id_meja },
    data: { status_meja: "TERISI" }
  });

  // Update antrean
  await db.antrean.update({
    where: { id_antrean },
    data: { status_antrean: "DIPANGGIL" },
  });

  revalidatePath("/pelayan/antrean");
  revalidatePath("/pelayan/meja");
  
  return { success: true, meja: mejaKosong.no_meja };
}

// --- MEJA ---
export async function getSemuaMeja() {
  return await db.meja.findMany({
    orderBy: { no_meja: "asc" },
  });
}

export async function toggleStatusMeja(id_meja: number, currentStatus: string) {
  const newStatus = currentStatus === "KOSONG" ? "TERISI" : "KOSONG";
  
  await db.meja.update({
    where: { id_meja },
    data: { status_meja: newStatus as any },
  });

  revalidatePath("/pelayan/meja");
}

// --- PENGANTARAN PESANAN ---
export async function getPesananSiapAntar() {
  return await db.pesanan.findMany({
    where: { status_pesanan: "TERSAJI" },
    include: {
      meja: true,
      detail_pesanan: {
        include: { menu: true }
      }
    },
    orderBy: { waktu_pesan: "asc" }
  });
}

export async function konfirmasiDiantar(id_pesanan: number) {
  await db.pesanan.update({
    where: { id_pesanan },
    data: { status_pesanan: "SELESAI" }
  });

  revalidatePath("/pelayan/pengantaran");
}
