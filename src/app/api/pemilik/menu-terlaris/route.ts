import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "PEMILIK") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // We group by menu_id and sum jml_pesanan
    const grouped = await db.detail_Pesanan.groupBy({
      by: ['menu_id'],
      _sum: {
        jml_pesanan: true,
        subtotal: true,
      },
      orderBy: {
        _sum: {
          jml_pesanan: 'desc',
        },
      },
      take: 10,
    });

    // Fetch menu details for those IDs
    const menuIds = grouped.map((g) => g.menu_id);
    const menus = await db.menu.findMany({
      where: { id_menu: { in: menuIds } },
      include: {
        kategori: true,
      }
    });

    // Map the results together
    const result = grouped.map((g) => {
      const menu = menus.find((m) => m.id_menu === g.menu_id);
      return {
        id_menu: g.menu_id,
        nama_menu: menu?.nama_menu || "Unknown",
        kategori: menu?.kategori.nama_kategori || "Unknown",
        total_terjual: g._sum.jml_pesanan || 0,
        total_pendapatan: g._sum.subtotal || 0,
      };
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching menu terlaris:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
