"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

// Importação dos Componentes Modulares
import Header from "@/components/Header";
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
  display: "swap",
});

export default function Home() {
  const [activeModal, setActiveModal] = useState<"privacidade" | "lgpd" | "whatsapp" | null>(null);

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

  const openModal = (modal: "privacidade" | "lgpd" | "whatsapp") => {
    setActiveModal(modal);
    if (typeof window !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") document.body.style.overflow = "auto";
  };

  return (
    <main className={`min-h-screen text-[#333333] bg-white overflow-x-hidden ${montserrat.className}`}>
      
      {/* ================= HEADER COMPONENTIZADO ================= */}
      <Header />

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
      {(activeModal === "privacidade" || activeModal === "lgpd") && (
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

            {activeModal === "privacidade" && (
              <>
                <h2 className="text-2xl font-black text-[#a96190] uppercase mb-6">POLÍTICA DE PRIVACIDADE</h2>
                <p className="text-gray-600 leading-relaxed text-justify font-medium text-sm">
                  A sua privacidade é importante para nós. É política da Quattro Inc respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar nos sites da Nova Califórnia, e outros sites que possuímos e operamos.
                </p>
              </>
            )}

            {activeModal === "lgpd" && (
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