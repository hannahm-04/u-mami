"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPesananDiproses() {
  return await db.pesanan.findMany({
    where: { status_pesanan: "DIPROSES" },
    include: {
      meja: true,
      detail_pesanan: {
        include: { menu: true }
      }
    },
    // FIFO: yang pesan duluan, dikerjakan duluan
    orderBy: { waktu_pesan: "asc" }
  });
}

export async function tandaiSelesaiDimasak(id_pesanan: number) {
  await db.pesanan.update({
    where: { id_pesanan },
    data: { status_pesanan: "TERSAJI" }
  });

  // Revalidasi halaman koki dan pelayan
  revalidatePath("/koki/pembuatan");
  revalidatePath("/pelayan/pengantaran");
}
