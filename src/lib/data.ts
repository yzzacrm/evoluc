export type FloorPlan = {
  label: string;
  image: string;
};

export type ProgressStage = {
  stage: string;
  percent: number;
};

export type Development = {
  slug: string;
  name: string;
  status: "lancamento" | "em-obras" | "entregue";
  neighborhood: string;
  city: string;
  address?: string;
  landArea: string;
  units: number;
  parkingSpots: number;
  typologies: string;
  tagline: string;
  description: string;
  highlights: string[];
  amenities: string[];
  heroImage: string;
  gallery?: string[];
  plans?: FloorPlan[];
  progress?: ProgressStage[];
  tour3dUrl?: string;
  soldOut?: boolean;
  constructionVideo?: { src: string; poster?: string };
  advancedConstructionVideo?: { src: string; poster?: string };
  heroVideo?: { src: string; poster?: string };
  story?: { title: string; paragraphs: string[] };
  promoBadge?: string;
};

export const developments: Development[] = [
  {
    slug: "terras-raras-vila-carrao",
    name: "Terras Raras Vila Carrão",
    status: "em-obras",
    heroVideo: {
      src: "/videos/lp-terras-raras-hero.mp4",
      poster: "/videos/lp-terras-raras-hero-poster.jpg",
    },
    neighborhood: "Vila Carrão",
    city: "São Paulo/SP",
    address: "Rua Doutor Jaci Barbosa, 228 — Vila Carrão, São Paulo/SP",
    landArea: "2.129 m²",
    units: 176,
    parkingSpots: 93,
    typologies: "1, 2 e 3 quartos",
    tagline: "Apartamentos de 1, 2 e 3 quartos, em obras no centro da Vila Carrão.",
    description:
      "Em um terreno de 2.129 m², o Terras Raras Vila Carrão reúne 176 unidades de 1, 2 e 3 quartos em um dos bairros mais consolidados da Zona Leste. São mais de 600 m² de lazer, plantas bem resolvidas e uma localização que deixa comércio, escolas e vias de acesso perto de você.",
    highlights: [
      "Mais de 600 m² de área de lazer",
      "Plantas bem resolvidas, de 1 a 3 quartos",
      "Um dos maiores terrenos já desenvolvidos pela Evoluc",
      "176 unidades para diferentes perfis de família",
      "93 vagas de garagem",
      "Bairro consolidado, perto de shoppings e do transporte público",
    ],
    amenities: [
      "Portaria 24h com controle de acesso",
      "Piscina adulto e infantil",
      "Salão de festas com espaço gourmet",
      "Academia equipada",
      "Playground e brinquedoteca",
      "Quadra poliesportiva",
      "Coworking",
      "Espaço pet",
      "Bicicletário",
    ],
    heroImage: "/images/developments/terras-raras-vila-carrao/gallery-01-fachada-diurna.jpg",
    gallery: [
      "/images/developments/terras-raras-vila-carrao/gallery-01-fachada-diurna.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-02-fachada-noturna.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-03-piscina.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-04-mini-mercado.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-05-lavanderia.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-06-spa.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-07-brinquedoteca.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-08-salao-jogos.jpg",
      "/images/developments/terras-raras-vila-carrao/gallery-09-playground.jpg",
    ],
    plans: [
      { label: "Apto | 32,97 m²", image: "/images/developments/terras-raras-vila-carrao/plans/32-97.jpg" },
      { label: "Apto | 43,65 m²", image: "/images/developments/terras-raras-vila-carrao/plans/43-65.jpg" },
      { label: "Apto | 44,25 m²", image: "/images/developments/terras-raras-vila-carrao/plans/44-25.jpg" },
      { label: "Apto | 45,87 m² c/ 1 suíte", image: "/images/developments/terras-raras-vila-carrao/plans/45-87-suite.jpg" },
      { label: "Apto Garden | 78,64 m²", image: "/images/developments/terras-raras-vila-carrao/plans/garden-78-64.jpg" },
    ],
    // PLACEHOLDER: sem percentuais reais de andamento ainda — envie os
    // números atuais de cada etapa para exibirmos "Acompanhe a obra" aqui.
    constructionVideo: {
      src: "/videos/obras/terras-raras-obras-avancadas.mp4",
      poster: "/videos/obras/terras-raras-obras-avancadas-poster.jpg",
    },
    advancedConstructionVideo: {
      src: "/videos/obras/terras-raras-obra.mp4",
      poster: "/videos/obras/terras-raras-obra-poster.jpg",
    },
  },
];

