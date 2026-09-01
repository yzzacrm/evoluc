import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappButton from "@/components/layout/WhatsappButton";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evolucengenharia.com.br"),
  title: {
    default: "Evoluc | Construtora e Incorporadora em São Paulo",
    template: "%s | Evoluc",
  },
  description:
    "Evoluc: construtora e incorporadora em São Paulo com foco em qualidade, conforto e segurança. Lançamentos, empreendimentos entregues e área exclusiva do morador.",
  keywords: [
    "construtora São Paulo",
    "incorporadora",
    "apartamentos Itaquera",
    "lançamentos imobiliários zona leste",
    "Evoluc",
  ],
  openGraph: {
    title: "Evoluc | Construtora e Incorporadora em São Paulo",
    description:
      "Construindo conforto, estética e segurança desde 2012. Conheça nossos lançamentos e a área exclusiva do morador.",
    url: "https://www.evolucengenharia.com.br",
    siteName: "Evoluc",
    locale: "pt_BR",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.evolucengenharia.com.br/#organization",
  name: siteConfig.name,
  url: "https://www.evolucengenharia.com.br",
  foundingDate: String(siteConfig.founded),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink-900">
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
