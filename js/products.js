window.ASTERA_CATEGORIES = [
  { slug: 'financas', label: 'Finanças' },
  { slug: 'negocios', label: 'Negócios' },
  { slug: 'planejamento', label: 'Planejamento' },
  { slug: 'criadores', label: 'Criadores' },
  { slug: 'produtividade', label: 'Produtividade' }
];

window.ASTERA_DEFAULT_FAQ = [
  { q: 'Como recebo o produto?', a: 'Assim que o pagamento é confirmado, o acesso chega no e-mail usado na compra. Como é um produto digital, não há frete nem espera.' },
  { q: 'Posso usar no celular?', a: 'Pode, mas a experiência é mais confortável no computador ou no tablet, onde a tela é maior e tudo cabe de uma vez.' },
  { q: 'Posso ajustar do meu jeito?', a: 'Pode. Você usa o material na sua própria conta e adapta categorias, textos e o que mais fizer sentido para a sua rotina.' },
  { q: 'E se eu tiver dúvida ou problema com o acesso?', a: 'É só escrever pelo e-mail ou pelo Instagram da Ástera. Eu respondo com cuidado e o mais rápido que conseguir.' }
];

window.ASTERA_PRODUCTS = [
  {
    slug: 'planilha-financeira-pessoal',
    name: 'Planilha Financeira Pessoal',
    category: 'financas',
    kind: 'finance',
    featured: true,
    price: 15.00,
    checkoutUrl: 'https://pay.kiwify.com.br/YR7kyiI',
    images: [
      { src: 'assets/products/financeiro.jpeg', alt: 'Painel da Planilha Financeira Pessoal aberto no Google Planilhas, com resumo do mês, receitas e despesas' },
      { src: 'assets/products/financeiro_detalhando.png', alt: 'Detalhe interno da Planilha Financeira Pessoal, mostrando receitas e despesas por categoria e o gráfico de composição do mês' }
    ],
    short: 'Entradas, saídas e metas do mês em um só lugar, com gráficos que mostram para onde o dinheiro está indo.',
    description: 'Uma planilha para enxergar o seu mês com clareza: quanto entrou, quanto saiu e quanto sobrou. Você registra o dia a dia e o painel faz as contas por você — limpo, bonito e possível de entender em poucos minutos.',
    format: 'Google Planilhas',
    features: [
      'Painel do mês com entradas, saídas e saldo',
      'Registro de receitas e despesas por categoria',
      'Gráficos que mostram para onde o dinheiro vai',
      'Espaço para metas e reserva de emergência',
      'Visão do ano inteiro, mês a mês'
    ],
    forWho: 'Para quem quer parar de adivinhar para onde o dinheiro vai — seja começando a se organizar do zero ou cansada de planilhas que ninguém entende. Funciona para quem tem renda fixa, autônoma ou variável.',
    faq: [
      { q: 'Preciso saber usar planilhas?', a: 'Não. Você preenche as informações nos espaços indicados e os resultados aparecem no painel.' },
      { q: 'Preciso ter conta Google?', a: 'Sim. O produto é em Google Planilhas, então você usa com uma conta Google gratuita.' }
    ],
    seo: {
      title: 'Planilha Financeira Pessoal em Google Planilhas | Ástera ✦',
      description: 'Planilha financeira pessoal em Google Planilhas para controlar entradas, saídas e metas do mês com um painel simples e bonito.'
    }
  },
  {
    slug: 'planilha-controle-de-vendas',
    name: 'Controle de Vendas',
    category: 'negocios',
    kind: 'sales',
    featured: true,
    price: 9.90,
    checkoutUrl: 'https://pay.kiwify.com.br/AI4o1HM',
    images: [
      { src: 'assets/products/vendas.jpeg', alt: 'Painel da Planilha de Controle de Vendas aberto no Google Planilhas' }
    ],
    short: 'Registre cada venda, acompanhe o faturamento e veja o que mais sai, sem fórmulas complicadas.',
    description: 'Um lugar só para registrar vendas, acompanhar o faturamento e entender o que está saindo mais. Pensada para pequenos negócios e vendedoras autônomas que querem organização sem depender de sistema caro.',
    format: 'Google Planilhas',
    features: [
      'Registro de vendas com data, produto, valor e forma de pagamento',
      'Faturamento por dia e por mês',
      'Produtos e clientes que mais aparecem',
      'Controle de custos e do que sobra no fim',
      'Painel com o resumo do período'
    ],
    forWho: 'Para quem vende por conta própria — revendedoras, artesãs, criadoras, lojas pequenas — e quer saber, sem esforço, quanto entrou e o que está funcionando.',
    faq: [
      { q: 'Serve para quem vende só por Instagram ou WhatsApp?', a: 'Serve. Você registra cada venda manualmente, do canal que for, e o painel reúne tudo.' },
      { q: 'Preciso ter conta Google?', a: 'Sim. O produto é em Google Planilhas, então você usa com uma conta Google gratuita.' }
    ],
    seo: {
      title: 'Planilha de Controle de Vendas | Ástera ✦',
      description: 'Planilha de controle de vendas em Google Planilhas para pequenos negócios: registre vendas, acompanhe o faturamento e veja o que mais sai.'
    }
  },
  {
    slug: 'planner-2027',
    name: 'Planner 2027',
    star: true,
    category: 'planejamento',
    kind: 'planner',
    featured: true,
    price: 9.90,
    checkoutUrl: 'https://pay.kiwify.com.br/TaXRTV5',
    images: [
      { src: 'assets/products/planner.png', alt: 'Páginas do Planner 2027 da Ástera' }
    ],
    short: 'Metas, meses, semanas e hábitos reunidos em um planner digital pensado para o ano inteiro.',
    description: 'Um planner digital para dar forma a 2027: das metas grandes às tarefas da semana. Visual leve, espaço para respirar e o essencial no lugar certo.',
    format: 'Planner digital',
    features: [
      'Calendário anual e visão de cada mês',
      'Páginas semanais para compromissos e tarefas',
      'Metas do ano com acompanhamento',
      'Rastreador de hábitos',
      'Espaço para anotações e revisão do mês'
    ],
    forWho: 'Para quem gosta de ver o ano no papel — ou na tela — e prefere um planner bonito, sem excesso, que dá vontade de abrir todo dia.',
    faq: [
      { q: 'Posso começar no meio do ano?', a: 'Pode. Você preenche a partir do mês em que estiver e aproveita o restante do planner normalmente.' }
    ],
    seo: {
      title: 'Planner 2027 Digital | Ástera ✦',
      description: 'Planner 2027 digital com metas, visão mensal, semanas e hábitos. Um jeito bonito e simples de organizar o ano.'
    }
  },
  {
    slug: 'astera-creator',
    name: 'Ástera Creator',
    star: true,
    category: 'criadores',
    kind: 'creator',
    featured: true,
    price: 'PRECO_ASTERA_CREATOR',
    cta: 'whatsapp',
    ctaLabel: 'Quero a Ástera Creator',
    checkoutUrl: 'https://wa.me/5514988033974?text',
    images: [
      { src: 'IMAGEM_ASTERA_CREATOR', alt: 'Painel da planilha Ástera Creator aberto no Google Planilhas' }
    ],
    short: 'Calendário de conteúdo, parcerias e resultados de criadora em uma planilha só.',
    description: 'Uma planilha para criadoras e influenciadoras que querem tratar o conteúdo com clareza: o que postar, com quem fechar parceria, o que entrou e o que está funcionando. Tudo em um painel simples, na estética da Ástera.',
    format: 'Google Planilhas',
    features: [
      'Painel com o resumo do mês de conteúdo',
      'Calendário de conteúdo para planejar posts e vídeos',
      'Banco de ideias de conteúdo',
      'Acompanhamento de métricas por plataforma',
      'Controle de parcerias e campanhas com marcas',
      'Registro de receitas, metas e calculadora de valores'
    ],
    forWho: 'Para criadoras de conteúdo, influenciadoras, UGC creators e quem está começando a transformar o perfil em trabalho — e precisa de organização sem virar mais uma tarefa.',
    steps: [
      { title: 'Escolha o produto', text: 'Veja o que acompanha e para quem a Ástera Creator foi pensada.' },
      { title: 'Chame no WhatsApp', text: 'Toque em "Quero a Ástera Creator" e conte que tem interesse.' },
      { title: 'Combine a compra', text: 'Eu envio o valor, a forma de pagamento e como o acesso chega até você.' },
      { title: 'Comece a organizar', text: 'Abra, ajuste do seu jeito e use no ritmo da sua rotina de criadora.' }
    ],
    note: 'Produto digital. Fale comigo no WhatsApp para saber o valor e receber o acesso.',
    useDefaultFaq: false,
    faq: [
      { q: 'Como eu compro a Ástera Creator?', a: 'Toque em "Quero a Ástera Creator" para abrir uma conversa no WhatsApp. Por lá eu passo o valor e combino a forma de pagamento e de entrega.' },
      { q: 'Preciso ter conta Google?', a: 'Sim. O produto é em Google Planilhas, então você usa com uma conta Google gratuita.' },
      { q: 'Serve para quem está começando?', a: 'Serve. Você não precisa ter muitos seguidores nem parcerias para usar: dá para começar só organizando o calendário de conteúdo.' },
      { q: 'E se eu tiver dúvida antes de comprar?', a: 'Pode perguntar direto no WhatsApp, pelo e-mail ou pelo Instagram da Ástera.' }
    ],
    seo: {
      title: 'Ástera Creator: planilha para criadoras de conteúdo | Ástera ✦',
      description: 'Ástera Creator é uma planilha em Google Planilhas para criadoras e influenciadoras organizarem conteúdo, parcerias e resultados.'
    }
  }
];

window.ASTERA_COMING_SOON = [];

window.ASTERA_PROJECTS = [
  {
    name: 'Ástera ✦',
    segment: 'Marca de produtos digitais',
    badge: 'Primeiro projeto',
    kind: 'site',
    image: null,
    description: 'O site oficial da Ástera: loja de planilhas e planners com identidade em lilás e branco, catálogo que cresce sem reconstruir nada e checkout integrado.',
    features: ['Loja com catálogo editável', 'Página de produto reutilizável', 'Layout pensado primeiro para o celular', 'SEO básico e estrutura semântica'],
    url: 'index.html',
    urlLabel: 'Visitar o site'
  }
];
window.ASTERA_PROJECTS_SOON = 2;
