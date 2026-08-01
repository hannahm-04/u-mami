import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Redirect based on role
  const role = session.user?.role;
  switch (role) {
    case "ADMIN":
      redirect("/admin");
    case "KASIR":
      redirect("/kasir");
    case "KOKI":
      redirect("/koki");
    case "PELAYAN":
      redirect("/pelayan");
    case "PEMILIK":
      redirect("/pemilik");
    default:
      redirect("/login");
  }
}
