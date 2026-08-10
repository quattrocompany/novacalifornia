"use client";
import Image from "next/image";

export default function SecaoAerea() {
  return (
    <section 
      id="aerea" 
      className="relative z-0 overflow-hidden py-8 md:py-16"
    >
      {/* Fundo Full-Width com Blur e Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/img/aerea-desktop.jpg" 
          alt="Fundo Vista Aérea" 
          fill
          quality={50}
          className="object-cover blur-2xl scale-110 opacity-80"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-0 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Metragem / MCMV Mobile (Apenas Mobile) */}
        <div className="w-full md:hidden flex justify-center gap-4 mb-6 px-4 relative z-20">
          <Image 
            src="/img/metragem.png" 
            alt="Metragem Nova Califórnia" 
            width={300} 
            height={100} 
            quality={100}
            className="w-[48%] h-auto object-contain block drop-shadow-md"
          />
          <Image 
            src="/img/mcmv2.png" 
            alt="Minha Casa Minha Vida" 
            width={300} 
            height={100} 
            quality={100}
            className="w-[45%] h-auto object-contain block drop-shadow-md"
          />
        </div>

        {/* Card da Imagem Principal */}
        <div className="w-full relative rounded-none md:rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-white">
          {/* Vista Aérea Desktop */}
          <Image 
            src="/img/aerea-desktop.jpg" 
            alt="Vista Aérea da Região do Empreendimento Nova Califórnia em Barueri" 
            width={1440} 
            height={810} 
            quality={100}
            className="hidden md:block w-full h-auto object-cover"
            priority
          />
          {/* Vista Aérea Mobile */}
          <Image 
            src="/img/aerea-mobile.jpg" 
            alt="Vista Aérea da Região Mobile" 
            width={1000} 
            height={648} 
            quality={100}
            className="block md:hidden w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}