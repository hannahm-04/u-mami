"use client";

import { User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PemilikHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-24 bg-[#c5e0fc] flex items-center justify-between px-8 shadow-sm relative z-0">
      {/* Spacer to push title to center roughly, or just absolute centering */}
      <div className="flex-1"></div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[#387bd5] text-2xl md:text-3xl font-extrabold tracking-wide">
          Semangat bertugas hari ini!🐰✨
        </h1>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#fff] rounded-full flex items-center justify-center border-4 border-[#387bd5] overflow-hidden shadow-sm">
            <User size={32} className="text-[#387bd5]" />
          </div>
          <div className="bg-white px-4 py-0.5 mt-1 rounded-full text-sm font-bold text-[#387bd5] shadow-sm">
            Pemilik
          </div>
        </div>
      </div>
    </header>
  );
}
