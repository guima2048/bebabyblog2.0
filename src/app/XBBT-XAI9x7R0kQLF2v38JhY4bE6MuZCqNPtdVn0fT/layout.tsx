"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/login", { method: "DELETE" });
    router.push("/XBBT/login");
    setLoading(false);
  };
  return (
    <button onClick={handleLogout} className="ml-4 bg-red-600 text-white px-4 py-2 rounded" disabled={loading}>
      {loading ? "Saindo..." : "Logout"}
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <body className={inter.className + " bg-[#e9d8fd]"}>
      <div className="w-full flex justify-end p-4">
        <LogoutButton />
      </div>
      {children}
    </body>
  );
}