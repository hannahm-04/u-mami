"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Home } from "lucide-react";
import { signOut } from "next-auth/react";
import logo from "../app/logo.svg";

const navItems = [
  { label: "Status Meja", path: "/pelayan/meja" },
  { label: "Daftar Antrean", path: "/pelayan/antrean" },
  { label: "Pengantaran Pesanan", path: "/pelayan/pengantaran" },
];

export default function PelayanSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#7fb3f5] h-screen flex flex-col items-center py-8 shadow-md relative z-10 flex-shrink-0">
      {/* Logo */}
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-2 mb-4 shadow-sm relative overflow-hidden">
        <Image
          src={logo}
          alt="U-Mami Logo"
          fill
          className="object-contain p-2"
          priority
        />
      </div>
      <h2 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-center px-4">
        WAITER PORTAL
      </h2>

      {/* Nav Links */}
      <nav className="w-full flex-1 flex flex-col">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`w-full py-4 text-center font-bold text-white transition-colors duration-200 ${
                isActive ? "bg-[#387bd5]" : "hover:bg-[#6a9eec]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout & Home */}
      <div className="mt-auto flex flex-col items-start gap-4 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold hover:opacity-80 transition px-8"
        >
          <Home size={24} />
          <span className="text-lg">BERANDA</span>
        </Link>
        <button
          onClick={async () => { await signOut({ redirect: false }); window.location.href = "/"; }}
          className="flex items-center gap-2 text-white font-bold hover:opacity-80 transition px-8"
        >
          <LogOut size={24} />
          <span className="text-lg">LOGOUT</span>
        </button>
      </div>
    </div>
  );
}
