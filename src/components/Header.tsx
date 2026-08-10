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

  // Navegação suave até a seção (redireciona PRODUTO para Vista Aérea caso use ID de aérea)
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

  // Estilização dinâmica das cores dos links
  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    if (isScrolled) {
      return isActive
        ? "text-white font-semibold"
        : "text-white/90 hover:text-white font-medium";
    } else {
      return isActive
        ? "text-[#a96190] font-semibold drop-shadow-md"
        : "text-[#1E293B] hover:text-[#a96190] font-medium drop-shadow-md transition-colors";
    }
  };

  const getSeparatorClass = () => {
    return isScrolled
      ? "text-white/40 font-light select-none"
      : "text-gray-500/50 font-light select-none drop-shadow-sm";
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
        className={`max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 flex ${
          isScrolled ? "items-center" : "items-start"
        } justify-between pointer-events-auto transition-all`}
      >
        {/* LOGO */}
        <div
          onClick={(e) => scrollToSection(e as any, "home")}
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

        {/* MENU DESKTOP */}
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
            className={`md:hidden p-1 focus:outline-none drop-shadow-sm ${
              isScrolled ? "text-white" : "text-[#a96190]"
            }`}
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
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-gray-200 text-center">
            <nav className="flex flex-col gap-3 text-sm font-bold text-gray-700 uppercase tracking-wider">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                HOME
              </a>
              <a
                href="#produto"
                onClick={(e) => scrollToSection(e, "produto")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                PRODUTO
              </a>
              <a
                href="#lazer"
                onClick={(e) => scrollToSection(e, "lazer")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                LAZER
              </a>
              <a
                href="#implantacao"
                onClick={(e) => scrollToSection(e, "implantacao")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                IMPLANTAÇÃO
              </a>
              <a
                href="#plantas"
                onClick={(e) => scrollToSection(e, "plantas")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                PLANTAS
              </a>
              <a
                href="#localizacao"
                onClick={(e) => scrollToSection(e, "localizacao")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                LOCALIZAÇÃO
              </a>
              <a
                href="#realizacao"
                onClick={(e) => scrollToSection(e, "realizacao")}
                className="py-2 hover:text-[#a96190] border-b border-gray-100"
              >
                REALIZAÇÃO
              </a>
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, "contato")}
                className="py-2 hover:text-[#a96190]"
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