import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Dashboard Utama</h2>
      <div className="p-6 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100">
        <p className="text-lg">
          Selamat bertugas, <strong>{session?.user?.name || (session?.user as any)?.username}</strong>!
        </p>
        <p className="mt-2 text-blue-600">
          Silakan pilih menu di samping untuk mengelola Data Staff, Kategori, Menu, atau Meja.
        </p>
      </div>
    </div>
  );
}
