export const siteConfig = {
  name: "Evoluc",
  slogan: "Há 12 anos fazendo parte do futuro de gerações.",
  founded: 2012,
  phone: "(11) 91403-0822",
  whatsapp: "(11) 91403-0822",
  email: "contato@evolucengenharia.com.br",
  address: "Avenida Maria Luiza Americano, 1708 — CEP 08275-000, São Paulo/SP",
  social: {
    instagram: "https://instagram.com/evolucengenharia",
    facebook: "https://facebook.com/evolucengenharia",
    linkedin: "https://linkedin.com/company/evolucengenharia",
    youtube: "https://youtube.com/@evolucengenharia",
  },
};

export function getWhatsappUrl(message: string) {
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/55${digits}?text=${encodeURIComponent(message)}`;
}

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Feirão da Casa Própria", href: "/feirao-da-casa-propria" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Diferenciais", href: "/diferenciais" },
  { label: "Lançamentos", href: "/lancamentos" },
  { label: "Entregues", href: "/entregues" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/fale-conosco" },
];

export const utilityNav: NavItem[] = [
  { label: "Seja um Consultor de Vendas", href: "/seja-um-consultor-de-vendas" },
  { label: "Simular Financiamento", href: "/simular-financiamento" },
];

export const portalNav: NavItem = {
  label: "Área do Morador",
  href: "/area-do-morador",
};
