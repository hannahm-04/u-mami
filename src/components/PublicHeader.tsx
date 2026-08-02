"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../app/logo.svg";
import { useSession } from "next-auth/react";

export default function PublicHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-[#8CB9F1] w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
            <Image src={logo} alt="U-Mami Logo" width={48} height={48} className="object-contain" priority />
          </div>
          <span className="text-white font-extrabold text-2xl tracking-widest">
            U-MAMI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded text-sm font-bold transition-colors ${
              pathname === "/" ? "bg-[#3A7AD5] text-white" : "text-white hover:bg-[#6FA6EB]"
            }`}
          >
            HOME
          </Link>
          <Link
            href="/menu"
            className={`px-4 py-1.5 rounded text-sm font-bold transition-colors ${
              pathname === "/menu" ? "bg-[#3A7AD5] text-white" : "text-white hover:bg-[#6FA6EB]"
            }`}
          >
            MENU
          </Link>
          <Link
            href="/about"
            className={`px-4 py-1.5 rounded text-sm font-bold transition-colors ${
              pathname === "/about" ? "bg-[#3A7AD5] text-white" : "text-white hover:bg-[#6FA6EB]"
            }`}
          >
            ABOUT US
          </Link>
        </nav>

        {/* Login Button */}
        <div>
          {session ? (
            <Link
              href={
                session.user.role === "ADMIN" ? "/admin" :
                session.user.role === "KASIR" ? "/kasir" :
                session.user.role === "KOKI" ? "/koki" :
                session.user.role === "PELAYAN" ? "/pelayan" :
                "/pemilik"
              }
              className="bg-white text-[#3A7AD5] px-6 py-2 rounded font-bold hover:bg-gray-50 transition shadow-sm text-sm"
            >
              DASHBOARD
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-white text-[#3A7AD5] px-6 py-2 rounded font-bold hover:bg-gray-50 transition shadow-sm text-sm"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
