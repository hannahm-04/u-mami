import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/lib/db";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "PEMILIK") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "harian"; // harian, bulanan, tahunan

  try {
    // Determine date range based on filter
    const now = new Date();
    let startDate = new Date();
    
    if (filter === "harian") {
      // Last 7 days for harian
      startDate.setDate(now.getDate() - 7);
    } else if (filter === "bulanan") {
      // Last 12 months
      startDate.setMonth(now.getMonth() - 11);
      startDate.setDate(1);
    } else if (filter === "tahunan") {
      // Last 5 years
      startDate.setFullYear(now.getFullYear() - 4);
      startDate.setMonth(0);
      startDate.setDate(1);
    }

    // Fetch payments
    const payments = await db.pembayaran.findMany({
      where: {
        waktu_bayar: {
          gte: startDate,
          lte: now,
        },
      },
      select: {
        nominal: true,
        waktu_bayar: true,
      },
      orderBy: {
        waktu_bayar: "asc",
      },
    });

    // Aggregate data
    const aggregated: Record<string, number> = {};

    payments.forEach((payment) => {
      let key = "";
      const d = new Date(payment.waktu_bayar);
      if (filter === "harian") {
        // e.g., "Aug 12"
        key = d.toLocaleDateString("id-ID", { month: "short", day: "numeric" });
      } else if (filter === "bulanan") {
        // e.g., "Aug 2026"
        key = d.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
      } else if (filter === "tahunan") {
        // e.g., "2026"
        key = d.getFullYear().toString();
      }

      if (!aggregated[key]) {
        aggregated[key] = 0;
      }
      aggregated[key] += payment.nominal;
    });

    const chartData = Object.entries(aggregated).map(([name, total]) => ({
      name,
      total,
    }));

    return NextResponse.json(chartData);
  } catch (error: any) {
    console.error("Error fetching laporan:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
