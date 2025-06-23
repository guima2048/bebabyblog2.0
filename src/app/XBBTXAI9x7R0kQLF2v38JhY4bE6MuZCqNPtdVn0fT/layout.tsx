"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { Inter } from "next/font/google"; // Removido
import { ReactNode } from "react";
import NotificacoesSino from "@/components/NotificacoesSino";
// const inter = Inter({ subsets: ["latin"] }); // Removido

function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/login", { method: "DELETE" });
    router.push("/XBBTXAI9x7R0kQLF2v38JhY4bE6MuZCqNPtdVn0fT/login");
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
    <div className={"bg-[#e9d8fd] min-h-screen flex flex-col"}> {/* A classe da fonte é herdada globalmente */}
      <div className="w-full flex justify-end items-center gap-4 p-4">
        <NotificacoesSino />
        <LogoutButton />
      </div>
      {children}
    </div>
  );
} 