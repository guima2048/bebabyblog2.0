import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteSEO } from '@/config/seo';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bebaby Blog",
  description: "Empoderamento, estilo e liberdade no universo sugar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        {siteSEO.googleVerification && (
          <meta name="google-site-verification" content={siteSEO.googleVerification} />
        )}
        {siteSEO.gaId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteSEO.gaId}`}
          />
        )}
        {siteSEO.gaId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteSEO.gaId}');
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className + " bg-[#e9d8fd] min-h-screen flex flex-col"}>
        <header className="sticky top-0 z-50 bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="text-2xl">≡</button>
            <span className="font-bold text-lg">Bebaby</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/join" className="bg-violet-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-violet-700 transition-colors">Cadastre-se</a>
            <a href="/login" className="text-sm underline hover:text-violet-600 transition-colors">Entrar</a>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-100 text-sm p-6 mt-auto">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <a href="/sobre" className="hover:text-violet-600 transition-colors">Sobre nós</a>
              <a href="/privacidade" className="hover:text-violet-600 transition-colors">Políticas de Privacidade</a>
              <a href="/termos" className="hover:text-violet-600 transition-colors">Termos de Uso</a>
              <a href="/conduta" className="hover:text-violet-600 transition-colors">Código de Conduta</a>
              <a href="/seguranca" className="hover:text-violet-600 transition-colors">Segurança da Plataforma</a>
              <a href="/faq" className="hover:text-violet-600 transition-colors">FAQ Bebaby</a>
              <a href="/contato" className="hover:text-violet-600 transition-colors">Suporte e Contato</a>
            </div>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-violet-600 transition-colors">📸</a>
              <a href="#" aria-label="TikTok" className="hover:text-violet-600 transition-colors">🎵</a>
              <a href="#" aria-label="X" className="hover:text-violet-600 transition-colors">✖</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