export const deliveredExamples: Development[] = [
  {
    slug: "oberon-itaquera",
    name: "Oberon Itaquera",
    status: "entregue",
    soldOut: true,
    neighborhood: "Itaquera",
    city: "São Paulo/SP",
    landArea: "640 m²",
    units: 81,
    parkingSpots: 38,
    typologies: "Studio, 1 e 2 quartos",
    tagline: "Entregue e 100% vendido. O primeiro da região com piscina no rooftop.",
    description:
      "Arquitetura moderna, ambientes bem dimensionados e soluções de tecnologia que otimizam cada metro. O Oberon Itaquera foi o primeiro da região com piscina no rooftop. Está a poucos metros do Shopping Metrô Itaquera, o maior centro de compras do bairro, das estações de metrô e CPTM, da Fatec, da Etec, do Sesi e de universidades, com acesso fácil às rodovias estaduais e interestaduais e ao litoral paulista. Por perto ficam o Parque do Carmo, a Arena Neo Química, o Sesc e o Aquário de Itaquera, além do Shopping Aricanduva e do Hospital Santa Marcelina. Entregue com 100% das unidades vendidas, é um retrato do padrão de construção e acabamento da Evoluc.",
    highlights: [
      "100% das unidades vendidas",
      "Unidades com 0 ou 1 vaga de garagem",
      "Cozinha e área de serviço com ventilação natural",
      "Gerador de emergência nas áreas comuns",
      "Estrutura em concreto armado",
      "Varanda integrada, com pontos para ar-condicionado",
      "Terraço com piso no mesmo nível da sala",
      "Janelas com persianas integradas",
      "Banheiros com ventilação natural",
      "Varanda com ponto para churrasqueira elétrica tipo grill",
    ],
    amenities: [
      "Portaria com controle de acesso",
      "Piscina no rooftop, a primeira da região",
      "Espaço gourmet no rooftop",
      "Salão de festas",
      "Playground",
      "Bicicletário",
      "Gerador de emergência",
    ],
    heroImage: "/images/developments/oberon-itaquera/gallery-17-fachada-pronta.jpg",
    gallery: [
      "/images/developments/oberon-itaquera/gallery-17-fachada-pronta.jpg",
      "/images/developments/oberon-itaquera/gallery-15-vista-aerea.jpg",
      "/images/developments/oberon-itaquera/gallery-16-vista-aerea.jpg",
      "/images/developments/oberon-itaquera/gallery-14-piscina-rooftop.jpg",
      "/images/developments/oberon-itaquera/gallery-13-cozinha.jpg",
      "/images/developments/oberon-itaquera/gallery-11-academia.jpg",
      "/images/developments/oberon-itaquera/gallery-12-academia-pesos.jpg",
      "/images/developments/oberon-itaquera/gallery-01-abertura.jpg",
      "/images/developments/oberon-itaquera/gallery-02-decorado.png",
      "/images/developments/oberon-itaquera/gallery-03.png",
      "/images/developments/oberon-itaquera/gallery-04.png",
      "/images/developments/oberon-itaquera/gallery-05.png",
      "/images/developments/oberon-itaquera/gallery-06.png",
    ],
    plans: [
      { label: "Studio | 27 m²", image: "/images/developments/oberon-itaquera/plans/studio-27.png" },
      { label: "1 Dorm | 32 m²", image: "/images/developments/oberon-itaquera/plans/1dorm-32.jpg" },
      { label: "1 Dorm | 37 m²", image: "/images/developments/oberon-itaquera/plans/1dorm-37.jpg" },
      { label: "2 Dorm | 52,5 m²", image: "/images/developments/oberon-itaquera/plans/2dorm-52-a.png" },
      { label: "2 Dorm | 59,6 m²", image: "/images/developments/oberon-itaquera/plans/2dorm-59.png" },
      { label: "Pavimento térreo", image: "/images/developments/oberon-itaquera/plans/site-terreo.png" },
      { label: "Pavimento tipo", image: "/images/developments/oberon-itaquera/plans/site-tipo.png" },
      { label: "Lazer / rooftop", image: "/images/developments/oberon-itaquera/plans/site-rooftop.png" },
    ],
    progress: [
      { stage: "Fundação", percent: 100 },
      { stage: "Estruturação", percent: 100 },
      { stage: "Alvenaria", percent: 100 },
      { stage: "Acabamento interno", percent: 100 },
      { stage: "Fachada", percent: 100 },
      { stage: "Pintura", percent: 100 },
    ],
    tour3dUrl: "https://meunegocio360.github.io/oberonitaquera/",
    constructionVideo: {
      src: "/videos/obras/oberon-obra.mp4",
      poster: "/videos/obras/oberon-obra-poster.jpg",
    },
    story: {
      title: "A história por trás do nome",
      paragraphs: [
        "O Residencial Oberon é um monumento à palavra dada. A negociação do terreno foi longa e difícil. Para selar a confiança com o proprietário, um homem de muita história, a Evoluc fez mais do que uma proposta de negócio. Firmou um pacto de honra: o empreendimento levaria o sobrenome da família dele, Oberon.",
        "O Sr. Oberon não chegou a ver a obra concluída. Partiu meses antes, mas o legado ficou. Tempo depois, a filha dele visitou o local e, ao ler \"Residencial Oberon\" gravado na estrutura, seus olhos se encheram de lágrimas. Ali ela não viu um prédio. Viu o nome do pai, para sempre.",
      ],
    },
  },
  {
    // PLACEHOLDER: ainda faltam área do terreno, nº de unidades, vagas,
    // tipologias e descrição detalhada — envie para completarmos.
    slug: "vista-livre",
    name: "Vista Livre",
    status: "entregue",
    soldOut: true,
    neighborhood: "Parque do Carmo",
    city: "São Paulo/SP",
    landArea: "—",
    units: 0,
    parkingSpots: 0,
    typologies: "—",
    tagline: "Entregue e 100% vendido, na região do Parque do Carmo.",
    description:
      "Um empreendimento Evoluc na região do Parque do Carmo, Zona Leste de São Paulo, entregue com 100% das unidades vendidas.",
    highlights: ["100% das unidades vendidas"],
    amenities: [],
    heroImage: "/images/developments/vista-livre/gallery-01-fachada-aerea.jpg",
    gallery: ["/images/developments/vista-livre/gallery-01-fachada-aerea.jpg"],
    constructionVideo: {
      src: "/videos/obras/vista-livre-obra.mp4",
      poster: "/videos/obras/vista-livre-obra-poster.jpg",
    },
  },
];

