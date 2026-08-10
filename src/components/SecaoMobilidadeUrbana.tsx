"use client";

import Image from "next/image";

// Lista de pontos de interesse de fácil personalização
const pontosInteresse = [
  {
    src: "/img/localizacao/01.jpg",
    title: "PARQUE MUNICIPAL DOM JOSÉ",
  },
  {
    src: "/img/localizacao/02.jpg",
    title: "ARENA BARUERI",
  },
  {
    src: "/img/localizacao/03.jpg",
    title: "ASSAÍ BARUERI",
  },
  {
    src: "/img/localizacao/04.jpg",
    title: "PARQUE SHOPPING BARUERI",
  },
  {
    src: "/img/localizacao/05.jpg",
    title: "SHOPPING TAMBORÉ",
  },
  {
    src: "/img/localizacao/06.jpg",
    title: "RODOVIA CASTELLO BRANCO",
  },
];

export default function SecaoMobilidadeUrbana() {
  const enderecoPlantao = "Estr. Dr. Cícero Borges de Moraes, 1440 - Jardim Regina Alice, Barueri - SP, 06407-000";
  const linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoPlantao)}`;
  const linkWaze = `https://waze.com/ul?q=${encodeURIComponent(enderecoPlantao)}&navigate=yes`;
  const whatsappNumber = "5511971200175";

  return (
    <section id="localizacao" className="w-full bg-white pt-12 sm:pt-16 pb-0 overflow-hidden">
      
      {/* ================= PRIMEIRA PARTE: INFRAESTRUTURA DA REGIÃO ================= */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-16">
        
        {/* Título da Seção */}
        <h2 
          className="text-[#a96190] font-medium text-center text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wider mb-8 sm:mb-12 max-w-4xl mx-auto drop-shadow-sm"
          style={{ fontFamily: "geometrica-sans-bold, sans-serif" }}
        >
          UMA REGIÃO COMPLETA, SERVIDA DE AMPLA E DIVERSIFICADA INFRAESTRUTURA DE COMÉRCIO E SERVIÇOS.
        </h2>

        {/* Grade de Imagens (3 Colunas no Desktop, 2 no Tablet e 1 no Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pontosInteresse.map((ponto, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] rounded-xl overflow-hidden shadow-sm bg-gray-100 mb-3 border border-gray-100">
                <Image
                  src={ponto.src}
                  alt={ponto.title}
                  fill
                  quality={90}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-gray-800 font-extrabold text-xs sm:text-sm uppercase tracking-wider text-center">
                {ponto.title}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ================= SEGUNDA PARTE: VISITE O DECORADO & MAPA ================= */}
      <div className="w-full">
        
        {/* Faixa Roxa do Título */}
        <div className="w-full bg-[#a96190] py-6 px-4 text-center text-white">
          <h3 
            className="text-[#fbd668] font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider mb-2 drop-shadow-sm"
            style={{ fontFamily: "geometrica-sans-bold, sans-serif" }}
          >
            VISITE O DECORADO
          </h3>
          <p className="text-white font-semibold text-xs sm:text-sm md:text-base tracking-wide max-w-3xl mx-auto">
            Plantão: Estr. Dr. Cícero Borges de Moraes, 1.440 – Jd. Regina Alice/ Barueri.
          </p>
        </div>

        {/* Google Maps Embed Integrado */}
        <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] relative bg-gray-200 border-y border-gray-200">
          <iframe
            title="Mapa de Localização do Plantão de Vendas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.182390886844!2d-46.8967909!3d-23.5079201!2m3!10f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf03cb9cd5e6ab%3A0x86bb11082df9ca40!2sEstr.%20Dr.%20C%C3%ADcero%20Borges%20de%20Moraes%2C%201440%20-%20Jardim%20Regina%20Alice%2C%20Barueri%20-%20SP%2C%2006407-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Botões de Ação (Waze e Ver Mapa Ampliado) */}
        <div className="bg-white py-6 px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto mb-8">
            {/* Botão Waze */}
            <a
              href={linkWaze}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#00a2ff] hover:bg-[#008ce0] text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.12-1.32A9.957 9.957 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.04-.43-4.32-1.18l-.31-.18-3.04.78.81-2.96-.2-.32A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Veja pelo Waze
            </a>

            {/* Botão Google Maps Ampliado */}
            <a
              href={linkGoogleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white border-2 border-[#00a2ff] text-gray-800 hover:bg-[#00a2ff] hover:text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Ver mapa ampliado
            </a>
          </div>

          {/* Chamada para o WhatsApp de Atendimento */}
          <div className="flex items-center justify-center gap-3 py-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-105"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <span className="text-gray-900 font-black text-4xl sm:text-5xl lg:text-7xl tracking-tight">
                <span className="text-base sm:text-lg font-bold align-super mr-1">11</span>
                97120.0175
              </span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
}