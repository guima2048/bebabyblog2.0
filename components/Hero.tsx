import { useEffect, useState } from 'react';

export default function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white py-24 sm:py-32">
      {/* Opcional: efeito visual discreto no fundo */}
      {/* <div className="absolute inset-0 z-[-1] opacity-30 blur-2xl" style={{background: 'url(/hero-bg.svg) center/cover no-repeat'}} /> */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Descubra seu valor no mundo sugar
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto">
          Conecte-se com quem valoriza o seu estilo de vida. Relacionamentos com propósito e clareza.
        </p>
        <div className="mt-10">
          <a
            href="#blog"
            className="inline-block bg-white text-zinc-900 font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300"
          >
            Comece agora
          </a>
        </div>
      </div>
    </section>
  );
}
