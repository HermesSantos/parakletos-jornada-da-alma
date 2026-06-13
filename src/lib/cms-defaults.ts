import type { LandingContent, ThemeSettings } from "@/lib/cms-types";

import heroBg from "@/assets/BetterImage_1780666592138.jpeg";
import escolhaCaminho from "@/assets/escolha-caminho.webp";
import jornadaDaMulher from "@/assets/jornada_da_mulher.jpeg";
import jornadaDoHomem from "@/assets/jornada_do_homem.jpeg";
import jornadaDoCasal from "@/assets/jornada_do_casal.jpeg";
import metodoParakletos from "@/assets/metodo_parakletos.jpeg";
import moduloBussola from "@/assets/modulo_1.jpeg";
import socialProofImage1 from "@/assets/parakletos_prova_1.jpeg";
import socialProofImage2 from "@/assets/parakletos_prova_2.jpeg";
import socialProofImage3 from "@/assets/depoimento.jpeg";

export const defaultLandingContent: LandingContent = {
  hero: {
    eyebrow: "Desenvolvimento Pessoal & Libertação Interior",
    headline: [
      { text: "Consciência gera ", highlight: "cura" },
      { text: "Cura gera ", highlight: "libertação" },
      { text: "Libertação gera ", highlight: "governo" },
    ],
    subtext:
      "Duas jornadas de transformação — uma para a mulher, outra para o homem. Escolha o caminho que Deus preparou para você.",
    bullets: "• Consciência • Cura • Libertação • Governo •",
    ctas: [
      { label: "Jornada da Mulher", href: "#jornada-mulher", variant: "primary" },
      { label: "Jornada do Homem", href: "#jornada-homem", variant: "secondary" },
      { label: "Ver planos e valores", href: "#planos", variant: "link" },
    ],
    backgroundImageUrl: heroBg,
  },
  header: {
    brand: "Inst. Parakletos",
    nav: [
      { label: "Jornadas", href: "/#jornadas" },
      { label: "Método", href: "/#metodo" },
      { label: "Planos", href: "/#planos" },
      { label: "FAQ", href: "/#faq" },
      { label: "Sobre nós", href: "/sobre", type: "route" },
    ],
    studentAreaLabel: "Área do Aluno",
    ctaLabel: "Começar agora",
    ctaHref: "/#planos",
  },
  courses: {
    title: "Escolha sua jornada",
    titleHighlight: "jornada",
    subtitle:
      "Trilhas de desenvolvimento pessoal com um mesmo propósito: restauração e governo interior.",
    courses: [
      {
        id: "jornada-mulher",
        title: "Jornada da Mulher",
        subtitle: "Bússola da Alma",
        description:
          "7 dias para despertar a filha, restaurar a mulher e posicionar-se com governo interior.",
        href: "#jornada-mulher",
        imageUrl: jornadaDaMulher,
        highlight: false,
        disabled: false,
      },
      {
        id: "jornada-homem",
        title: "Jornada do Homem",
        subtitle: "Bússola do Homem",
        description:
          "7 dias para despertar o sacerdote, fortalecer o guerreiro e estabelecer o rei interior.",
        href: "#jornada-homem",
        imageUrl: jornadaDoHomem,
        highlight: true,
        disabled: false,
      },
      {
        id: "jornada-casal",
        title: "Alinhamento do Casal",
        subtitle: "Bússola da Alma",
        description:
          "Uma jornada para casais alinharem aliança, propósito e governo espiritual a dois.",
        href: "#jornada-casal",
        imageUrl: escolhaCaminho,
        highlight: false,
        disabled: true,
      },
    ],
  },
  method: {
    eyebrow: "Guia Oficial da Jornada",
    title: "Método Parakletos",
    titleHighlight: "Parakletos",
    description:
      "O método que governa todo o curso — uma arquitetura espiritual de 7 semanas para conduzir você da consciência ao governo interior, com estrutura, profundidade e propósito.",
    processLabel: "7 semanas para",
    processSteps: ["Despertar", "Curar", "Avivar sua essência"],
    callout: "Governar a sua própria vida!",
    pillarsLabel: "Os quatro pilares do método",
    footerText: "Instituto Parakletos",
    imageUrl: metodoParakletos,
    pillars: [
      { numeral: "I", icon: "Compass", title: "Bússola da Alma", subtitle: "Consciência", description: "Desperte quem você nasceu para ser." },
      { numeral: "II", icon: "Droplets", title: "Águas Profundas", subtitle: "Cura", description: "Cure sua história e restaure sua alma." },
      { numeral: "III", icon: "Flame", title: "Avivamento da Alma", subtitle: "Libertação", description: "Levante-se na sua verdadeira identidade." },
      { numeral: "IV", icon: "Sprout", title: "Solo Sagrado", subtitle: "Governo", description: "Construa uma vida com propósito e direção." },
    ],
  },
  journeys: {
    woman: {
      eyebrow: "Bússola da Alma",
      title: "Jornada da Mulher",
      titleHighlight: "Mulher",
      description:
        "Uma trilha de 7 dias desenhada para a mulher que deseja despertar sua identidade, curar feridas profundas e assumir o governo da própria vida com propósito.",
      ctaLabel: "Escolher este caminho",
      ctaHref: "#planos",
      imageUrl: jornadaDaMulher,
      days: [
        { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "A Filha Desperta", emoji: "📜" },
        { day: "Dia 2", title: "Identidade & Cura Interior", subtitle: "A Mulher Restaurada", emoji: "🔥" },
        { day: "Dia 3", title: "Cura & Libertação", subtitle: "A Mulher Livre", emoji: "🌊" },
        { day: "Dia 4", title: "Direção & Discernimento", subtitle: "A Mulher Prudente", emoji: "🧭" },
        { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "A Mulher de Aliança", emoji: "👑" },
        { day: "Dia 6", title: "Propósito & Alinhamento", subtitle: "A Mulher de Propósito", emoji: "✨" },
        { day: "Dia 7", title: "Governo & Decisão", subtitle: "A Mulher Posicionada", emoji: "👑" },
      ],
    },
    man: {
      eyebrow: "Bússola do Homem",
      title: "Jornada do Homem",
      titleHighlight: "Homem",
      description:
        "Uma trilha de 7 dias para o homem que busca despertar o sacerdote interior, fortalecer o guerreiro e estabelecer o rei com responsabilidade e propósito.",
      ctaLabel: "Escolher este caminho",
      ctaHref: "#planos",
      imageUrl: jornadaDoHomem,
      days: [
        { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "Sacerdote", emoji: "🔥" },
        { day: "Dia 2", title: "Identidade & Verdade", subtitle: "Guerreiro Interior", emoji: "🛡️" },
        { day: "Dia 3", title: "Domínio & Maturidade Emocional", subtitle: "Guerreiro Maduro", emoji: "🔒" },
        { day: "Dia 4", title: "Discernimento & Posicionamento", subtitle: "Guerreiro Estratégico", emoji: "🧭" },
        { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "Rei em Formação", emoji: "👑" },
        { day: "Dia 6", title: "Propósito & Missão", subtitle: "Rei Responsável", emoji: "✨" },
        { day: "Dia 7", title: "Governo & Decisão", subtitle: "Rei Estabelecido", emoji: "👑" },
      ],
    },
    couple: {
      eyebrow: "Bússola da Alma",
      title: "Alinhamento do Casal",
      titleHighlight: "Casal",
      tagline: "Quando dois se alinham ao Céu, o destino muda.",
      description:
        "Uma jornada pensada para casais que desejam restaurar a aliança, alinhar propósitos e exercer governo espiritual juntos — construindo um caminho de transformação a dois.",
      pillars: ["Aliança", "Propósito", "Governo Espiritual"],
      comingSoonTitle: "Esta jornada ainda acontecerá",
      comingSoonDescription:
        "Estamos preparando o conteúdo do Alinhamento do Casal. Em breve você poderá iniciar essa trilha de transformação a dois.",
      ctaLabel: "Indisponível no momento",
      imageUrl: jornadaDoCasal,
      comingSoon: true,
    },
  },
  features: {
    title: "O que você vai receber",
    titleHighlight: "receber",
    subtitle: "Material completo e método estruturado para sua transformação interior.",
    eyebrow: "Módulo 1",
    moduleTitle: "Bússola da Alma",
    moduleTitleHighlight: "Alma",
    description:
      "Uma jornada de 7 dias para despertar quem você nasceu para ser. O método que guia você ao governo interior, combinando consciência espiritual, identidade, cura e propósito.",
    benefits: [
      "7 dias de conteúdo estruturado",
      "Exercícios práticos diários",
      "Adaptado à Jornada da Mulher ou do Homem",
      "Material em PDF para download",
    ],
    ctaLabel: "Ver Planos",
    ctaHref: "#planos",
    imageUrl: moduloBussola,
  },
  social_proof: {
    title: "Quando a jornada encontra a vida real",
    titleHighlight: "vida real",
    subtitle:
      "Esse tipo de resposta mostra o que a Jornada da Alma produz na prática: mais consciência, retorno aos princípios e direção para seguir com intencionalidade.",
    points: [
      { icon: "Compass", title: "Mais clareza", description: "Direção para decisões que antes pareciam confusas." },
      { icon: "HeartHandshake", title: "Cura com raiz", description: "Princípios que tocam a história e reorganizam o caminho." },
      { icon: "Sparkles", title: "Transformação prática", description: "A experiência sai do conteúdo e alcança a vida real." },
    ],
    testimonials: [
      { imageUrl: socialProofImage1, alt: "Depoimento no WhatsApp sobre a Jornada da Alma e a Bússola da Alma" },
      { imageUrl: socialProofImage2, alt: "Segundo depoimento no WhatsApp sobre a experiência com a Jornada da Alma" },
      { imageUrl: socialProofImage3, alt: "Terceiro depoimento no WhatsApp sobre a experiência com a Jornada da Alma" },
    ],
  },
  pricing: {
    title: "Escolha seu nível de transformação",
    titleHighlight: "transformação",
    subtitle: "Três planos. Um mesmo propósito. Transformação com estrutura, profundidade e propósito.",
    footerNote:
      "Todos os planos incluem acesso à jornada escolhida — Jornada da Mulher ou Jornada do Homem.",
    bankInfo: [
      { label: "Banco", value: "336 - Banco C6 S.A." },
      { label: "Agência", value: "0001" },
      { label: "Conta corrente", value: "41186179-4" },
      { label: "CNPJ", value: "64.693.004/0001-85" },
      { label: "Nome", value: "PARAKLETOS INOVA SIMPLES (I.S.)" },
      { label: "Chave Pix", value: "64.693.004/0001-85" },
    ],
    plans: [
      {
        name: "Bússola Essencial",
        subtitle: "Fundamento Individual",
        price: "R$ 70",
        originalPrice: null,
        features: ["Manual Completo em PDF", "Método Estruturado", "Exercícios Práticos", "Acesso Imediato"],
        cta: "Comece sua Jornada",
        highlight: false,
        bonus: null,
        qrCodeUrl:
          "https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=https%3A%2F%2Fcobranca.c6pix.com.br%2F01KJ952MWTK25BAHNQVHJ1BJV8",
      },
      {
        name: "Bússola Coletiva",
        subtitle: "7 Dias de Alinhamento",
        price: "R$ 700",
        originalPrice: null,
        features: ["Manual Aprofundado", "3 Encontros ao Vivo", "7 Dias de Direcionamento", "Vagas Limitadas"],
        cta: "Viva a Experiência",
        highlight: true,
        bonus: null,
        qrCodeUrl:
          "https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=https%3A%2F%2Fcobranca.c6pix.com.br%2F01KJ95Q5XS45JPZR3JXN8YAS0T",
      },
      {
        name: "Bússola Imersiva",
        subtitle: "Mentoria Individual",
        price: "R$ 1.400",
        originalPrice: "R$ 7.000",
        features: ["7 Encontros", "Plano Estratégico", "Acompanhamento Personalizado", "Kit Exclusivo"],
        cta: "Edição Fundadora",
        highlight: false,
        bonus: "Bônus: Encontro Presencial em BC",
        qrCodeUrl:
          "https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=https%3A%2F%2Fcobranca.c6pix.com.br%2F01KJ95RC5W23G3MZCJAKW8ATPM",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    titleHighlight: "frequentes",
    subtitle: "Tire suas dúvidas antes de iniciar sua jornada de transformação.",
    faqs: [
      {
        question: "Como funciona a jornada de 7 dias?",
        answer:
          "Cada jornada é estruturada em 7 dias com temas específicos — do despertar espiritual ao governo interior. Você recebe o material em PDF com exercícios práticos diários e pode seguir no seu ritmo, com acompanhamento conforme o plano escolhido.",
      },
      {
        question: "Qual a diferença entre a Jornada da Mulher e a Jornada do Homem?",
        answer:
          "Ambas seguem o mesmo método Parakletos (Consciência, Cura, Libertação e Governo), mas com linguagem, arquétipos e exercícios adaptados à experiência feminina ou masculina.",
      },
      {
        question: "Posso fazer as duas jornadas?",
        answer:
          "Sim. Cada jornada é independente e pode ser adquirida separadamente.",
      },
      {
        question: "Como recebo o material após o pagamento?",
        answer:
          "Após a confirmação do pagamento via Pix, nossa equipe entrará em contato por e-mail com as instruções de acesso ao material.",
      },
      {
        question: "Quais são as formas de pagamento?",
        answer: "Aceitamos pagamento via Pix.",
      },
      {
        question: "Existe garantia?",
        answer:
          "Sim. Você tem 7 dias após a compra para solicitar reembolso caso não fique satisfeito.",
      },
    ],
  },
  footer: {
    address: "Balneário Camboriú, SC",
    hoursTitle: "Horário",
    hours: ["Segunda-feira — Sexta-feira", "8h — 18h"],
    subscribersTitle: "Assinantes",
    studentAreaLabel: "Área do Aluno",
    email: "parakletosconsultoriaeinovacao@gmail.com",
    instagram: "@institutoparakletos_",
    instagramUrl: "https://instagram.com/institutoparakletos_",
    brand: "Instituto Parakletos",
    copyright: "Exo Code - Todos os direitos reservados.",
  },
};

export const defaultThemeSettings: ThemeSettings = {
  light: {
    "--primary": "218 40% 32%",
    "--gold": "38 55% 55%",
    "--gold-light": "38 50% 75%",
    "--forest": "150 30% 25%",
    "--forest-deep": "150 35% 15%",
    "--accent": "38 55% 55%",
    "--hero-overlay":
      "linear-gradient(to bottom, hsla(220, 30%, 10%, 0.3) 0%, hsla(220, 20%, 10%, 0.45) 50%, hsla(220, 20%, 10%, 0.65) 100%)",
  },
  dark: {
    "--primary": "215 55% 58%",
    "--gold": "38 55% 58%",
    "--gold-light": "38 45% 70%",
    "--forest": "150 25% 35%",
    "--forest-deep": "150 30% 8%",
    "--accent": "38 55% 55%",
    "--hero-overlay":
      "linear-gradient(to bottom, hsla(150, 25%, 5%, 0.5) 0%, hsla(150, 20%, 5%, 0.65) 50%, hsla(150, 20%, 5%, 0.8) 100%)",
  },
};

export const editableThemeTokens = [
  { key: "--primary", label: "Cor primária" },
  { key: "--gold", label: "Dourado" },
  { key: "--gold-light", label: "Dourado claro" },
  { key: "--forest", label: "Verde floresta" },
  { key: "--forest-deep", label: "Verde profundo" },
  { key: "--accent", label: "Destaque" },
  { key: "--hero-overlay", label: "Overlay do hero (CSS)" },
] as const;
