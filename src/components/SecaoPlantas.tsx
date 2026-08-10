"use client";

import { useState } from "react";
import Image from "next/image";

// Lista de plantas de fácil personalização (Desktop e Mobile)
const slidesPlantas = [
  {
    desktop: "/img/comprimido/PLANTAS/01.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/01.webp",
    alt: "Planta Tipo 01 - 46m²",
  },
  {
    desktop: "/img/comprimido/PLANTAS/02.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/02.webp",
    alt: "Planta Tipo 02 - 46m²",
  },
  {
    desktop: "/img/comprimido/PLANTAS/03.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/03.webp",
    alt: "Planta Tipo 03 - 46m²",
  },
  {
    desktop: "/img/comprimido/PLANTAS/04.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/04.webp",
    alt: "Planta Tipo 04 - 46m²",
  },
  {
    desktop: "/img/comprimido/PLANTAS/05.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/05.webp",
    alt: "Planta Tipo 05 - 46m²",
  },
  {
    desktop: "/img/comprimido/PLANTAS/06.webp",
    mobile: "/img/comprimido/PLANTAS/mobile/06.webp",
    alt: "Planta Tipo 06 - 46m²",
  },
];

export default function SecaoPlantas() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesPlantas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesPlantas.length) % slidesPlantas.length);
  };

  return (
    <section
      id="plantas"
      className="relative w-full pt-12 sm:pt-16 pb-8 md:pb-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/img/comprimido/fundo1.webp')" }}
    >
      {/* Contêiner Geral Alinhado a 1440px */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Título da Seção */}
        <h2
          className="text-[#0052a5] font-medium text-center text-lg sm:text-xl md:text-3xl lg:text-4xl uppercase tracking-wider mb-8 sm:mb-12 max-w-4xl mx-auto drop-shadow-sm"
          style={{ fontFamily: "geometrica-sans-bold, sans-serif" }}
        >
          PLANTAS BEM PLANEJADAS COM ESPAÇOS TOTALMENTE APROVEITÁVEIS.
        </h2>

        {/* Área Central do Carrossel (Expandido para 1440px) */}
        <div className="relative flex items-center justify-center w-full max-w-[1440px] mx-auto min-h-[360px] sm:min-h-[520px] lg:min-h-[640px]">
          
          {/* Seta Esquerda */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 lg:left-0 top-1/2 -translate-y-1/2 z-30 bg-[#0052a5]/80 hover:bg-[#0052a5] text-white p-2.5 sm:p-3.5 rounded-full transition-all hover:scale-105 shadow-md cursor-pointer"
            aria-label="Planta anterior"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Imagem da Planta Ampliada até 1280px / 1440px */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="relative w-full max-w-[1280px] h-[320px] sm:h-[500px] lg:h-[620px] xl:h-[700px] flex items-center justify-center cursor-pointer group px-8 sm:px-12"
            title="Clique para ampliar a planta"
          >
            {slidesPlantas.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Desktop */}
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  quality={100}
                  className="hidden md:block object-contain w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                  priority={index === 0}
                />
                {/* Mobile */}
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  fill
                  quality={100}
                  className="block md:hidden object-contain w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Dica visual de clique */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl flex items-center justify-center pointer-events-none z-20">
              <span className="opacity-0 group-hover:opacity-100 bg-[#0052a5] text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-xl transition-all transform scale-95 group-hover:scale-100 uppercase tracking-wider flex items-center gap-2">
                🔍 Clique para ampliar
              </span>
            </div>
          </div>

          {/* Seta Direita */}
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 lg:right-0 top-1/2 -translate-y-1/2 z-30 bg-[#0052a5]/80 hover:bg-[#0052a5] text-white p-2.5 sm:p-3.5 rounded-full transition-all hover:scale-105 shadow-md cursor-pointer"
            aria-label="Próxima planta"
          >
            <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* Indicadores de Bolinha */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 mb-6 relative z-20">
          {slidesPlantas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all cursor-pointer ${
                currentSlide === index
                  ? "bg-[#0052a5] w-3.5 h-3.5 scale-110 shadow-sm"
                  : "bg-gray-400/60 hover:bg-gray-600 w-2.5 h-2.5"
              }`}
              aria-label={`Ver planta ${index + 1}`}
            />
          ))}
        </div>

        {/* Texto Legal de Rodapé (Full Width) */}
        <p className="text-[11px] sm:text-[12px] md:text-[11px] text-gray-800 text-justify md:text-center leading-relaxed max-w-5xl mx-auto pt-2 sm:pt-4 relative z-20 font-medium w-full px-1 sm:px-0">
          Planta ilustrada com sugestão de decoração. Móveis, utensílios, revestimentos e objetos de decoração são meramente decorativos e não integram o contrato de compra e venda, portanto não serão entregues. Acabamentos serão entregues conforme o memorial descritivo. A planta está aprovação como 1 Dormitório + escritório. Eventuais mudanças de layout são por conta do comprador.
        </p>

        {/* ILUSTRAÇÃO DA FAMÍLIA NO MOBILE */}
        <div className="md:hidden relative z-20 w-full flex justify-center items-end mt-6">
          <div className="w-[280px] sm:w-[320px] mx-auto leading-none">
            <Image
              src="/img/comprimido/pef-mac.webp"
              alt="Família Nova Califórnia"
              width={400}
              height={400}
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
        </div>

      </div>

      {/* ILUSTRAÇÃO DA FAMÍLIA NO DESKTOP */}
      <div className="hidden md:flex absolute left-0 bottom-0 z-20 items-end justify-start pointer-events-none">
        <div className="relative z-10 w-[280px] lg:w-[340px] mb-0 ml-0 leading-none">
          <Image
            src="/img/comprimido/pef-mac.webp"
            alt="Família Nova Califórnia"
            width={400}
            height={400}
            className="w-full h-auto object-contain block mb-0 ml-0"
          />
        </div>
      </div>

      {/* MODAL DA PLANTA AMPLIADA */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-6 text-white text-4xl sm:text-5xl font-light hover:text-[#fbd668] transition-colors focus:outline-none z-50 cursor-pointer"
            aria-label="Fechar"
          >
            &times;
          </button>

          <div 
            className="relative w-full max-w-[1600px] max-h-[90vh] h-full flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={slidesPlantas[currentSlide].desktop}
              alt={slidesPlantas[currentSlide].alt}
              width={1600}
              height={1000}
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
}