"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Lista de imagens do Lazer
const slidesLazer = [
  { src: "/img/LAZER/01.jpg", alt: "PISCINA ADULTO COM DECK MOLHADO", label: "PISCINA ADULTO COM DECK MOLHADO" },
  { src: "/img/LAZER/02.jpg", alt: "PISCINA ADULTO COM DECK MOLHADO", label: "PISCINA ADULTO COM DECK MOLHADO" },
  { src: "/img/LAZER/03.jpg", alt: "QUADRA ESPORTIVA", label: "QUADRA ESPORTIVA" },
  { src: "/img/LAZER/04.jpg", alt: "SALÃO DE FESTAS", label: "SALÃO DE FESTAS" },
  { src: "/img/LAZER/05.jpg", alt: "ESPAÇO GRILL SOB PÉRGOLAS (CHURRASQUEIRA E FORNO À LENHA)", label: "ESPAÇO GRILL SOB PÉRGOLAS (CHURRASQUEIRA E FORNO À LENHA)" },
  { src: "/img/LAZER/06.jpg", alt: "FITNESS", label: "FITNESS" },
  { src: "/img/LAZER/07.jpg", alt: "SALÃO DE JOGOS", label: "SALÃO DE JOGOS" },
  { src: "/img/LAZER/08.jpg", alt: "Fitness", label: "FITNESS" },
  { src: "/img/LAZER/09.jpg", alt: "COWORKING", label: "COWORKING" },
  { src: "/img/LAZER/10.jpg", alt: "PLAYGROUND", label: "PLAYGROUND" },
  { src: "/img/LAZER/11.jpg", alt: "BRINQUEDOTECA", label: "BRINQUEDOTECA" },
  { src: "/img/LAZER/12.jpg", alt: "ESPAÇO PET", label: "ESPAÇO PET" },
  { src: "/img/LAZER/13.jpg", alt: "BICICLETÁRIO", label: "BICICLETÁRIO" },
  { src: "/img/LAZER/14.jpg", alt: "GARAGEM / SUBSOLO", label: "GARAGEM / SUBSOLO" },
];

export default function SecaoLazer() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLazer.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesLazer.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesLazer.length) % slidesLazer.length);
  };

  return (
    <section id="lazer" className="relative w-full py-10 sm:py-16 md:py-24 overflow-hidden bg-white">
      
      {/* Fundo de Bolinhas */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none bg-no-repeat bg-cover sm:bg-[size:280px_auto] md:bg-cover bg-left-top z-0 opacity-30 sm:opacity-100"
        style={{ backgroundImage: "url('/img/fundo7.jpg')" }}
      />

      {/* Contêiner Geral - Ajustado para max-w-[1440px] e px-6 md:px-12 alinhado com o site */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Título da Seção */}
        <h2 
          className="text-[#9f59d1] font-medium text-center text-base sm:text-xl md:text-3xl lg:text-4xl uppercase tracking-wider mb-6 sm:mb-10 max-w-4xl mx-auto px-2 sm:px-4 drop-shadow-sm"
          style={{ fontFamily: "geometrica-sans-bold, sans-serif" }}
        >
          DESFRUTE DE UM VERDADEIRO CLUBE COM INÚMERAS OPÇÕES DE LAZER.
        </h2>

        {/* Carrossel Blocado expandido para preencher até 1440px no desktop */}
        <div className="relative w-full max-w-[1440px] mx-auto h-[280px] xs:h-[340px] sm:h-[480px] md:h-[600px] lg:h-[700px] xl:h-[760px] overflow-hidden bg-gray-100 group shadow-sm">
          
          {slidesLazer.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                quality={100}
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Seta Esquerda */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 bg-[#0052a5]/80 hover:bg-[#0052a5] text-white p-2 sm:p-3.5 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
            aria-label="Imagem anterior"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Seta Direita */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 bg-[#0052a5]/80 hover:bg-[#0052a5] text-white p-2 sm:p-3.5 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
            aria-label="Próxima imagem"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores de Bolinha na Base da Imagem */}
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-1 sm:gap-2 px-2">
            {slidesLazer.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all cursor-pointer ${
                  currentSlide === index
                    ? "bg-white w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 scale-110"
                    : "bg-white/50 hover:bg-white/80 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5"
                }`}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Legenda no Canto Inferior Direito do Bloco */}
        <div className="w-full max-w-[1440px] mx-auto flex justify-end pt-3 px-1">
          <span className="text-[#333333] font-extrabold text-[11px] sm:text-sm uppercase tracking-wider text-right">
            {slidesLazer[currentSlide].label}
          </span>
        </div>

      </div>
    </section>
  );
}