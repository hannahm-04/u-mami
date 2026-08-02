"use server";

import db from "@/lib/db";

export async function getMenuTerlarisPublik() {
  try {
    const grouped = await db.detail_Pesanan.groupBy({
      by: ['menu_id'],
      _sum: {
        jml_pesanan: true,
      },
      orderBy: {
        _sum: {
          jml_pesanan: 'desc',
        },
      },
      take: 3,
    });

    const menuIds = grouped.map((g) => g.menu_id);
    const menus = await db.menu.findMany({
      where: { id_menu: { in: menuIds } },
    });

    const result = grouped.map((g) => {
      const menu = menus.find((m) => m.id_menu === g.menu_id);
      return {
        id_menu: g.menu_id,
        nama_menu: menu?.nama_menu || "Unknown",
        image_url: menu?.image_url || null,
        total_terjual: g._sum.jml_pesanan || 0,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching public top menu:", error);
    return [];
  }
}
