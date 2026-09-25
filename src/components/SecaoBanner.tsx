"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section 
      id="home"
      className="relative flex flex-col items-center justify-start pt-0 pb-0 overflow-hidden bg-[#fbd668]"
    >
      {/* ================= BACKGROUND DESFOCADO (BLUR SUAVE) ================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Desktop */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image 
            src="/img/hero.jpg" 
            alt="Fundo Desfocado Banner" 
            fill
            quality={30}
            className="object-cover w-full h-full blur-md scale-105 brightness-95 opacity-80"
          />
        </div>
        
        {/* Mobile */}
        <div className="block md:hidden absolute inset-0 w-full h-full">
          <Image 
            src="/img/hero-mobile.jpg" 
            alt="Fundo Desfocado Banner Mobile" 
            fill
            quality={30}
            className="object-cover w-full h-full blur-sm scale-105 brightness-95 opacity-80"
          />
        </div>
      </div>

      {/* ================= LAYER AZUL CIANO MULTIPLY (30%) ================= */}
      <div className="absolute inset-0 w-full h-full bg-[#feffff] opacity-10 z-[5] pointer-events-none" />

      {/* ================= DEGRADÊ AZUL ESCURO ATRÁS DO MENU ================= */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/50 to-transparent z-20 pointer-events-none" />

      {/* ================= HERO PRINCIPAL (CENTRALIZADO EM 1440PX) ================= */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 flex flex-col items-center justify-start px-0">
        
        {/* Banner Desktop */}
        <div className="hidden md:flex w-full relative justify-center items-start">
          <Image 
            src="/img/hero.jpg" 
            alt="Nova Califórnia - 2 Dorms • Terraço • 1 Vaga" 
            width={1440} 
            height={810} 
            quality={100}
            className="w-full h-auto object-contain block drop-shadow-md"
            priority
          />
        </div>

        {/* Banner Mobile */}
        <div className="flex flex-col md:hidden w-full relative items-center justify-start">
          <Image 
            src="/img/hero-mobile.jpg" 
            alt="Nova Califórnia - 2 Dorms • Terraço • 1 Vaga" 
            width={1000} 
            height={986} 
            quality={100}
            className="w-full h-auto object-contain block"
            priority
          />
        </div>

      </div>
    </section>
  );
}