"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- KATEGORI ---
export async function getKategori() {
  return await db.kategori.findMany();
}

export async function createKategori(formData: FormData) {
  const nama = formData.get("nama") as string;
  if (!nama) throw new Error("Nama kategori dibutuhkan");

  await db.kategori.create({ data: { nama_kategori: nama } });
  revalidatePath("/admin/kategori");
}

export async function deleteKategori(id: number) {
  await db.kategori.delete({ where: { id_kategori: id } });
  revalidatePath("/admin/kategori");
}

// --- MENU ---
export async function getMenu() {
  return await db.menu.findMany({ include: { kategori: true } });
}

export async function createMenu(formData: FormData) {
  const nama = formData.get("nama") as string;
  const harga = parseInt(formData.get("harga") as string);
  const deskripsi = formData.get("deskripsi") as string;
  const id_kategori = parseInt(formData.get("id_kategori") as string);
  
  await db.menu.create({
    data: { nama_menu: nama, harga, deskripsi, id_kategori },
  });
  revalidatePath("/admin/menu");
}

export async function toggleStokMenu(id_menu: number, current_status: string) {
  const newStatus = current_status === "TERSEDIA" ? "HABIS" : "TERSEDIA";
  await db.menu.update({
    where: { id_menu },
    data: { status_stok: newStatus as any },
  });
  revalidatePath("/admin/menu");
}

export async function deleteMenu(id: number) {
  await db.menu.delete({ where: { id_menu: id } });
  revalidatePath("/admin/menu");
}

// --- MEJA ---
export async function getMeja() {
  return await db.meja.findMany();
}

export async function createMeja(formData: FormData) {
  const nomor = parseInt(formData.get("nomor") as string);
  const kapasitas = parseInt(formData.get("kapasitas") as string);

  await db.meja.create({
    data: { nomor_meja: nomor, kapasitas },
  });
  revalidatePath("/admin/meja");
}

export async function deleteMeja(id: number) {
  await db.meja.delete({ where: { id_meja: id } });
  revalidatePath("/admin/meja");
}

// --- STAF (Pengguna) ---
export async function getStaf() {
  return await db.pengguna.findMany({
    where: { role: { not: "ADMIN" } },
    select: { id_user: true, username: true, nama_lengkap: true, role: true }
  });
}

export async function createStaf(formData: FormData) {
  const username = formData.get("username") as string;
  const nama_lengkap = formData.get("nama_lengkap") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as any;

  await db.pengguna.create({
    data: { username, nama_lengkap, password, role },
  });
  revalidatePath("/admin/staf");
}

export async function deleteStaf(id: string) {
  await db.pengguna.delete({ where: { id_user: id } });
  revalidatePath("/admin/staf");
}
