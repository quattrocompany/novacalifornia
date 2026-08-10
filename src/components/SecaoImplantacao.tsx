"use client";

import { useState } from "react";
import Image from "next/image";

const legendaColuna1 = [
  { num: "01", texto: "Acesso de veículos" },
  { num: "02", texto: "Acesso de pedestres c/ eclusa" },
  { num: "03", texto: "Vagas p/ visitantes" },
  { num: "04", texto: "Portaria central c/ WC" },
  { num: "05", texto: "Salão de festas" },
  { num: "06", texto: "Deck molhado" },
  { num: "07", texto: "Solário" },
  { num: "08", texto: "Piscina adulto" },
  { num: "09", texto: "Piscina infantil" },
  { num: "10", texto: "Espaço grill sob pérgolas (Churrasqueira e forno à lenha)" },
  { num: "11", texto: "Coworking" },
];

const legendaColuna2 = [
  { num: "12", texto: "Salão de jogos" },
  { num: "13", texto: "Brinquedoteca" },
  { num: "14", texto: "Fitness" },
  { num: "15", texto: "Espaço pet" },
  { num: "16", texto: "Quadra esportiva" },
  { num: "17", texto: "Playground" },
  { num: "18", texto: "WC's" },
  { num: "19", texto: "Jardins" },
  { num: "20", texto: "Elevadores" },
  { num: "21", texto: "Elevador (acessibilidade)" },
  { num: "22", texto: "Apto Garden" },
  { num: "•", texto: "Bicicletário (Subsolo)" },
];

export default function SecaoImplantacao() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <section id="implantacao" className="relative w-full pt-12 sm:pt-16 pb-48 sm:pb-60 md:pb-64 lg:pb-16 bg-white overflow-hidden">
      
      {/* Contêiner do Conteúdo Centralizado */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Título da Seção com Fonte geometrica-sans-bold */}
        <h2 
          className="text-[#0052a5] font-medium text-center text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wider mb-8 drop-shadow-sm max-w-4xl mx-auto"
          style={{ fontFamily: "geometrica-sans-bold, sans-serif" }}
        >
          INTERATIVIDADE, SEGURANÇA E PRIVACIDADE EM UM PROJETO ESPECIAL.
        </h2>

        {/* Mapa da Implantação (Clicável para Ampliar) */}
        <div 
          onClick={() => setIsMapOpen(true)}
          className="w-full flex justify-center mb-8 sm:mb-12 cursor-pointer group relative rounded-2xl overflow-hidden"
          title="Clique para ampliar o mapa"
        >
          <Image
            src="/img/implantacao.jpg"
            alt="Planta de Implantação do Empreendimento Nova Califórnia"
            width={1200}
            height={700}
            quality={100}
            className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
            priority
          />
          {/* Overlay suave com ícone de Lupa ao passar o mouse */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-[#0052a5] text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-xl transition-all transform scale-95 group-hover:scale-100 uppercase tracking-wider flex items-center gap-2">
              🔍 Clique para ampliar
            </span>
          </div>
        </div>

        {/* Rodapé da Seção: Selo + Legenda Numerada */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 md:pr-48 lg:pr-72 xl:pr-96">
          
          {/* Coluna 1: Selo Área de Lazer (Esquerda) */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start items-center">
            <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[260px] transition-transform hover:scale-105">
              <Image
                src="/img/areadelazer.png"
                alt="Selo Áreas de Lazer Equipadas e Decoradas"
                width={320}
                height={320}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Coluna 2: Legendas em 2 Colunas */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm font-semibold text-gray-800 lg:pl-12 xl:pl-16">
            {/* Subcoluna 1 (01 a 11) */}
            <ul className="flex flex-col gap-2">
              {legendaColuna1.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="bg-[#fbd668] text-[#1E293B] font-black text-[11px] sm:text-xs rounded-full px-1.5 py-0.5 min-w-[24px] text-center shrink-0 mt-0.5 shadow-sm">
                    {item.num}
                  </span>
                  <span className="leading-tight">{item.texto}</span>
                </li>
              ))}
            </ul>

            {/* Subcoluna 2 (12 a 22 + Bicicletário) */}
            <ul className="flex flex-col gap-2 mt-2 sm:mt-0">
              {legendaColuna2.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="bg-[#fbd668] text-[#1E293B] font-black text-[11px] sm:text-xs rounded-full px-1.5 py-0.5 min-w-[24px] text-center shrink-0 mt-0.5 shadow-sm">
                    {item.num}
                  </span>
                  <span className="leading-tight">{item.texto}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* ================= CACHORRINHO RESPONSIVO COLADO 100% NO BOTTOM E À DIREITA ================= */}
      <div className="absolute right-0 bottom-0 z-20 flex items-end justify-end pointer-events-none">
        <div className="relative z-10 w-[420px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[440px] mb-0 mr-0 leading-none">
          <Image
            src="/img/cachorrinho.png"
            alt="Mascote Cachorrinho Nova Califórnia"
            width={450}
            height={450}
            className="w-full h-auto object-contain block mb-0 mr-0"
          />
        </div>
      </div>

      {/* ================= MODAL DO MAPA EXPANDIDO ================= */}
      {isMapOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setIsMapOpen(false)}
        >
          <button
            onClick={() => setIsMapOpen(false)}
            className="absolute top-4 right-6 text-white text-4xl sm:text-5xl font-light hover:text-[#fbd668] transition-colors focus:outline-none z-50"
            aria-label="Fechar"
          >
            &times;
          </button>
          <div 
            className="relative w-full max-w-[1600px] max-h-[90vh] h-full flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/img/implantacao.jpg"
              alt="Planta de Implantação Ampliada"
              width={1920}
              height={1080}
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
}