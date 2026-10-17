export type Category =
  | "Matchday"
  | "Atletas"
  | "Campeonatos"
  | "Social / anúncios"
  | "Artes personalizadas"
  | "Identidade"
  | "Social media";
export type Project = {
  id: string;
  title: string;
  category: Category;
  color: string;
  word: string;
  image?: string;
  width?: number;
  height?: number;
  alt: string;
  placeholder: boolean;
};
// Substitua os placeholders por arquivos em public/artworks e defina placeholder: false.
export const conceptProjects: Project[] = [
  {
    id: "01",
    title: "A energia do jogo",
    category: "Matchday",
    color: "blue",
    word: "MATCH\nDAY",
    alt: "Espaço reservado para arte de divulgação de partida",
    placeholder: true,
  },
  {
    id: "02",
    title: "Uma identidade em campo",
    category: "Identidade",
    color: "lime",
    word: "PLAY\nLOUD",
    alt: "Espaço reservado para projeto de identidade esportiva",
    placeholder: true,
  },
  {
    id: "03",
    title: "Além dos 90 minutos",
    category: "Social media",
    color: "orange",
    word: "FULL\nTIME",
    alt: "Espaço reservado para campanha de redes sociais",
    placeholder: true,
  },
  {
    id: "04",
    title: "Feito para competir",
    category: "Matchday",
    color: "silver",
    word: "NEXT\nLEVEL",
    alt: "Espaço reservado para arte esportiva de destaque",
    placeholder: true,
  },
  {
    id: "05",
    title: "O palco da competição",
    category: "Social media",
    color: "night",
    word: "GAME\nON",
    alt: "Espaço reservado para projeto de campeonato",
    placeholder: true,
  },
  {
    id: "06",
    title: "Presença em cada rodada",
    category: "Identidade",
    color: "ice",
    word: "OUR\nTEAM",
    alt: "Espaço reservado para sequência de artes de uma equipe",
    placeholder: true,
  },
];
export const projects: Project[] = [
  {
    id: "estamos-classificados",
    title: "Estamos classificados",
    category: "Campeonatos",
    color: "night",
    word: "",
    image: "/assets/projects/estamos-classificados.jpg",
    width: 1440,
    height: 2560,
    alt: "Arte de classificação para as quartas de final da Talents Cup Sub-18 com quatro atletas.",
    placeholder: false,
  },
  {
    id: "magnus-x-caieiras",
    title: "Magnus x Caieiras",
    category: "Matchday",
    color: "night",
    word: "",
    image: "/assets/projects/magnus-x-caieiras.jpg",
    width: 1170,
    height: 2080,
    alt: "Arte de Magnus x Caieiras pelo Campeonato Paulista, com atleta, escudos e informações da partida.",
    placeholder: false,
  },
  {
    id: "dia-de-mj",
    title: "Dia de MJ",
    category: "Atletas",
    color: "night",
    word: "",
    image: "/assets/projects/dia-de-mj.jpg",
    width: 640,
    height: 1136,
    alt: "Arte Dia de MJ com Murilo Jonas e informações da partida de futsal.",
    placeholder: false,
  },
  {
    id: "dia-de-jogo-bonny-x-bases",
    title: "Dia de jogo (Bonny x Bases)",
    category: "Matchday",
    color: "night",
    word: "",
    image: "/assets/projects/dia-de-jogo-bonny-x-bases.jpeg",
    width: 1024,
    height: 1280,
    alt: "Arte de Bonny x Bases com atleta, escudos, data e local do jogo.",
    placeholder: false,
  },
  {
    id: "juvenas-vs-twister",
    title: "Juvenas vs Twister",
    category: "Matchday",
    color: "night",
    word: "",
    image: "/assets/projects/juvenas-vs-twister.jpg",
    width: 1170,
    height: 2080,
    alt: "Arte de Juvenas vs Twister pelas oitavas de final dos Jogos Abertos, com atleta e informações da partida.",
    placeholder: false,
  },
  {
    id: "contratado",
    title: "Contratado",
    category: "Social / anúncios",
    color: "night",
    word: "",
    image: "/assets/projects/contratado.jpg",
    width: 1170,
    height: 2080,
    alt: "Arte de anúncio de contratação de atleta pelo Ibiporã Futsal.",
    placeholder: false,
  },
  {
    id: "confirmados-supercopa-juvenas",
    title: "Confirmados Supercopa Juvenas",
    category: "Campeonatos",
    color: "night",
    word: "",
    image: "/assets/projects/confirmados-supercopa-juvenas.jpg",
    width: 1170,
    height: 2080,
    alt: "Arte de confirmação do Juvenas na Supercopa, com atletas diante de um estádio ao pôr do sol.",
    placeholder: false,
  },
];
export const heroProjectIds = [
  "estamos-classificados",
  "magnus-x-caieiras",
  "dia-de-mj",
  "dia-de-jogo-bonny-x-bases",
  "juvenas-vs-twister",
  "contratado",
] as const;
export const featuredHeroProjects = heroProjectIds.map((id) =>
  projects.find((project) => project.id === id)!,
);
export const featuredPortfolioProjects = projects;
export const portfolioCategories = [
  ...new Set(projects.map((project) => project.category)),
];
