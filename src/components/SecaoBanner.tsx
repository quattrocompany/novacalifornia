"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section 
      id="home"
      className="relative flex flex-col items-center justify-start pt-10 sm:pt-12 md:pt-16 pb-0 overflow-hidden bg-[#fbd668]"
    >
      {/* ================= BACKGROUND DESFOCADO ================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Desktop */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image 
            src="/img/hero.jpg" 
            alt="Fundo Desfocado Banner" 
            fill
            quality={30}
            className="object-cover w-full h-full blur-2xl scale-110 brightness-95 opacity-80"
          />
        </div>
        
        {/* Mobile */}
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

      {/* ================= HERO PRINCIPAL ================= */}
      <div className="w-full relative z-10 flex flex-col items-center justify-start px-0">
        
        {/* Banner Desktop */}
        <div className="hidden md:flex w-full max-w-[1920px] relative justify-center items-start">
          
          {/* Badge do Empreendimento */}
          <div className="absolute top-[8%] lg:top-[10%] left-0 right-0 w-full flex justify-center z-20 pointer-events-none px-4">
            <span className="bg-white/90 backdrop-blur-md px-[2vw] lg:px-4 py-[0.5vw] lg:py-1.5 rounded-full text-[1.1vw] lg:text-xs font-extrabold text-[#a96190] uppercase tracking-wider sm:tracking-widest shadow-md border border-white/60 inline-block pointer-events-auto transition-all">
              Jardim Califórnia • Barueri
            </span>
          </div>

          {/* MÁSCARA VERTICAL (TOPO) */}
          <div 
            className="w-full h-auto"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
            }}
          >
            {/* MÁSCARA HORIZONTAL (LATERAIS ESQUERDA E DIREITA) */}
            <div 
              className="w-full h-auto"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              }}
            >
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
          </div>
        </div>

        {/* Banner Mobile */}
        <div className="flex flex-col md:hidden w-full relative items-center justify-start">
          
          {/* Badge Mobile */}
          <div className="absolute top-[16%] left-0 right-0 w-full flex justify-center z-20 pointer-events-none px-4">
            <span className="bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[2.8vw] sm:text-xs font-extrabold text-[#a96190] uppercase tracking-wider shadow-md border border-white/60 inline-block pointer-events-auto">
              Jardim Califórnia • Barueri
            </span>
          </div>

          {/* MÁSCARA VERTICAL MOBILE */}
          <div 
            className="w-full h-auto"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
            }}
          >
            {/* MÁSCARA HORIZONTAL MOBILE */}
            <div 
              className="w-full h-auto"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              }}
            >
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
        </div>

      </div>
    </section>
  );
}