"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Escuta o Scroll da página para aplicar cor e seção ativa
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const domOrder = [
        "home",
        "produto",
        "aerea",
        "lazer",
        "implantacao",
        "plantas",
        "localizacao",
        "realizacao",
        "contato",
      ];
      let currentSection = "home";

      for (const name of domOrder) {
        const element =
          document.getElementById(`nav-${name}`) || document.getElementById(name);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = name === "aerea" ? "produto" : name;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    let element =
      document.getElementById(`nav-${sectionId}`) ||
      document.getElementById(sectionId);

    if (!element && sectionId === "produto") {
      element =
        document.getElementById("nav-aerea") ||
        document.getElementById("aerea") ||
        document.getElementById("Aerea");
    }

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  // Fontes em branco, ativo/hover em amarelo
  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return isActive
      ? "text-yellow-400 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      : "text-white hover:text-yellow-400 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors";
  };

  const getSeparatorClass = () => {
    return "text-white/60 font-light select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#a96190]/95 backdrop-blur-md shadow-xl py-2 md:py-3"
          : "bg-transparent pointer-events-none pt-4 sm:pt-6"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center ${
          isScrolled ? "justify-between" : "justify-end"
        } pointer-events-auto transition-all`}
      >
        {/* LOGO HORIZONTAL EXIBIDO APENAS NO SCROLLDOWN */}
        {isScrolled && (
          <div
            onClick={(e) => scrollToSection(e as any, "home")}
            className="cursor-pointer transition-transform hover:scale-105 shrink-0"
            aria-label="Voltar ao início"
          >
            <Image
              src="/img/LogoNovaCalifornia_Horiz.png"
              alt="Logo Nova Califórnia"
              width={200}
              height={60}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-sm brightness-0 invert"
              priority
            />
          </div>
        )}

        {/* MENU DESKTOP / BOTÃO MOBILE */}
        <div className="flex items-center justify-end h-10 md:h-12">
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 text-xs lg:text-sm tracking-wider">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className={`transition-all cursor-pointer ${getLinkClass("home")}`}
            >
              HOME
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#produto"
              onClick={(e) => scrollToSection(e, "produto")}
              className={`transition-all cursor-pointer ${getLinkClass("produto")}`}
            >
              PRODUTO
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#lazer"
              onClick={(e) => scrollToSection(e, "lazer")}
              className={`transition-all cursor-pointer ${getLinkClass("lazer")}`}
            >
              LAZER
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#implantacao"
              onClick={(e) => scrollToSection(e, "implantacao")}
              className={`transition-all cursor-pointer ${getLinkClass("implantacao")}`}
            >
              IMPLANTAÇÃO
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#plantas"
              onClick={(e) => scrollToSection(e, "plantas")}
              className={`transition-all cursor-pointer ${getLinkClass("plantas")}`}
            >
              PLANTAS
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#localizacao"
              onClick={(e) => scrollToSection(e, "localizacao")}
              className={`transition-all cursor-pointer ${getLinkClass("localizacao")}`}
            >
              LOCALIZAÇÃO
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#realizacao"
              onClick={(e) => scrollToSection(e, "realizacao")}
              className={`transition-all cursor-pointer ${getLinkClass("realizacao")}`}
            >
              REALIZAÇÃO
            </a>
            <span className={getSeparatorClass()}>|</span>

            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, "contato")}
              className={`transition-all cursor-pointer ${getLinkClass("contato")}`}
            >
              CONTATO
            </a>
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            className="md:hidden p-1 focus:outline-none drop-shadow-lg text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full max-w-[1440px] mx-auto mt-2 px-4 pointer-events-auto relative z-50">
          <div className="bg-[#a96190]/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-white/20 text-center">
            
            {/* LOGO DENTRO DO DROPDOWN MOBILE */}
            <div className="flex justify-center mb-4">
              <Image
                src="/img/LogoNovaCalifornia_Horiz.png"
                alt="Logo Nova Califórnia"
                width={160}
                height={50}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>

            <nav className="flex flex-col gap-3 text-sm font-bold text-white uppercase tracking-wider">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                HOME
              </a>
              <a
                href="#produto"
                onClick={(e) => scrollToSection(e, "produto")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                PRODUTO
              </a>
              <a
                href="#lazer"
                onClick={(e) => scrollToSection(e, "lazer")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                LAZER
              </a>
              <a
                href="#implantacao"
                onClick={(e) => scrollToSection(e, "implantacao")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                IMPLANTAÇÃO
              </a>
              <a
                href="#plantas"
                onClick={(e) => scrollToSection(e, "plantas")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                PLANTAS
              </a>
              <a
                href="#localizacao"
                onClick={(e) => scrollToSection(e, "localizacao")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                LOCALIZAÇÃO
              </a>
              <a
                href="#realizacao"
                onClick={(e) => scrollToSection(e, "realizacao")}
                className="py-2 hover:text-yellow-400 border-b border-white/20 transition-colors"
              >
                REALIZAÇÃO
              </a>
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, "contato")}
                className="py-2 hover:text-yellow-400 transition-colors"
              >
                CONTATO
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}