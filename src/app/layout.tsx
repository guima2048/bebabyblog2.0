import "./globals.css";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { siteSEO } from '@/config/seo';
import FooterRedes from "@/components/FooterRedes";
import MenuHamburguer from "@/components/MenuHamburguer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400","700"] });

export const metadata: Metadata = {
  title: "Blog para Sugar Babies e Sugar Daddies | Bebaby",
  description: "Empoderamento, estilo e liberdade no universo sugar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
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
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={inter.className + " bg-[#e9d8fd] min-h-screen flex flex-col"}>
        <header className="sticky top-0 z-50 bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MenuHamburguer />
            <span className={oswald.className + " font-bold text-lg text-[#6b21a8]"}>Bebaby</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://bebaby.app" className="bg-[#210d41] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#15082a] transition-colors">Cadastre-se</a>
            <a href="https://bebaby.app" className="text-sm underline hover:text-[#210d41] transition-colors">Entrar</a>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-100 text-sm p-6 mt-auto">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <a href="/sobre" className="hover:text-violet-600 transition-colors">Sobre nós</a>
              <a href="/privacidade" className="hover:text-violet-600 transition-colors">Políticas de Privacidade</a>
              <a href="/termos" className="hover:text-violet-600 transition-colors">Termos de Uso</a>
              <a href="/conduta" className="hover:text-violet-600 transition-colors">Código de Conduta</a>
              <a href="/faq" className="hover:text-violet-600 transition-colors">FAQ Bebaby</a>
              <a href="/contato" className="hover:text-violet-600 transition-colors">Suporte e Contato</a>
            </div>
            <FooterRedes />
          </div>
        </footer>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
