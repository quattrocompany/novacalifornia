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
  const [loading, setLoading] = useState(true);
  const [dataFiltro, setDataFiltro] = useState<string>("todas");

  // Carrega os arquivos cadastrados na API
  useEffect(() => {
    async function carregarMateriais() {
      try {
        const res = await fetch("/api/kit");
        const data = await res.json();
        if (res.ok && data.items) {
          setItens(data.items);
        }
      } catch (err) {
        console.error("Erro ao carregar kit corretor:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarMateriais();
  }, []);

  // Auxiliares de identificação de tipo de arquivo
  const isVideoItem = (item: ItemKit) => {
    const ext = item.url.split(".").pop()?.toLowerCase();
    return (
      item.categoria === "video" ||
      ["mp4", "mov", "webm", "avi", "m4v"].includes(ext || "") ||
      item.nome.toLowerCase().endsWith(".mp4")
    );
  };

  const isImageItem = (item: ItemKit) => {
    const ext = item.url.split(".").pop()?.toLowerCase();
    return (
      (item.categoria === "imagem_avulsa" || ["jpg", "jpeg", "png", "webp"].includes(ext || "")) &&
      !isVideoItem(item)
    );
  };

  // Datas e Filtros
  const datasDisponiveis = Array.from(new Set(itens.map((i) => i.dataUpload)));

  const itensFiltrados = itens.filter((item) => {
    if (dataFiltro === "todas") return true;
    return item.dataUpload === dataFiltro;
  });

  // Localização Inteligente dos Arquivos para os Botões
  const zipFile = itensFiltrados.find(
    (i) =>
      i.categoria === "pacote_zip" ||
      i.url.toLowerCase().endsWith(".zip") ||
      i.url.toLowerCase().endsWith(".rar") ||
      i.nome.toLowerCase().endsWith(".zip") ||
      i.nome.toLowerCase().endsWith(".rar")
  );

  const laminasPdf = itensFiltrados.filter((i) => i.categoria === "lamina_pdf");
  const videos = itensFiltrados.filter(isVideoItem);
  const imagens = itensFiltrados.filter(isImageItem);

  const laminaPrincipalPdf = laminasPdf[0];
  const videoPrincipalMp4 = videos[0];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans">
      <div>
        {/* BANNER SUPERIOR DE MARCA */}
        <header className="w-full relative z-10 pt-10 sm:pt-14 bg-[#a96190] pb-8 flex items-center justify-center shadow-sm">
          <div className="relative w-64 sm:w-80 md:w-96 h-20 sm:h-24">
            <Image
              src="/img/LogoNovaCalifornia_Horiz.png"
              alt="Logo Nova Califórnia"
              fill
              className="object-contain"
              priority
            />
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO PRINCIPAL */}
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12 w-full">
          
          {/* TÍTULO E SUBTÍTULO CENTRALIZADOS */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E293B] tracking-tight uppercase mb-3">
              KIT CORRETOR
            </h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
              Reunimos todo o conteúdo de apoio em um só lugar para você ter sempre à mão. Use sem moderação!
            </p>

            {/* SELETOR DE VERSÃO POR DATA */}
            {datasDisponiveis.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-2.5 bg-white border border-gray-200/80 px-4 py-2 rounded-2xl shadow-sm">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Versão:</label>
                <select
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="bg-transparent text-xs font-black text-[#1E293B] focus:outline-none cursor-pointer"
                >
                  <option value="todas">Todas as Versões</option>
                  {datasDisponiveis.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#a96190] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-gray-500">Carregando acervo do kit corretor...</p>
            </div>
          ) : (
            <div className="space-y-12">

              {/* CARD DESTAQUE TOP: DOWNLOAD COMPLETO */}
              <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full inline-block mb-3 tracking-wider">
                    DOWNLOAD COMPLETO
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] mb-1">
                    Baixar Todo o Kit de Vendas
                  </h2>
                  <p className="text-xs text-gray-500 max-w-md">
                    Inclui todas as imagens HD, lâmina comercial e vídeos em 1 só arquivo.
                  </p>
                </div>

                {zipFile ? (
                  <a
                    href={zipFile.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    BAIXAR KIT COMPLETO (.ZIP)
                  </a>
                ) : (
                  <div className="w-full md:w-auto bg-gray-100 text-gray-400 font-bold text-xs py-3.5 px-8 rounded-full text-center uppercase tracking-wider cursor-not-allowed select-none">
                    Indisponível
                  </div>
                )}
              </div>

              {/* GRID DOS 3 CARDS PRINCIPAIS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                
                {/* CARD 1: IMAGENS E PERSPECTIVAS */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 text-[#1E293B] flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B] mb-2">
                      Imagens e Perspectivas
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-8 max-w-[220px]">
                      Renders em alta resolução da fachada, lazer e decorado.
                    </p>
                  </div>

                  {zipFile ? (
                    <a
                      href={zipFile.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold text-xs py-3 px-6 rounded-full transition-all text-center uppercase tracking-wider block shadow-sm cursor-pointer"
                    >
                      BAIXAR PACOTE (.ZIP)
                    </a>
                  ) : (
                    <div className="w-full bg-gray-200/70 text-gray-400 font-bold text-xs py-3 px-6 rounded-full text-center uppercase tracking-wider cursor-not-allowed select-none">
                      Indisponível
                    </div>
                  )}
                </div>

                {/* CARD 2: LÂMINA E PLANTAS */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 text-[#1E293B] flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B] mb-2">
                      Lâmina e Plantas
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-8 max-w-[220px]">
                      Apresentação comercial e todas as plantas baixas cotadas.
                    </p>
                  </div>

                  {laminaPrincipalPdf ? (
                    <a
                      href={laminaPrincipalPdf.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold text-xs py-3 px-6 rounded-full transition-all text-center uppercase tracking-wider block shadow-sm cursor-pointer"
                    >
                      BAIXAR LÂMINA (.PDF)
                    </a>
                  ) : (
                    <div className="w-full bg-gray-200/70 text-gray-400 font-bold text-xs py-3 px-6 rounded-full text-center uppercase tracking-wider cursor-not-allowed select-none">
                      Indisponível
                    </div>
                  )}
                </div>

                {/* CARD 3: VÍDEOS E REELS */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 text-[#1E293B] flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B] mb-2">
                      Vídeos e Reels
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-8 max-w-[220px]">
                      Vídeos promocionais prontos para postar no Instagram e WhatsApp.
                    </p>
                  </div>

                  {videoPrincipalMp4 ? (
                    <a
                      href={videoPrincipalMp4.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1E293B] hover:bg-black text-white font-bold text-xs py-3 px-6 rounded-full transition-all text-center uppercase tracking-wider block shadow-sm cursor-pointer"
                    >
                      BAIXAR VÍDEOS (.MP4)
                    </a>
                  ) : (
                    <div className="w-full bg-gray-200/70 text-gray-400 font-bold text-xs py-3 px-6 rounded-full text-center uppercase tracking-wider cursor-not-allowed select-none">
                      Indisponível
                    </div>
                  )}
                </div>

              </div>

              {/* ================= SEÇÃO DETALHADA DE VISUALIZAÇÃO E PLAYERS ================= */}

              {/* 1. SEÇÃO DE VÍDEOS COM PLAYER */}
              {videos.length > 0 && (
                <section id="secao-videos" className="pt-12 border-t border-gray-200/60 max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-wide">
                      Vídeos e Reels ({videos.length})
                    </h3>
                    <p className="text-xs text-gray-500">Assista diretamente ou faça o download individual em alta definição.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {videos.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative aspect-[9/16] max-h-[380px] w-full bg-black flex items-center justify-center">
                          <video
                            src={item.url}
                            controls
                            preload="metadata"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-1">
                          <div className="mb-4">
                            <span className="bg-purple-50 text-[#a96190] text-[10px] font-black uppercase px-2.5 py-1 rounded-full inline-block mb-2">
                              MP4 • {item.tamanho}
                            </span>
                            <p className="font-bold text-xs text-gray-800 truncate" title={item.nome}>
                              {item.nome}
                            </p>
                          </div>

                          <a
                            href={item.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-xs font-bold py-3 px-4 rounded-xl text-center transition-colors uppercase tracking-wider block shadow-sm cursor-pointer"
                          >
                            Baixar Vídeo
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 2. SEÇÃO DE LÂMINAS PDF */}
              {laminasPdf.length > 0 && (
                <section id="secao-laminas" className="pt-12 border-t border-gray-200/60 max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-wide">
                      Lâmina e Plantas ({laminasPdf.length})
                    </h3>
                    <p className="text-xs text-gray-500">Apresentações comerciais e documentação técnica em PDF.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {laminasPdf.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-3">
                            PDF • {item.tamanho}
                          </span>
                          <h4 className="font-bold text-sm text-gray-800 break-words mb-6">
                            {item.nome}
                          </h4>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#1E293B] hover:bg-black text-white text-xs font-bold py-3 px-4 rounded-xl text-center transition-colors uppercase tracking-wider block cursor-pointer"
                        >
                          Visualizar / Baixar PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. SEÇÃO DE IMAGENS AVULSAS */}
              {imagens.length > 0 && (
                <section id="secao-imagens" className="pt-12 border-t border-gray-200/60 max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-wide">
                      Imagens e Perspectivas ({imagens.length})
                    </h3>
                    <p className="text-xs text-gray-500">Perspectivas artísticas individuais em alta resolução.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {imagens.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                          <Image
                            src={item.url}
                            alt={item.nome}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-[11px] font-bold text-gray-700 truncate mb-3" title={item.nome}>
                            {item.nome}
                          </p>
                          <a
                            href={item.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gray-100 hover:bg-[#a96190] hover:text-white text-[#1E293B] text-[11px] font-bold py-2.5 px-2 rounded-xl text-center transition-colors uppercase tracking-wider block cursor-pointer"
                          >
                            Baixar Imagem
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      </div>

      {/* RODAPÉ */}
      <footer className="w-full bg-white border-t border-gray-200/80 py-6 px-4 text-center mt-16">
        <p className="text-xs font-bold text-[#a96190]">
          Quattro Inc © 2026 Nova Califórnia | Kit Corretor Oficial
        </p>
      </footer>
    </main>
  );
}