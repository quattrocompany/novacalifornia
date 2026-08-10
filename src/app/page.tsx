"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

// Importação dos Componentes Modulares
import SecaoBanner from "@/components/SecaoBanner";
import SecaoAerea from "@/components/SecaoAerea";
import SecaoContato from "@/components/SecaoContato";
import SecaoSegurancaComodidade from "@/components/SecaoSegurancaComodidade";
import SecaoLazer from "@/components/SecaoLazer";
import SecaoImplantacao from "@/components/SecaoImplantacao";
import SecaoPlantas from "@/components/SecaoPlantas";
import SecaoMobilidadeUrbana from "@/components/SecaoMobilidadeUrbana";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ModalWhatsapp from "@/components/ModalWhatsapp";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export default function Home() {
  const [activeModal, setActiveModal] = useState<"privacidade" | "lgpd" | "whatsapp" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Escuta o Scroll para mudar os estados do Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const domOrder = ["home", "contato", "produto", "lazer", "plantas", "localizacao", "realizacao"];
      let currentSection = "home";

      for (const name of domOrder) {
        const element = document.getElementById(`nav-${name}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = name;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Eventos customizados dos Modais
  useEffect(() => {
    const handleOpenWhatsapp = () => openModal("whatsapp");
    const handleOpenPrivacidade = () => openModal("privacidade");
    const handleOpenLgpd = () => openModal("lgpd");

    window.addEventListener("openWhatsAppModal", handleOpenWhatsapp);
    window.addEventListener("openPrivacidadeModal", handleOpenPrivacidade);
    window.addEventListener("openLgpdModal", handleOpenLgpd);
    
    return () => {
      window.removeEventListener("openWhatsAppModal", handleOpenWhatsapp);
      window.removeEventListener("openPrivacidadeModal", handleOpenPrivacidade);
      window.removeEventListener("openLgpdModal", handleOpenLgpd);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(`nav-${sectionId}`);
    
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setIsMobileMenuOpen(false);
  };

  const openModal = (modal: "privacidade" | "lgpd" | "whatsapp") => {
    setActiveModal(modal);
    if (typeof window !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") document.body.style.overflow = "auto";
  };

  // Funções Auxiliares para Cores do Menu Dinâmico
  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    if (isScrolled) {
      return isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white font-medium';
    } else {
      return isActive 
        ? 'text-[#a96190] font-semibold drop-shadow-md' 
        : 'text-[#1E293B] hover:text-[#a96190] font-medium drop-shadow-md transition-colors';
    }
  };

  const getSeparatorClass = () => {
    return isScrolled ? 'text-white/40 font-light select-none' : 'text-gray-500/50 font-light select-none drop-shadow-sm';
  };

  return (
    <main className={`min-h-screen text-[#333333] bg-white overflow-x-hidden ${montserrat.className}`}>
      
      {/* ================= HEADER DINÂMICO ================= */}
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#a96190]/95 backdrop-blur-md shadow-xl py-2 md:py-3" 
          : "bg-transparent pointer-events-none pt-4 sm:pt-6"
      }`}>
        <div className={`max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 flex ${isScrolled ? "items-center" : "items-start"} justify-between pointer-events-auto transition-all`}>
          
          {/* Logo */}
          <div 
            onClick={(e) => scrollToSection(e as any, 'home')}
            className="cursor-pointer transition-transform hover:scale-105 shrink-0"
            aria-label="Voltar ao início"
          >
            {isScrolled ? (
              <Image 
                src="/img/LogoNovaCalifornia_Horiz.png" 
                alt="Logo Nova Califórnia" 
                width={200} 
                height={60} 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-sm brightness-0 invert" 
                priority
              />
            ) : (
              <Image 
                src="/img/logo350.png" 
                alt="Logo Nova Califórnia" 
                width={350} 
                height={350} 
                className="h-40 sm:h-48 md:h-56 lg:h-64 w-auto object-contain drop-shadow-2xl"
                priority
              />
            )}
          </div>

          {/* Menu de Navegação */}
          <div className="flex items-center justify-end h-10 md:h-12">
            <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-8 text-sm lg:text-base tracking-wider">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={`transition-all cursor-pointer ${getLinkClass('home')}`}>HOME</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#produto" onClick={(e) => scrollToSection(e, 'produto')} className={`transition-all cursor-pointer ${getLinkClass('produto')}`}>PRODUTO</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#lazer" onClick={(e) => scrollToSection(e, 'lazer')} className={`transition-all cursor-pointer ${getLinkClass('lazer')}`}>LAZER</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#plantas" onClick={(e) => scrollToSection(e, 'plantas')} className={`transition-all cursor-pointer ${getLinkClass('plantas')}`}>PLANTAS</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#localizacao" onClick={(e) => scrollToSection(e, 'localizacao')} className={`transition-all cursor-pointer ${getLinkClass('localizacao')}`}>LOCALIZAÇÃO</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#realizacao" onClick={(e) => scrollToSection(e, 'realizacao')} className={`transition-all cursor-pointer ${getLinkClass('realizacao')}`}>REALIZAÇÃO</a>
              <span className={getSeparatorClass()}>|</span>
              
              <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className={`transition-all cursor-pointer ${getLinkClass('contato')}`}>CONTATO</a>
            </nav>

            <button 
              className={`md:hidden p-1 focus:outline-none drop-shadow-sm ${isScrolled ? 'text-white' : 'text-[#a96190]'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir Menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Menu Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full max-w-[1440px] mx-auto mt-2 px-4 pointer-events-auto relative z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-gray-200 text-center">
              <nav className="flex flex-col gap-3 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="py-2 hover:text-[#a96190] border-b border-gray-100">HOME</a>
                <a href="#produto" onClick={(e) => scrollToSection(e, 'produto')} className="py-2 hover:text-[#a96190] border-b border-gray-100">PRODUTO</a>
                <a href="#lazer" onClick={(e) => scrollToSection(e, 'lazer')} className="py-2 hover:text-[#a96190] border-b border-gray-100">LAZER</a>
                <a href="#plantas" onClick={(e) => scrollToSection(e, 'plantas')} className="py-2 hover:text-[#a96190] border-b border-gray-100">PLANTAS</a>
                <a href="#localizacao" onClick={(e) => scrollToSection(e, 'localizacao')} className="py-2 hover:text-[#a96190] border-b border-gray-100">LOCALIZAÇÃO</a>
                <a href="#realizacao" onClick={(e) => scrollToSection(e, 'realizacao')} className="py-2 hover:text-[#a96190] border-b border-gray-100">REALIZAÇÃO</a>
                <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className="py-2 hover:text-[#a96190]">CONTATO</a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ================= FLUXO DAS SEÇÕES MODULARES ================= */}
      
      <div id="nav-home">
        <SecaoBanner />
      </div>

      <div id="nav-contato">
        <SecaoContato />
      </div>

      <SecaoAerea />

      <SecaoSegurancaComodidade />

      <div id="nav-lazer">
        <SecaoLazer />
      </div>

      <SecaoImplantacao />

      <div id="nav-plantas">
        <SecaoPlantas />
      </div>

      <div id="nav-localizacao">
        <SecaoMobilidadeUrbana />
      </div>

      <div id="nav-realizacao">
        <Footer 
          onOpenWhatsapp={() => openModal("whatsapp")} 
          onOpenPrivacidade={() => openModal("privacidade")} 
          onOpenLgpd={() => openModal("lgpd")} 
        />
      </div>

      {/* ================= MODAL WHATSAPP COMPONENTIZADO ================= */}
      <ModalWhatsapp isOpen={activeModal === "whatsapp"} onClose={closeModal} />

      {/* ================= MODAIS LEGAIS ================= */}
      {(activeModal === 'privacidade' || activeModal === 'lgpd') && (
        <div 
          className="fixed inset-0 bg-[#a96190]/90 z-[9999] flex justify-center items-center p-4 animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-8 md:p-12 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-[#a96190] transition-colors focus:outline-none"
              aria-label="Fechar Modal"
            >
              &times;
            </button>
            
            {activeModal === 'privacidade' && (
              <>
                <h2 className="text-2xl font-black text-[#a96190] uppercase mb-6">POLÍTICA DE PRIVACIDADE</h2>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  A sua privacidade é importante para nós. É política da Quattro Inc respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar nos sites da Nova Califórnia, e outros sites que possuímos e operamos.
                </p>
              </>
            )}

            {activeModal === 'lgpd' && (
              <>
                <h2 className="text-2xl font-black text-[#a96190] uppercase mb-6">POLÍTICA DE DADOS LGPD</h2>
                <p className="text-gray-600 leading-relaxed text-justify mb-4 font-medium text-sm">
                  Nos comprometemos a nunca compartilhar seus dados com terceiros. Os dados aqui captados (Nome, E-mail e Telefone) serão utilizados única e exclusivamente pela incorporadora responsável por esse empreendimento para que seja possível o contato com o cliente e apresentação dos produtos vinculados à marca da Incorporadora ou pertencentes ao mesmo grupo econômico da Vendedora.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify mb-4 font-medium text-sm">
                  O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= COOKIE BANNER LGPD ================= */}
      <CookieBanner />
    </main>
  );
}