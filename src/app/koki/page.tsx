import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";

export default async function KokiDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Koki</h1>
      <p className="mb-4">Selamat datang, {session?.user?.nama_lengkap || session?.user?.username}!</p>
      <LogoutButton />
    </div>
  );
}