export type Testimonial = {
  name: string;
  development: string;
  quote: string;
};

// PLACEHOLDER: depoimentos ilustrativos de estrutura — substituir por
// depoimentos reais de moradores (com autorização de uso de imagem/nome).
export const testimonials: Testimonial[] = [
  {
    name: "Morador(a) — [nome a confirmar]",
    development: "Empreendimento entregue",
    quote:
      "Espaço reservado para o depoimento de um morador sobre a compra, o acompanhamento da obra e a entrega das chaves.",
  },
  {
    name: "Morador(a) — [nome a confirmar]",
    development: "Empreendimento entregue",
    quote:
      "Espaço reservado para o depoimento de um morador sobre o atendimento comercial, o acabamento e o suporte depois da entrega.",
  },
  {
    name: "Morador(a) — [nome a confirmar]",
    development: "Empreendimento entregue",
    quote:
      "Espaço reservado para o depoimento de um morador sobre a Área do Morador e a comunicação durante a obra.",
  },
];

export type Differential = {
  title: string;
  description: string;
};

export const differentials: Differential[] = [
  {
    title: "Certificação PBQP-H",
    description:
      "Processos construtivos avaliados pelo Programa Brasileiro de Qualidade e Produtividade do Habitat, com padronização e controle de qualidade em cada etapa.",
  },
  {
    title: "Obra acompanhada de perto",
    description:
      "Cronograma físico-financeiro acompanhado e comunicação direta com você durante toda a construção, com atualizações na Área do Morador.",
  },
  {
    title: "Localização estratégica",
    description:
      "Terrenos escolhidos pela proximidade com transporte público, comércio e serviços, para que você se desloque com facilidade.",
  },
  {
    title: "Atendimento pós-entrega",
    description:
      "Um canal dedicado à assistência técnica, à garantia e ao suporte depois que você recebe as chaves.",
  },
  {
    title: "Plantas para o dia a dia",
    description:
      "Layouts estudados para aproveitar bem o espaço, favorecer a ventilação natural e dar função clara a cada ambiente.",
  },
  {
    title: "Relações de longo prazo",
    description:
      "Desde 2012, construímos relações duradouras com clientes, corretores parceiros e fornecedores.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "minha-casa-minha-vida-classe-media",
    title:
      "Minha Casa, Minha Vida para a classe média: como funciona",
    excerpt:
      "Famílias com renda de até R$ 12 mil podem financiar imóveis novos ou usados de até R$ 500 mil pelo programa. Veja as condições.",
    content: [
      "As famílias com renda mensal bruta de até R$ 12 mil já podem ingressar na faixa de Classe Média do programa Minha Casa, Minha Vida, com condições facilitadas de financiamento para imóveis novos ou usados.",
      "Entre os principais pontos do programa estão taxas de juros mais competitivas em relação ao financiamento tradicional, prazos estendidos de pagamento e a possibilidade de uso do FGTS na composição da entrada.",
      "Antes de simular seu financiamento, reúna documentos como comprovante de renda, extrato do FGTS e certidões atualizadas. Nossa equipe comercial pode orientar sobre qual faixa se aplica ao seu perfil.",
    ],
    date: "2025-06-26",
    readTime: "4 min",
    category: "Financiamento",
    image: "/images/developments/terras-raras-vila-carrao/gallery-01-fachada-diurna.jpg",
  },
  {
    slug: "como-escolher-metragem-ideal-apartamento",
    title: "Como escolher a metragem certa para o seu apartamento",
    excerpt:
      "Studio, 1, 2 ou 3 quartos. Os critérios que ajudam a escolher a planta adequada ao seu momento de vida.",
    content: [
      "A escolha da metragem de um apartamento vai além do preço por metro quadrado: envolve rotina, número de moradores, perspectiva de crescimento da família e uso dos ambientes comuns do condomínio.",
      "Studios e apartamentos de 1 quarto costumam atender bem quem busca praticidade e proximidade com regiões centrais ou bem servidas de transporte. Já plantas de 2 e 3 quartos favorecem famílias que precisam de espaços separados para descanso, trabalho remoto e convivência.",
      "Ao visitar o decorado ou analisar a planta, avalie a circulação entre ambientes, a entrada de luz natural e a disposição dos armários — esses detalhes fazem diferença no dia a dia.",
    ],
    date: "2025-07-14",
    readTime: "5 min",
    category: "Guia do Comprador",
    image: "/images/developments/oberon-itaquera/gallery-13-cozinha.jpg",
  },
  {
    slug: "o-que-observar-durante-acompanhamento-de-obra",
    title: "Acompanhamento de obra: o que observar em cada etapa",
    excerpt:
      "Conheça as fases da construção e veja como a Área do Morador ajuda você a acompanhar cada uma delas.",
    content: [
      "Do lançamento à entrega das chaves, uma obra passa por etapas como fundação, estrutura, alvenaria, instalações e acabamento. Cada uma tem prazos e marcos próprios dentro do cronograma físico-financeiro.",
      "Acompanhar essas etapas ajuda o comprador a entender o andamento do investimento e planejar mudanças, financiamento e reformas com antecedência.",
      "Na Evoluc, clientes acompanham fotos, relatórios e marcos da obra diretamente pela Área do Morador, com atualizações periódicas da equipe de engenharia.",
    ],
    date: "2025-08-02",
    readTime: "4 min",
    category: "Obra",
    image: "/images/developments/oberon-itaquera/gallery-07-obra.jpeg",
  },
];

