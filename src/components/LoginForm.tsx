"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username atau password salah");
      } else {
        // Redirect to root which redirects to the proper dashboard
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-white text-sm p-2 rounded-md text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-[#2b64b1] text-sm font-bold tracking-wide px-1">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-full border-2 border-blue-400 bg-white outline-none text-gray-900 font-bold focus:ring-2 focus:ring-[#3b71ca]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[#2b64b1] text-sm font-bold tracking-wide px-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-full border-2 border-blue-400 bg-white outline-none text-gray-900 font-bold focus:ring-2 focus:ring-[#3b71ca]"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#3b71ca] hover:bg-[#3261ad] transition-colors text-white text-xl font-bold py-2.5 px-12 rounded-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </div>
    </form>
  );
}
