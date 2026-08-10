"use client";

import { useState } from "react";
import Image from "next/image";

export default function SecaoContato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const sanitizeEmail = (email: string) => {
    return email.trim().toLowerCase().replace(/,/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      setFormData({ ...formData, telefone: maskPhone(value) });
    } else if (name === "email") {
      setFormData({ ...formData, email: sanitizeEmail(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const emailLimpo = sanitizeEmail(formData.email);

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: emailLimpo,
          telefone: formData.telefone,
          mensagem: formData.mensagem,
          via: "formulario_site",
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Erro ao registrar cadastro.");
      }

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "lead_formulario_enviado",
          lead_data: { ...formData, email: emailLimpo },
        });
      }

      setStatus({
        type: "success",
        message: "Cadastro realizado com sucesso! Em breve entraremos em contato.",
      });
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Ocorreu um erro ao enviar. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/img/02.webp')" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-[1200px] mx-auto">
          
          <div className="lg:col-span-7 w-full">
            <h2 className="text-[#a96190] font-black text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider mb-6 drop-shadow-sm">
              CADASTRE-SE E RECEBA TODAS AS INFORMAÇÕES:
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="NOME (*):"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full bg-white/40 backdrop-blur-sm border-2 border-[#a96190]/60 rounded-lg px-4 py-3 text-gray-800 placeholder-[#a96190] font-semibold text-sm focus:outline-none focus:border-[#a96190] focus:bg-white/80 transition-all shadow-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-MAIL (*):"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/40 backdrop-blur-sm border-2 border-[#a96190]/60 rounded-lg px-4 py-3 text-gray-800 placeholder-[#a96190] font-semibold text-sm focus:outline-none focus:border-[#a96190] focus:bg-white/80 transition-all shadow-sm"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="telefone"
                  required
                  placeholder="TELEFONE (*):"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full bg-white/40 backdrop-blur-sm border-2 border-[#a96190]/60 rounded-lg px-4 py-3 text-gray-800 placeholder-[#a96190] font-semibold text-sm focus:outline-none focus:border-[#a96190] focus:bg-white/80 transition-all shadow-sm"
                />
              </div>

              <div>
                <textarea
                  name="mensagem"
                  rows={3}
                  placeholder="MENSAGEM:"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full bg-white/40 backdrop-blur-sm border-2 border-[#a96190]/60 rounded-lg px-4 py-3 text-gray-800 placeholder-[#a96190] font-semibold text-sm focus:outline-none focus:border-[#a96190] focus:bg-white/80 transition-all shadow-sm resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="bg-white rounded-lg border border-gray-300 p-3 shadow-sm flex items-center gap-3 w-full sm:w-auto">
                  <input
                    type="checkbox"
                    id="recaptcha"
                    required
                    className="w-5 h-5 accent-[#a96190] cursor-pointer"
                  />
                  <label htmlFor="recaptcha" className="text-xs font-medium text-gray-700 cursor-pointer select-none">
                    Não sou um robô
                  </label>
                  <div className="ml-auto sm:ml-4 flex flex-col items-center">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                    </svg>
                    <span className="text-[8px] text-gray-400 font-semibold">reCAPTCHA</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#a96190] hover:bg-[#8e4f78] text-white font-bold py-3.5 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all uppercase tracking-wider text-sm disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "ENVIANDO..." : "ENVIAR"}
                </button>
              </div>

              {status && (
                <p className={`text-xs font-bold mt-2 text-center sm:text-left ${status.type === "success" ? "text-emerald-700" : "text-red-600"}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center gap-5 w-full">
            <div className="w-full max-w-[200px] sm:max-w-[240px] flex justify-center transition-transform hover:scale-105">
              <Image
                src="/img/metragem.png"
                alt="46m² privativos, Terraço 1 Vaga, Lazer de Clube"
                width={300}
                height={225}
                className="object-contain w-full h-auto drop-shadow-md mx-auto"
              />
            </div>

            <div className="w-full max-w-[140px] sm:max-w-[170px] flex justify-center transition-transform hover:scale-105">
              <Image
                src="/img/mcmv2.png"
                alt="Minha Casa Minha Vida"
                width={200}
                height={100}
                className="object-contain w-full h-auto mx-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}