export const financingFaq = [
  {
    question: "Como funcionam as faixas do Minha Casa, Minha Vida?",
    answer:
      "O programa é dividido em 4 faixas de renda familiar mensal, cada uma com taxa de juros e subsídio diferentes: quanto menor a renda, menor a taxa de juros e maior o subsídio. Nosso simulador identifica automaticamente sua faixa a partir da renda informada.",
  },
  {
    question: "Quais documentos preciso para simular o financiamento?",
    answer:
      "RG, CPF, comprovante de renda dos últimos 3 meses, comprovante de residência e extrato do FGTS (se for utilizá-lo na entrada).",
  },
  {
    question: "Posso usar o FGTS na entrada?",
    answer:
      "Sim, dentro das regras vigentes do seu enquadramento no financiamento habitacional, o saldo do FGTS pode compor parte da entrada ou amortizar o saldo devedor.",
  },
  {
    question: "Todo mundo tem direito ao subsídio do governo?",
    answer:
      "Não. O subsídio é maior para as faixas de renda mais baixas (Faixas 1 e 2) e não está disponível para as Faixas 3 e 4 — que contam, em compensação, com taxas de juros menores que o financiamento tradicional.",
  },
  {
    question: "A simulação no site já é uma aprovação de crédito?",
    answer:
      "Não. A simulação é uma estimativa inicial com base nas regras públicas do programa. A aprovação definitiva, a faixa exata e o subsídio real dependem de análise de crédito junto à Caixa ou instituição financeira.",
  },
];
