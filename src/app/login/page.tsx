import Image from "next/image";
import logo from "../logo.svg";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-[#7fb3f5] rounded-[32px] p-8 pb-12 shadow-lg flex flex-col items-center relative">
        {/* Logo Container */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-2 mb-4 shadow-sm">
          <Image
            src={logo}
            alt="U-Mami Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-extrabold tracking-wide mb-8">
          LOGIN
        </h1>

        {/* Form */}
        <div className="w-full px-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
