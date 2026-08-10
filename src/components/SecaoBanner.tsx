"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section 
      id="home"
      className="relative flex flex-col items-center justify-start pt-0 pb-0 overflow-hidden bg-[#fbd668]"
    >
      {/* ================= BACKGROUND DESFOCADO (PREENCHIMENTO DE BORDAS ULTRAWIDE) ================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Fundo Desfocado Desktop */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image 
            src="/img/hero.jpg" 
            alt="Fundo Desfocado Banner" 
            fill
            quality={30}
            className="object-cover w-full h-full blur-2xl scale-110 brightness-95 opacity-80"
          />
        </div>
        
        {/* Fundo Desfocado Mobile */}
        <div className="block md:hidden absolute inset-0 w-full h-full">
          <Image 
            src="/img/01-mobile.jpg" 
            alt="Fundo Desfocado Banner Mobile" 
            fill
            quality={30}
            className="object-cover w-full h-full blur-xl scale-110 brightness-95 opacity-80"
          />
        </div>
      </div>

      {/* Box do Empreendimento */}
      <div className="absolute top-24 sm:top-28 md:top-20 lg:top-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col items-end md:items-center z-20 pointer-events-none">
        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-extrabold text-[#a96190] uppercase tracking-wider sm:tracking-widest shadow-md border border-white/60 inline-block pointer-events-auto">
          Jardim Califórnia • Barueri
        </span>
      </div>

      {/* Imagem do Hero Principal (Sharp) */}
      <div className="w-full relative z-10 flex flex-col items-center justify-start px-0">
        {/* Banner Desktop */}
        <div className="hidden md:flex w-full max-w-[1920px] justify-center items-start">
          <Image 
            src="/img/hero.jpg" 
            alt="Nova Califórnia - 2 Dorms • Terraço • 1 Vaga" 
            width={1920} 
            height={1080} 
            quality={100}
            className="w-full h-auto object-contain block drop-shadow-sm"
            priority
          />
        </div>

        {/* Banner Mobile */}
        <div className="flex flex-col md:hidden w-full items-center justify-start">
          <Image 
            src="/img/01-mobile.jpg" 
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