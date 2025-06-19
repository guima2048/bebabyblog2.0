"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import FooterRedes from "@/components/FooterRedes";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import NotificacoesSino from "@/components/NotificacoesSino";
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
    <div className={inter.className + " bg-[#e9d8fd] min-h-screen flex flex-col"}>
      <div className="w-full flex justify-end items-center gap-4 p-4">
        <NotificacoesSino />
        <LogoutButton />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 text-sm p-6 mt-auto">
        <div className="container mx-auto">
          {/* <FooterRedes /> Removido para evitar duplicidade */}
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}