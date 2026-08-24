"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
}

export default function KitCorretorPage() {
  const [itens, setItens] = useState<ItemKit[]>([]);
  const [dataFiltro, setDataFiltro] = useState<string>("todas");
  const [tipoImagem, setTipoImagem] = useState<string>("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarKit() {
      try {
        const res = await fetch("/api/kit");
        const data = await res.json();
        
        if (data.items && Array.isArray(data.items)) {
          setItens(data.items);
          const datas = Array.from(new Set(data.items.map((i: ItemKit) => i.dataUpload))).sort().reverse();
          if (datas.length > 0) {
            setDataFiltro(datas[0] as string);
          }
        } else {
          setItens([]);
        }
      } catch (e) {
        console.error("Erro ao carregar do servidor:", e);
        setItens([]);
      } finally {
        setLoading(false);
      }
    }
    carregarKit();
  }, []);

  const datasDisponiveis = Array.from(new Set(itens.map((i) => i.dataUpload))).sort().reverse();

  const itensFiltrados = itens.filter((i) => {
    if (dataFiltro === "todas") return true;
    return i.dataUpload === dataFiltro;
  });

  // Busca na data selecionada; se não houver PDF nessa data específica, busca no acervo geral
  const tabelasElegiveis = itensFiltrados.some(
    (i) => i.categoria === "tabela_precos" || i.nome.toLowerCase().includes("tabela")
  ) ? itensFiltrados : itens;

  const tabelasPdf = tabelasElegiveis.filter(
    (i) => i.categoria === "tabela_precos" || i.nome.toLowerCase().includes("tabela")
  );
  
  const laminasElegiveis = itensFiltrados.some(
    (i) => i.categoria === "lamina_pdf" || i.nome.toLowerCase().includes("book") || i.nome.toLowerCase().includes("lamina")
  ) ? itensFiltrados : itens;

  const laminasPdf = laminasElegiveis.filter(
    (i) => i.categoria === "lamina_pdf" || i.nome.toLowerCase().includes("book") || i.nome.toLowerCase().includes("lamina")
  );

  const midiasGaleria = itensFiltrados.filter((i) => 
    ["imagem_avulsa", "imagem_feed", "imagem_story", "video"].includes(i.categoria)
  );

  const midiasRenderizadas = midiasGaleria.filter((i) => {
    if (tipoImagem === "todas") return true;
    return i.categoria === tipoImagem;
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      
      <div>
        {/* BANNER SUPERIOR */}
        <div className="w-full relative z-10 pt-16 sm:pt-0 bg-[#a96190]">
          <div className="relative w-full max-w-[1920px] mx-auto">
            <Image
              src="/img/testeiranc.jpg"
              alt="Kit Corretor"
              width={1920}
              height={350}
              quality={100}
              className="w-full h-auto block object-cover"
              priority
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL (1440px) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tight mb-3">
              Kit Corretor
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Reunimos todo o conteúdo de apoio em um só lugar para você ter sempre à mão. Use sem moderação!
            </p>
          </div>

          {/* 2 RETÂNGULOS COMPACTOS DEDICADOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
            
            {/* Retângulo 1: TABELA DE PREÇOS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                <div className="w-12 h-12 shrink-0 bg-[#a96190]/10 text-[#a96190] rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Tabela de Preços</h3>
                  <p className="text-xs text-gray-500">Tabela oficial com fluxos de pagamento e valores das unidades.</p>
                </div>
              </div>

              {loading ? (
                <button disabled className="w-full sm:w-auto bg-gray-100 text-gray-400 font-bold py-3 px-6 rounded-full text-xs animate-pulse whitespace-nowrap">
                  Carregando PDF...
                </button>
              ) : tabelasPdf.length > 0 ? (
                <a
                  href={tabelasPdf[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold py-3 px-6 rounded-full transition-colors text-xs text-center whitespace-nowrap shadow-sm cursor-pointer"
                >
                  Visualizar e Baixar (.PDF)
                </a>
              ) : (
                <button disabled className="w-full sm:w-auto bg-gray-200 text-gray-400 font-bold py-3 px-6 rounded-full text-xs cursor-not-allowed whitespace-nowrap">
                  Indisponível
                </button>
              )}
            </div>

            {/* Retângulo 2: BOOK DO CORRETOR */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                <div className="w-12 h-12 shrink-0 bg-[#a96190]/10 text-[#a96190] rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Book do Corretor</h3>
                  <p className="text-xs text-gray-500">Apresentação comercial e cadernos de plantas cotadas.</p>
                </div>
              </div>

              {loading ? (
                <button disabled className="w-full sm:w-auto bg-gray-100 text-gray-400 font-bold py-3 px-6 rounded-full text-xs animate-pulse whitespace-nowrap">
                  Carregando PDF...
                </button>
              ) : laminasPdf.length > 0 ? (
                <a 
                  href={laminasPdf[0].url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold py-3 px-6 rounded-full transition-colors text-xs text-center whitespace-nowrap shadow-sm cursor-pointer"
                >
                  Visualizar e Baixar (.PDF)
                </a>
              ) : (
                <button disabled className="w-full sm:w-auto bg-gray-200 text-gray-400 font-bold py-3 px-6 rounded-full text-xs cursor-not-allowed whitespace-nowrap">
                  Indisponível
                </button>
              )}
            </div>

          </div>

          {/* GALERIA UNIFICADA DE MÍDIAS */}
          <div id="secao-galeria" className="border-t border-gray-200 pt-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] uppercase tracking-wide">
                  Galeria de Mídias
                </h2>
                <p className="text-gray-500 text-sm mt-1">Baixe perspectivas e vídeos individuais diretamente para o seu dispositivo.</p>
              </div>

              {datasDisponiveis.length > 0 && (
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  
                  {/* ABAS DE CATEGORIA */}
                  <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setTipoImagem("todas")}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tipoImagem === "todas" ? "bg-white shadow-sm text-[#a96190]" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Todas
                    </button>
                    <button 
                      onClick={() => setTipoImagem("imagem_feed")}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tipoImagem === "imagem_feed" ? "bg-white shadow-sm text-[#a96190]" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Feed
                    </button>
                    <button 
                      onClick={() => setTipoImagem("imagem_story")}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tipoImagem === "imagem_story" ? "bg-white shadow-sm text-[#a96190]" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Story
                    </button>
                    <button 
                      onClick={() => setTipoImagem("video")}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tipoImagem === "video" ? "bg-white shadow-sm text-[#a96190]" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Vídeos
                    </button>
                  </div>

                  {/* SELETOR DE DATA */}
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-gray-600 hidden sm:inline-block">Versão:</span>
                    <select
                      value={dataFiltro}
                      onChange={(e) => setDataFiltro(e.target.value)}
                      className="text-xs font-bold text-[#1E293B] bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="todas">Todas as Datas</option>
                      {datasDisponiveis.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <p className="text-center py-10 text-gray-400 font-medium">Procurando arquivos no servidor...</p>
            ) : midiasRenderizadas.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 font-medium">Nenhum arquivo encontrado para esta categoria/versão.</p>
                <p className="text-gray-400 text-sm mt-1">Quando houver mídias publicadas, elas aparecerão aqui automaticamente.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {midiasRenderizadas.map((item) => (
                  <div key={item.id} className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 bg-black">
                    {item.categoria === "video" ? (
                      <video src={item.url} controls className="w-full h-full object-cover" />
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.nome}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 pointer-events-none group-hover:pointer-events-auto">
                      <span className="text-white font-bold mb-4 text-center text-xs md:text-sm px-2 truncate w-full">
                        {item.nome}
                      </span>
                      <a
                        href={item.url}
                        download
                        className="bg-[#a96190] text-white p-3 rounded-full hover:bg-white hover:text-[#8e4f78] transition-colors transform hover:scale-110 shadow-lg cursor-pointer"
                        title={`Baixar ${item.nome}`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="w-full mt-16 md:mt-24 flex flex-col">
        <div className="w-full bg-[#a96190] py-14 px-6 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p className="text-white/95 mb-8 text-sm md:text-base max-w-lg font-medium leading-relaxed">
              Acompanhe nossas redes sociais oficiais e acesse o site para ficar por dentro de todas as novidades, campanhas e materiais de divulgação!
            </p>
            
            <div className="flex flex-row items-center gap-3 justify-center flex-wrap">
              <a
                href="https://www.novacalifornia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white hover:text-[#a96190] text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 hover:scale-105"
              >
                Acessar Site Oficial
              </a>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#ffffff] py-8 px-6 text-center text-[#a96190] relative z-10 border-t border-gray-100">
          <p className="text-xs sm:text-sm font-bold tracking-wide">
            Quattro Inc © 2026 Nova Califórnia | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>

    </main>
  );
}