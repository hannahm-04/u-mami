import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const pesanan = await db.pesanan.findMany({
      where: { status_pesanan: "SIAP_DIANTAR" },
      include: { meja: true, detail_pesanan: { include: { menu: true } } },
      orderBy: { waktu_pesan: "asc" }
    });
    return NextResponse.json({ pesanan });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}
