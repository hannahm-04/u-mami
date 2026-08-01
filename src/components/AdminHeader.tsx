"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminHeader() {
  const { data: session } = useSession();
  
  return (
    <header className="h-24 bg-[#c5e0fc] flex items-center justify-between px-8 shadow-sm relative z-0">
      {/* Spacer to push title to center roughly, or just absolute centering */}
      <div className="flex-1"></div>
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[#387bd5] text-2xl md:text-3xl font-extrabold tracking-wide">
          Halo! Semangat bertugas hari ini! 🐰✨
        </h1>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#387bd5] rounded-full flex items-center justify-center border-4 border-white overflow-hidden shadow-sm">
            <User size={32} className="text-white" />
          </div>
          {session?.user && (
            <div className="bg-white px-3 py-0.5 mt-1 rounded text-xs font-bold text-[#387bd5] shadow-sm">
              {session.user.nama_lengkap || session.user.username}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
