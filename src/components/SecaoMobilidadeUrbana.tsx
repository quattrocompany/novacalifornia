"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideItem {
  id: string;
  src: string;
  alt: string;
  titulo: string;
}

const infraImages: SlideItem[] = [
  { id: "infra-1", src: "/img/LOCALIZACAO/01.jpg", alt: "Parque Municipal Dom José", titulo: "PARQUE MUNICIPAL DOM JOSÉ" },
  { id: "infra-2", src: "/img/LOCALIZACAO/02.jpg", alt: "Arena Barueri", titulo: "ARENA BARUERI" },
  { id: "infra-3", src: "/img/LOCALIZACAO/03.jpg", alt: "Assaí Barueri", titulo: "ASSAÍ BARUERI" },
  { id: "infra-4", src: "/img/LOCALIZACAO/04.jpg", alt: "Parque Shopping Barueri", titulo: "PARQUE SHOPPING BARUERI" },
  { id: "infra-5", src: "/img/LOCALIZACAO/05.jpg", alt: "Shopping Tamboré", titulo: "SHOPPING TAMBORÉ" },
  { id: "infra-6", src: "/img/LOCALIZACAO/06.jpg", alt: "Rodovia Castello Branco", titulo: "RODOVIA CASTELLO BRANCO" },
];

export default function SecaoMobilidadeUrbana() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 2 >= infraImages.length ? 0 : prev + 2));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleOpenWhatsappModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openWhatsAppModal"));
    }
  };

  return (
    <section id="localizacao" className="relative w-full overflow-hidden bg-white">
      {/* Fundo decorativo */}
      <div 
        className="absolute top-0 left-0 w-full h-[80%] md:h-[85%] bg-cover bg-center bg-no-repeat z-0 bg-[#a96190]" 
        style={{ backgroundImage: "url('/img/fundo1.jpg')" }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-12 pt-16 pb-12">
        
        {/* Título */}
        <div className="text-center mb-10">
          <h2 className="text-[#f9d150] text-xl md:text-3xl lg:text-4xl font-bold uppercase drop-shadow-md tracking-wide">
            UMA REGIÃO COMPLETA, SERVIDA DE AMPLA E<br className="hidden md:block" />
            <span className="text-white"> DIVERSIFICADA INFRAESTRUTURA DE COMÉRCIO E SERVIÇOS.</span>
          </h2>
        </div>

        {/* Carrossel da Região */}
        <div className="w-full max-w-[1100px] mx-auto overflow-hidden mb-16">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(infraImages.length / 2) }).map((_, groupIndex) => (
              <div key={groupIndex} className="min-w-full flex gap-4 md:gap-6 shrink-0">
                
                {/* Item Esquerda */}
                {infraImages[groupIndex * 2] && (
                  <div className="w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-black/20 flex flex-col justify-end">
                    <Image
                      src={infraImages[groupIndex * 2].src}
                      alt={infraImages[groupIndex * 2].alt}
                      fill
                      className="object-cover"
                    />
                    <div className="relative z-10 bg-black/60 py-2 px-3 text-center">
                      <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                        {infraImages[groupIndex * 2].titulo}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Item Direita */}
                {infraImages[groupIndex * 2 + 1] ? (
                  <div className="w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-black/20 flex flex-col justify-end">
                    <Image
                      src={infraImages[groupIndex * 2 + 1].src}
                      alt={infraImages[groupIndex * 2 + 1].alt}
                      fill
                      className="object-cover"
                    />
                    <div className="relative z-10 bg-black/60 py-2 px-3 text-center">
                      <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                        {infraImages[groupIndex * 2 + 1].titulo}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-1/2 relative bg-transparent"></div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Visite o Decorado e Endereço */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          <div className="text-center md:text-right">
            <h3 className="text-[#f9d150] text-4xl md:text-5xl font-black uppercase leading-none drop-shadow-md">
              VISITE O<br />DECORADO
            </h3>
          </div>
          <div className="text-white text-center md:text-left drop-shadow-md">
            <p className="text-sm md:text-base uppercase tracking-widest mb-1 font-bold">
              PLANTÃO DE VENDAS:
            </p>
            <p className="text-xl md:text-2xl font-bold uppercase mb-1">
              ESTR. DR. CÍCERO BORGES DE MORAES, 1.440
            </p>
            <p className="text-sm md:text-base uppercase tracking-widest">
              JD. REGINA ALICE / BARUERI - SP
            </p>
          </div>
        </div>

        {/* Mapa Container */}
        <div className="relative w-full max-w-[1100px] mx-auto h-[300px] md:h-[450px] shadow-2xl rounded-2xl border-4 border-white overflow-hidden bg-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.835662237649!2d-46.893469524706596!3d-23.502428059429644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf0392d671abd1%3A0xd589bbc394795e89!2sEstr.%20Dr.%20C%C3%ADcero%20Borges%20de%20Morais%2C%201440%20-%20Jardim%20Regina%20Alice%2C%20Barueri%20-%20SP%2C%2006407-000!5e0!3m2!1spt-BR!2sbr!4v1768837887648!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Empreendimento Nova Califórnia"
          />
          
          {/* Botões Sobrepostos no Mapa */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-[90%] sm:w-auto">
            <a 
              href="https://ul.waze.com/ul?place=ChIJ0atx1pIDz5QRiV55lMO7idU&ll=-23.50243300%2C-46.89089460&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0099FF] hover:bg-[#0088e0] text-white text-sm font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 w-full sm:w-auto"
            >
              <Image src="/img/ico-waze.gif" alt="Waze" width={20} height={24} />
              Veja pelo Waze
            </a>
            <a 
              href="https://www.google.com/maps?ll=-23.502433,-46.890895&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&q=Estr.+Dr.+C%C3%ADcero+Borges+de+Morais,+1440+-+Jardim+Regina+Alice+Barueri+-+SP+06407-000" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold py-2.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg border border-gray-200 transition-transform hover:scale-105 w-full sm:w-auto"
            >
              <Image src="/img/ico-mapa.gif" alt="Mapa" width={20} height={24} />
              Ver mapa ampliado
            </a>
          </div>
        </div>

        {/* Botão de WhatsApp */}
        <div className="mt-12 text-center flex items-center justify-center gap-3">
          <button 
            onClick={handleOpenWhatsappModal}
            className="flex items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer focus:outline-none"
          >
            <Image src="/img/wha.png" alt="WhatsApp" width={50} height={50} className="w-10 h-10 md:w-14 md:h-14 object-contain" />
            <span className="text-[#a96190] text-4xl md:text-6xl font-black tracking-tight hover:underline">
              11 97120.0175
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}