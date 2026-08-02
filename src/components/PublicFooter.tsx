import Link from "next/link";
import Image from "next/image";
import logo from "../app/logo.svg";
// Social Icons are embedded as SVGs instead of importing from lucide-react to prevent build errors

export default function PublicFooter() {
  return (
    <footer className="bg-[#8CB9F1] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Information */}
        <div>
          <h3 className="font-extrabold text-2xl mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm font-semibold">
            <li><Link href="/about" className="hover:underline">ABOUT US</Link></li>
            <li><Link href="/privacy" className="hover:underline">PRIVACY & POLICY</Link></li>
            <li><Link href="/terms" className="hover:underline">TERM & CONDITION</Link></li>
          </ul>
        </div>

        {/* Logo Centered */}
        <div className="flex justify-center items-start">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-2 shadow-sm">
            <Image src={logo} alt="U-Mami Logo" width={96} height={96} className="object-contain" />
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-extrabold text-xl mb-4">CONTACT US</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="font-bold">📞</span> +62812345678
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold">✉️</span> csumami@gmail.com
            </li>
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h3 className="font-extrabold text-xl mb-4">VISIT US</h3>
          <div className="flex gap-4 mb-4">
            <Link href="#" className="hover:text-blue-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
            <Link href="#" className="hover:text-blue-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </Link>
            <Link href="#" className="hover:text-blue-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Link>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            <span className="font-bold">📍</span> Jl. Klepon No 10, Kota Bandung, Jawa Barat, Indonesia
          </p>
        </div>
      </div>

      <div className="border-t border-[#6FA6EB] pt-4 text-center">
        <p className="text-xs font-semibold">© 2026 U-MAMI - Kelompok Klepon</p>
      </div>
    </footer>
  );
}
