import { redirect } from "next/navigation";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import UploadInterface from "./UploadInterface";

// Antes esta página checava só a presença do cookie "admin_session" (valor
// fixo "autenticado", fácil de forjar pelo DevTools). Agora valida a
// assinatura HMAC do cookie, igual às outras rotas administrativas.
export default async function AdminKitPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      <div>
        {/* BANNER SUPERIOR NOVA CALIFÓRNIA */}
        <div className="w-full relative z-10 pt-10 sm:pt-14 bg-[#a96190] pb-8 flex items-center justify-center shadow-md">
          <div className="relative w-64 sm:w-80 md:w-96 h-20 sm:h-24">
            <Image
              src="/img/LogoNovaCalifornia_Horiz.png"
              alt="Logo Nova Califórnia"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ÁREA ADMINISTRATIVA */}
        <div className="max-w-[1000px] mx-auto px-6 py-12 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-6">
            <div>
              <h1 className="text-3xl font-black text-[#1E293B] uppercase tracking-tight">
                Gestão do Kit Corretor
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Faça upload em lote dos materiais para a página pública.
              </p>
            </div>
            <span className="bg-[#a96190]/10 text-[#a96190] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Painel Administrativo
            </span>
          </div>
          
          {/* COMPONENTE DE UPLOAD E DRAG & DROP */}
          <UploadInterface />
        </div>
      </div>

      {/* RODAPÉ PAINEL */}
      <footer className="w-full bg-[#ffffff] border-t border-gray-200 py-8 px-6 text-center mt-16 md:mt-24">
        <p className="text-xs sm:text-sm font-bold tracking-wide text-[#a96190]">
          Quattro Inc © 2026 Nova Califórnia | Painel Administrativo
        </p>
      </footer>
    </main>
  );
}