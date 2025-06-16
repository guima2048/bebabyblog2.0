"use client";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-[#210d41] text-white shadow-lg transition-opacity duration-300 ${visible ? 'opacity-30 hover:opacity-80' : 'opacity-0 pointer-events-none'}`}
      style={{ fontSize: 24 }}
    >
      ↑
    </button>
  );
} 