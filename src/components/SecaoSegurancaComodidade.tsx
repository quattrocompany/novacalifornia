"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
    { src: "/img/DET/fachada-G.jpg", alt: "Fachada Nova Califórnia", label: "FACHADA" },
  { src: "/img/DET/1G.jpg", alt: "Portaria Central", label: "PORTARIA CENTRAL" },
  { src: "/img/DET/3G.jpg", alt: "Fachada Lateral / Vista", label: "FACHADA LATERAL / VISTA" },
  { src: "/img/DET/2G.jpg", alt: "Hall de Entrada", label: "HALL DE ENTRADA" },
];

const itensSeguranca = [
  "Condomínio fechado",
  "Portaria central com wc",
  "Acesso de pedestres com eclusa",
  "Infraestrutura para instalação de sistema de monitoramento interno (CFTV)",
  "Portões automatizados",
  "Infraestrutura para instalação de sensores perimetrais",
  "Sensores de presença nas áreas comuns com iluminação em led",
  "Sistema de interfonia",
  "18 vagas para visitantes (sendo 1 PNE)",
];

export default function SecaoSegurancaComodidade() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carrossel Automático (Troca a cada 4 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="seguranca" className="w-full bg-white overflow-hidden">
      {/* Grid Full Width (100% da tela) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        
        {/* ================= COLUNA DA ESQUERDA (50%): INFORMAÇÕES ================= */}
        <div 
          className="relative flex justify-end bg-cover bg-center bg-no-repeat min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]"
          style={{ backgroundImage: "url('/img/fundo1.jpg')" }}
        >
          {/* Container interno limitando a largura do texto para alinhar com o restante do site (720px é metade de 1440px) */}
          <div className="w-full max-w-[720px] p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-between">
            
            {/* Topo: Título + Logo */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <h2 className="text-[#a96190] font-black text-2xl sm:text-3xl md:text-4xl uppercase leading-tight max-w-md drop-shadow-sm">
                  A IMPONÊNCIA DE UM PROJETO EXCLUSIVO.
                </h2>
                <div className="shrink-0 self-end sm:self-start">
                  {/* LOGO AUMENTADO */}
                  <Image
                    src="/img/logo350.png"
                    alt="Nova Califórnia"
                    width={200}
                    height={200}
                    className="w-32 sm:w-40 md:w-44 lg:w-48 h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Subtítulo */}
              <h3 className="text-[#a96190] font-bold text-lg sm:text-xl md:text-2xl mb-6">
                Torre única, segurança planejada:
              </h3>

              {/* Lista de Itens */}
              <ul className="flex flex-col gap-3">
                {itensSeguranca.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-800 font-semibold text-xs sm:text-sm md:text-base leading-snug">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] border-[#0052a5] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0052a5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controles do Carrossel / Navegação por bolinhas */}
            <div className="flex justify-center lg:justify-start gap-2 mt-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-[#a96190] w-8" : "bg-gray-400/60 hover:bg-[#a96190] w-3"
                  }`}
                  aria-label={`Ir para o slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= COLUNA DA DIREITA (50%): CARROSSEL ================= */}
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-auto min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gray-900 group overflow-hidden">
          {/* Slides das Imagens */}
          {slides.map((slide, index) => (
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
              
              {/* Legenda no Canto Inferior Esquerdo */}
              <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded uppercase tracking-wider">
                {slide.label}
              </div>
            </div>
          ))}

          {/* Seta Esquerda */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#a96190] text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
            aria-label="Slide anterior"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Seta Direita */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#a96190] text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
            aria-label="Próximo slide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}