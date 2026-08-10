import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";

// Configuração centralizada da fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Metadados oficiais para SEO e redes sociais - Nova Califórnia
export const metadata: Metadata = {
  title: "NOVA CALIFÓRNIA | Jardim Califórnia - Barueri • 2 Dorms. • Terraço • 1 Vaga",
  description: "NOVA CALIFÓRNIA | Jardim Califórnia - Barueri • 2 Dorms. • Terraço • 1 Vaga",
  keywords: [
    "Nova Califórnia Barueri",
    "Apartamento Barueri",
    "Lançamento Barueri",
    "Minha Casa Minha Vida Barueri",
    "2 Dorms Terraço 1 Vaga",
  ],
  openGraph: {
    title: "NOVA CALIFÓRNIA | Jardim Califórnia - Barueri",
    description: "NOVA CALIFÓRNIA | Jardim Califórnia - Barueri • 2 Dorms. • Terraço • 1 Vaga",
    url: "https://www.novacalifornia.com.br",
    siteName: "NOVA CALIFÓRNIA",
    locale: "pt_BR",
    type: "website",
  },
};

// Configuração da Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#a96190",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} scroll-smooth`}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WHVRLXR2');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-[#333333] antialiased selection:bg-[#f9d150] selection:text-[#a96190]">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WHVRLXR2"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  );
}