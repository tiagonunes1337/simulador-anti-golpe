import type { ReactNode } from "react";

export type LevelId = number;

export type Choice = {
  label: string;
  correct: boolean;
  /** Acerto com ressalva: feedback verde, mas com ícone e etiqueta de alerta. */
  partial?: boolean;
  /** Título opcional do feedback; quando ausente, usa o título padrão do resultado. */
  title?: string;
  feedback: string;
};

export type Difficulty = "Fácil" | "Médio" | "Difícil" | "Muito Difícil" | "Especialista";

type Avatar = { photo: string } | { initials: string; color: string };

export type Mockup =
  | {
      kind: "whatsapp";
      name: string;
      subtitle: string;
      avatar: Avatar;
      time: string;
      message?: ReactNode;
      attachment?: { name: string; detail: string };
      audio?: { duration: string; transcript: string };
    }
  | { kind: "sms"; sender: string; time: string; message: ReactNode }
  | {
      kind: "call";
      caller: string;
      number: string;
      icon: "bank" | "headset";
      duration: string;
      speech: ReactNode;
    }
  | { kind: "scene"; scene: "machine" | "atm"; speaker: string; role: string; speech: ReactNode }
  | { kind: "wifi"; place: string; networks: { name: string; note: string }[]; context: ReactNode };

export type Level = {
  id: LevelId;
  difficulty: Difficulty;
  title: string;
  description: string;
  kicker: string;
  heading: string;
  intro: string;
  question: string;
  tip: string;
  mockupLabel: string;
  mockup: Mockup;
  choices: Choice[];
  signsTitle: string;
  signs: { icon: string; title: string; text: string }[];
  goldenRule: string;
};

export const difficultyColor: Record<Difficulty, string> = {
  Fácil: "green",
  Médio: "amber",
  Difícil: "red",
  "Muito Difícil": "purple",
  Especialista: "navy",
};

const familyPhoto =
  "https://images.unsplash.com/photo-1758598737810-7489fde716af?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixlib=rb-4.1.0&q=80&w=120";
const grandsonPhoto =
  "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixlib=rb-4.1.0&q=80&w=120";

export const levels: Level[] = [
  {
    id: 1,
    difficulty: "Fácil",
    title: "WhatsApp do Falso Parente",
    description: "Aprenda a reconhecer pedidos urgentes enviados de um número novo.",
    kicker: "Nível 1 · WhatsApp",
    heading: "Observe a mensagem com atenção",
    intro: "Imagine que esta mensagem chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "Eu conheço este número? Por que tanta urgência?",
    mockupLabel:
      "Simulação de conversa no WhatsApp: mensagem de número desconhecido dizendo 'Oi mãe, troquei de número! Preciso pagar uma conta urgente hoje, faz um Pix de R$ 850 pra mim?'",
    mockup: {
      kind: "whatsapp",
      name: "+55 11 98765-4321",
      subtitle: "número desconhecido",
      avatar: { photo: familyPhoto },
      time: "09:41",
      message: (
        <>
          Oi mãe, troquei de número! Preciso pagar uma conta urgente hoje, faz um Pix de{" "}
          <strong>R$ 850</strong> pra mim?
        </>
      ),
    },
    choices: [
      {
        label: "Fazer o Pix imediatamente",
        correct: false,
        feedback:
          "Fazer o Pix sem confirmar é arriscado. Golpistas usam a pressa para impedir que você pense e verifique a história.",
      },
      {
        label: "Ligar para o número antigo do filho para confirmar",
        correct: true,
        feedback:
          "Você fez uma escolha segura. Ligar para o número que já conhece é a melhor forma de confirmar se o pedido é verdadeiro.",
      },
      {
        label: "Bloquear o número e avisar a família",
        correct: true,
        feedback:
          "Você se protegeu e ainda ajudou a família. Depois de confirmar a tentativa de golpe, bloquear e avisar pessoas próximas é uma ótima atitude.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Senso de urgência",
        text: "“Preciso pagar hoje” faz você agir sem pensar.",
      },
      {
        icon: "?",
        title: "Número novo",
        text: "O golpista finge ser alguém conhecido da família.",
      },
    ],
    goldenRule: "Pediu com pressa? Desconfie!",
  },
  {
    id: 2,
    difficulty: "Médio",
    title: "SMS de Entrega Falsa",
    description: "Identifique links suspeitos e cobranças falsas por mensagem.",
    kicker: "Nível 2 · SMS",
    heading: "Leia o SMS com calma",
    intro: "Imagine que este SMS chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "Eu estou esperando uma encomenda? Esse link é de um site oficial?",
    mockupLabel:
      "Simulação de SMS: 'CORREIOS: Sua encomenda está retida na alfândega. Pague a taxa de R$ 24,90 hoje para liberar: bit.ly/taxa-urgente'",
    mockup: {
      kind: "sms",
      sender: "29151",
      time: "Hoje 09:38",
      message: (
        <>
          CORREIOS: Sua encomenda está retida na alfândega. Pague a taxa de{" "}
          <strong>R$ 24,90</strong> hoje para liberar:{" "}
          <span className="sms-link">bit.ly/taxa-urgente</span>
        </>
      ),
    },
    choices: [
      {
        label: "Clicar no link e pagar a taxa",
        correct: false,
        feedback:
          "Esse link pode levar a um site falso que rouba seus dados e o dinheiro do pagamento. Links encurtados escondem o endereço verdadeiro, e a cobrança “para hoje” serve para você não ter tempo de desconfiar.",
      },
      {
        label: "Ignorar e apagar a mensagem",
        correct: true,
        feedback:
          "Boa escolha! Você não clicou no link e não pagou nada. Mensagens com cobranças urgentes e links estranhos devem ser ignoradas.",
      },
      {
        label: "Consultar o rastreio no site oficial dos Correios",
        correct: true,
        feedback:
          "Excelente! Digitar você mesmo o endereço do site oficial é a forma mais segura de saber se existe mesmo alguma encomenda ou taxa.",
      },
    ],
    signsTitle: "Sinais de alerta neste SMS",
    signs: [
      {
        icon: "!",
        title: "Cobrança urgente",
        text: "“Pague hoje” pressiona você a decidir sem pensar.",
      },
      {
        icon: "?",
        title: "Link encurtado",
        text: "Endereços como “bit.ly” escondem para onde o link leva.",
      },
    ],
    goldenRule: "Pediu com pressa? Desconfie!",
  },
  {
    id: 3,
    difficulty: "Difícil",
    title: "Falsa Central do Banco",
    description: "Saiba como agir ao receber uma ligação alarmante sobre sua conta.",
    kicker: "Nível 3 · Ligação",
    heading: "Escute a ligação com atenção",
    intro: "Imagine que você atendeu esta ligação agora.",
    question: "Qual atitude você toma?",
    tip: "Um banco de verdade pediria minha senha ou um Pix por telefone?",
    mockupLabel:
      "Simulação de chamada de 'Central de Segurança - Banco'. A pessoa diz: 'Olá! Identificamos uma compra suspeita de R$ 2.400 no seu cartão. Para cancelar agora, me informe sua senha ou faça um Pix para uma conta segura'",
    mockup: {
      kind: "call",
      caller: "Central de Segurança - Banco",
      number: "0800 591 2040",
      icon: "bank",
      duration: "00:47",
      speech: (
        <>
          Olá! Identificamos uma compra suspeita de <strong>R$ 2.400</strong> no seu cartão. Para
          cancelar agora, me informe sua senha ou faça um Pix para uma conta segura
        </>
      ),
    },
    choices: [
      {
        label: "Informar a senha para cancelar rápido",
        correct: false,
        feedback:
          "Com a sua senha, o golpista consegue entrar na sua conta e tirar o seu dinheiro. O banco nunca pede senha por telefone, mensagem ou e-mail.",
      },
      {
        label: "Desligar a ligação e ligar para o número oficial do banco",
        correct: true,
        feedback:
          "Muito bem! Desligar e ligar você mesmo para o número que está atrás do seu cartão é a forma segura de confirmar qualquer problema.",
      },
      {
        label: "Fazer a transferência para a conta segura",
        correct: false,
        feedback:
          "Não existe “conta segura”. Esse dinheiro vai direto para o golpista e é muito difícil de recuperar. O banco nunca pede transferência para cancelar uma compra.",
      },
    ],
    signsTitle: "Sinais de alerta nesta ligação",
    signs: [
      {
        icon: "!",
        title: "Susto e pressa",
        text: "Uma compra alta “para cancelar agora” causa medo de propósito.",
      },
      {
        icon: "?",
        title: "Pedido de senha ou Pix",
        text: "Nenhum banco pede senha ou transferência por telefone.",
      },
    ],
    goldenRule: "Banco nunca pede senha!",
  },
  {
    id: 4,
    difficulty: "Médio",
    title: "Falso Funcionário do INSS",
    description: "Pedido de foto e dados para falsa prova de vida.",
    kicker: "Nível 4 · WhatsApp",
    heading: "Leia a mensagem com calma",
    intro: "Imagine que esta mensagem chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "O INSS manda esse tipo de pedido pelo WhatsApp? Como posso confirmar sozinho?",
    mockupLabel:
      "Simulação de conversa no WhatsApp com 'INSS Atendimento': 'Sua prova de vida está pendente e o benefício será BLOQUEADO em 24h. Envie foto do RG, CPF e uma selfie segurando o documento para regularizar.'",
    mockup: {
      kind: "whatsapp",
      name: "INSS Atendimento",
      subtitle: "conta comercial",
      avatar: { initials: "IN", color: "#1d4f91" },
      time: "10:12",
      message: (
        <>
          Prezado(a) beneficiário(a), sua prova de vida está pendente e o benefício será{" "}
          <strong>BLOQUEADO em 24h</strong>. Envie foto do RG, CPF e uma selfie segurando o
          documento para regularizar.
        </>
      ),
    },
    choices: [
      {
        label: "Enviar as fotos e os documentos pedidos",
        correct: false,
        feedback:
          "Com suas fotos e documentos, golpistas podem fazer empréstimos, abrir contas e até desviar o seu benefício em seu nome.",
      },
      {
        label: "Não responder e consultar o app Meu INSS ou o telefone 135",
        correct: true,
        feedback:
          "Muito bem! Confirmar direto nos canais oficiais do INSS é a forma segura. A prova de vida é feita pelo próprio governo, sem pedir fotos por WhatsApp.",
      },
      {
        label: "Responder pedindo mais prazo para enviar",
        correct: false,
        feedback:
          "Responder mostra que seu número está ativo e o golpista vai insistir. Não converse com ele: confirme direto nos canais oficiais.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Ameaça de bloqueio",
        text: "O medo de perder o benefício faz você agir rápido.",
      },
      {
        icon: "?",
        title: "Pedido de selfie e documentos",
        text: "O INSS não pede fotos ou documentos por WhatsApp.",
      },
    ],
    goldenRule: "O INSS não pede dados por mensagem!",
  },
  {
    id: 5,
    difficulty: "Médio",
    title: "Golpe da Maquininha",
    description: "Entregador cobrando taxa com visor quebrado.",
    kicker: "Nível 5 · Na porta de casa",
    heading: "Observe a situação com atenção",
    intro: "Imagine que um entregador tocou a sua campainha agora.",
    question: "O que você faz nessa situação?",
    tip: "Eu sabia dessa taxa? Consigo ver o valor no visor antes de pagar?",
    mockupLabel:
      "Simulação: um entregador mostra uma maquininha de cartão com o visor quebrado e diz: 'Boa tarde! Tem uma taxa de entrega de R$ 5,00. O visor quebrou, mas pode passar o cartão e digitar a senha.'",
    mockup: {
      kind: "scene",
      scene: "machine",
      speaker: "Entregador",
      role: "na porta da sua casa",
      speech: (
        <>
          Boa tarde! Tem uma taxa de entrega de <strong>R$ 5,00</strong>. O visor quebrou, mas pode
          passar o cartão e digitar a senha.
        </>
      ),
    },
    choices: [
      {
        label: "Passar o cartão e digitar a senha mesmo assim",
        correct: false,
        feedback:
          "Sem enxergar o visor, você não sabe quanto está pagando. O golpista pode digitar R$ 1.800 em vez de R$ 5 e ainda trocar o seu cartão.",
      },
      {
        label: "Recusar o pagamento na maquininha quebrada",
        correct: true,
        feedback:
          "Ótimo! Ninguém pode exigir pagamento numa maquininha em que você não vê o valor. Na dúvida, recuse e confirme com a loja.",
      },
      {
        label: "Ligar para a loja pelo número oficial antes de pagar",
        correct: true,
        feedback:
          "Muito bem! A loja pode confirmar se existe mesmo alguma taxa. Na maioria das vezes, a entrega já está paga.",
      },
    ],
    signsTitle: "Sinais de alerta nesta situação",
    signs: [
      {
        icon: "!",
        title: "Visor quebrado",
        text: "Você não consegue ver o valor que está pagando.",
      },
      {
        icon: "?",
        title: "Taxa inesperada",
        text: "Cobrança surpresa na porta é um sinal clássico de golpe.",
      },
    ],
    goldenRule: "Não viu o valor? Não pague!",
  },
  {
    id: 6,
    difficulty: "Médio",
    title: "Bilhete Premiado ou Herança",
    description: "Promessa de dinheiro fácil pedindo taxa antes.",
    kicker: "Nível 6 · SMS",
    heading: "Leia o SMS com calma",
    intro: "Imagine que este SMS chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "Eu participei de algum sorteio? Conheço quem teria deixado essa herança?",
    mockupLabel:
      "Simulação de SMS: 'PARABÉNS! Você tem uma herança de R$ 85.000 para receber. Para liberar, pague a taxa de cartório de R$ 390 até hoje: premio-heranca.com'",
    mockup: {
      kind: "sms",
      sender: "27450",
      time: "Hoje 14:05",
      message: (
        <>
          PARABÉNS! Você tem uma herança de <strong>R$ 85.000</strong> para receber. Para liberar,
          pague a taxa de cartório de <strong>R$ 390</strong> até hoje:{" "}
          <span className="sms-link">premio-heranca.com</span>
        </>
      ),
    },
    choices: [
      {
        label: "Pagar a taxa para receber o dinheiro",
        correct: false,
        feedback:
          "Depois da primeira taxa, sempre aparece outra. O prêmio nunca chega e o dinheiro pago não volta.",
      },
      {
        label: "Enviar seus dados para conferir se é verdade",
        correct: false,
        feedback:
          "Seus dados podem ser usados em outros golpes, como empréstimos feitos em seu nome. Não envie nada para quem você não conhece.",
      },
      {
        label: "Apagar a mensagem e não pagar nada",
        correct: true,
        feedback:
          "Correto! Herança e prêmio de verdade não cobram taxa antecipada por mensagem. Apagar é a atitude mais segura.",
      },
    ],
    signsTitle: "Sinais de alerta neste SMS",
    signs: [
      {
        icon: "!",
        title: "Dinheiro fácil",
        text: "Ninguém ganha herança ou prêmio sem saber de onde veio.",
      },
      {
        icon: "?",
        title: "Taxa antes do prêmio",
        text: "Pedir pagamento para liberar dinheiro é golpe.",
      },
    ],
    goldenRule: "Prêmio de verdade não cobra taxa!",
  },
  {
    id: 7,
    difficulty: "Difícil",
    title: "Troca de Cartão no Caixa",
    description: "Estranho oferecendo ajuda no caixa eletrônico.",
    kicker: "Nível 7 · Caixa eletrônico",
    heading: "Observe a situação com atenção",
    intro: "Imagine que você está usando o caixa eletrônico agora.",
    question: "Qual atitude você toma?",
    tip: "Eu pedi ajuda a essa pessoa? Ela trabalha no banco?",
    mockupLabel:
      "Simulação: no caixa eletrônico, um homem desconhecido diz: 'A senhora está com dificuldade? Esse caixa está travando. Me dá o cartão e fala a senha que eu resolvo rapidinho.'",
    mockup: {
      kind: "scene",
      scene: "atm",
      speaker: "Homem desconhecido",
      role: "ao seu lado no caixa eletrônico",
      speech: (
        <>
          A senhora está com dificuldade? Esse caixa está travando. Me dá o cartão e fala a senha
          que eu resolvo <strong>rapidinho</strong>.
        </>
      ),
    },
    choices: [
      {
        label: "Entregar o cartão e dizer a senha para ele ajudar",
        correct: false,
        feedback:
          "Ele pode trocar o seu cartão por outro parecido sem você perceber e, com a senha, esvaziar a sua conta.",
      },
      {
        label: "Aceitar a ajuda, mas sem dizer a senha",
        correct: false,
        feedback:
          "Mesmo sem a senha, ele pode trocar o seu cartão ou espiar enquanto você digita. Nunca entregue o cartão a estranhos.",
      },
      {
        label: "Recusar, guardar o cartão e chamar um funcionário do banco",
        correct: true,
        feedback:
          "Excelente! Só funcionários identificados do banco devem ajudar, e mesmo eles não pedem sua senha. Guardar o cartão protege você.",
      },
    ],
    signsTitle: "Sinais de alerta nesta situação",
    signs: [
      {
        icon: "!",
        title: "Ajuda que você não pediu",
        text: "Estranhos “gentis” no caixa podem ser golpistas.",
      },
      {
        icon: "?",
        title: "Pedido de cartão e senha",
        text: "Só você deve tocar no seu cartão e saber a senha.",
      },
    ],
    goldenRule: "No caixa, não aceite ajuda de estranhos!",
  },
  {
    id: 8,
    difficulty: "Difícil",
    title: "Falsos Investimentos e Apostas",
    description: "Promessa de lucro rápido e garantido no Pix.",
    kicker: "Nível 8 · WhatsApp",
    heading: "Leia a mensagem com calma",
    intro: "Imagine que esta mensagem chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "Existe investimento que multiplica o dinheiro em um dia? Quem é essa pessoa?",
    mockupLabel:
      "Simulação de conversa no WhatsApp com 'Ricardo | Lucro Certo': 'Oportunidade única! Invista R$ 500 hoje e receba R$ 5.000 em 24 horas. Lucro GARANTIDO, sem risco. Restam só 3 vagas, faça o Pix agora!'",
    mockup: {
      kind: "whatsapp",
      name: "Ricardo | Lucro Certo",
      subtitle: "número desconhecido",
      avatar: { initials: "RL", color: "#2f7a45" },
      time: "19:20",
      message: (
        <>
          Oportunidade única! Invista <strong>R$ 500</strong> hoje e receba{" "}
          <strong>R$ 5.000</strong> em 24 horas. Lucro GARANTIDO, sem risco. Restam só 3 vagas, faça
          o Pix agora!
        </>
      ),
    },
    choices: [
      {
        label: "Fazer um Pix pequeno só para testar",
        correct: false,
        feedback:
          "Golpistas às vezes pagam um lucro pequeno no início para ganhar sua confiança. Depois pedem valores maiores e desaparecem.",
      },
      {
        label: "Não investir e conversar com o gerente do seu banco",
        correct: true,
        feedback:
          "Ótima decisão! Investimentos de verdade têm risco e crescem devagar. Antes de investir, converse com alguém de confiança.",
      },
      {
        label: "Fazer o Pix de R$ 500 para garantir a vaga",
        correct: false,
        feedback:
          "Nenhum investimento multiplica o dinheiro por 10 em um dia. O seu dinheiro iria direto para o golpista.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Lucro alto e garantido",
        text: "Todo investimento real tem risco e cresce devagar.",
      },
      {
        icon: "?",
        title: "Últimas vagas",
        text: "A falsa pressa impede você de pesquisar e pedir opinião.",
      },
    ],
    goldenRule: "Lucro rápido e garantido não existe!",
  },
  {
    id: 9,
    difficulty: "Difícil",
    title: "Falso Advogado / Precatório",
    description: "Cobrança de taxa para liberar processo judicial.",
    kicker: "Nível 9 · WhatsApp",
    heading: "Leia a mensagem com calma",
    intro: "Imagine que esta mensagem chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "Eu conheço esse advogado? A Justiça cobraria custas por Pix?",
    mockupLabel:
      "Simulação de conversa no WhatsApp com 'Dr. Paulo Mendes - Advogado': 'Boa notícia! Seu processo foi ganho e há R$ 38.700 para a senhora receber. Para liberar hoje, é preciso pagar as custas de R$ 1.250 via Pix.'",
    mockup: {
      kind: "whatsapp",
      name: "Dr. Paulo Mendes - Advogado",
      subtitle: "conta comercial",
      avatar: { initials: "PM", color: "#5b4a8f" },
      time: "11:03",
      message: (
        <>
          Boa notícia! Seu processo foi ganho e há <strong>R$ 38.700</strong> para a senhora
          receber. Para liberar hoje, é preciso pagar as custas de <strong>R$ 1.250</strong> via
          Pix.
        </>
      ),
    },
    choices: [
      {
        label: "Pagar as custas para liberar o dinheiro",
        correct: false,
        feedback:
          "Golpistas usam dados de processos públicos para parecer verdadeiros. Valores da Justiça não são liberados com Pix para advogados desconhecidos.",
      },
      {
        label: "Mandar seus documentos para agilizar o processo",
        correct: false,
        feedback:
          "Com seus documentos, o golpista pode aplicar outros golpes em seu nome. Não envie nada antes de confirmar com quem você já conhece.",
      },
      {
        label: "Ligar para o seu advogado de confiança pelo número que já tem",
        correct: true,
        feedback:
          "Excelente! Seu advogado ou o site do tribunal podem confirmar se existe algum valor. Custas judiciais não se pagam por Pix para uma pessoa.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Dinheiro para receber",
        text: "A boa notícia serve para você baixar a guarda.",
      },
      {
        icon: "?",
        title: "Taxa por Pix",
        text: "A Justiça não cobra custas por Pix em nome de pessoas.",
      },
    ],
    goldenRule: "Processo de verdade não se paga por Pix!",
  },
  {
    id: 10,
    difficulty: "Difícil",
    title: "Roubo de WhatsApp (Código SMS)",
    description: "Pedido de código de 6 dígitos por telefone.",
    kicker: "Nível 10 · Ligação",
    heading: "Escute a ligação com atenção",
    intro: "Imagine que você atendeu esta ligação agora.",
    question: "Qual atitude você toma?",
    tip: "Por que alguém precisaria de um código que chegou no meu celular?",
    mockupLabel:
      "Simulação de chamada de 'Pesquisa - Plano de Saúde'. A pessoa diz: 'Bom dia! Estamos atualizando o seu cadastro. Vai chegar um código de 6 dígitos por SMS agora. Pode me falar o código para confirmar?'",
    mockup: {
      kind: "call",
      caller: "Pesquisa - Plano de Saúde",
      number: "(11) 4003-2817",
      icon: "headset",
      duration: "01:12",
      speech: (
        <>
          Bom dia! Estamos atualizando o seu cadastro. Vai chegar um{" "}
          <strong>código de 6 dígitos</strong> por SMS agora. Pode me falar o código para confirmar?
        </>
      ),
    },
    choices: [
      {
        label: "Falar o código para terminar logo o cadastro",
        correct: false,
        feedback:
          "Esse código é a chave do seu WhatsApp. Com ele, o golpista entra na sua conta e pede dinheiro aos seus contatos fingindo ser você.",
      },
      {
        label: "Desligar e não passar o código para ninguém",
        correct: true,
        feedback:
          "Perfeito! O código é só seu. Para ficar ainda mais seguro, ative a “confirmação em duas etapas” nas configurações do WhatsApp.",
      },
      {
        label: "Ler o código devagar para conferir se está certo",
        correct: false,
        feedback:
          "Ler o código em voz alta é o mesmo que entregá-lo. Nenhuma empresa precisa desse número para atualizar cadastro.",
      },
    ],
    signsTitle: "Sinais de alerta nesta ligação",
    signs: [
      {
        icon: "!",
        title: "Código por SMS",
        text: "O código chegou para você e não deve ser passado a ninguém.",
      },
      {
        icon: "?",
        title: "Ligação inesperada",
        text: "Empresas sérias não pedem códigos por telefone.",
      },
    ],
    goldenRule: "Código do WhatsApp não se passa para ninguém!",
  },
  {
    id: 11,
    difficulty: "Muito Difícil",
    title: "Golpe do Falso Romance",
    description: "Pedido urgente de dinheiro após conquista virtual.",
    kicker: "Nível 11 · WhatsApp",
    heading: "Leia a mensagem com calma",
    intro: "Imagine que esta pessoa conversa com você há algumas semanas pela internet.",
    question: "O que você faz nessa situação?",
    tip: "Eu já encontrei essa pessoa pessoalmente? Por que ela precisa do meu dinheiro?",
    mockupLabel:
      "Simulação de conversa no WhatsApp com 'Robert Williams': 'Meu amor, estou preso na alfândega com o presente que comprei para você. Preciso de R$ 3.000 urgente para liberar. Você é a única pessoa em quem confio.'",
    mockup: {
      kind: "whatsapp",
      name: "Robert Williams",
      subtitle: "online",
      avatar: { initials: "RW", color: "#9a3b62" },
      time: "22:47",
      message: (
        <>
          Meu amor, estou preso na alfândega com o presente que comprei para você. Preciso de{" "}
          <strong>R$ 3.000 urgente</strong> para liberar. Você é a única pessoa em quem confio.
        </>
      ),
    },
    choices: [
      {
        label: "Enviar o dinheiro para ajudar a pessoa amada",
        correct: false,
        feedback:
          "Golpistas criam relacionamentos falsos por semanas para ganhar confiança. Depois do primeiro envio, surgem sempre novos problemas e novos pedidos.",
      },
      {
        label: "Pedir uma chamada de vídeo e só depois mandar o dinheiro",
        correct: false,
        feedback:
          "Golpistas inventam desculpas para não aparecer ou usam vídeos falsos. Mesmo depois de “ver” a pessoa, não envie dinheiro.",
      },
      {
        label: "Não enviar dinheiro e conversar com alguém da família",
        correct: true,
        feedback:
          "Muito bem! Contar para alguém de confiança ajuda a enxergar o golpe. Quem gosta de você de verdade não pede dinheiro sem nunca ter te encontrado.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Amor rápido e só virtual",
        text: "Declarações intensas sem nunca se encontrar pessoalmente.",
      },
      {
        icon: "?",
        title: "Emergência com dinheiro",
        text: "Problemas “urgentes” aparecem para justificar o pedido.",
      },
    ],
    goldenRule: "Amor virtual pedindo dinheiro é golpe!",
  },
  {
    id: 12,
    difficulty: "Muito Difícil",
    title: "Falso Boleto / Conta com Desconto",
    description: "Fatura adulterada enviada por WhatsApp.",
    kicker: "Nível 12 · WhatsApp",
    heading: "Leia a mensagem com calma",
    intro: "Imagine que esta mensagem chegou agora no seu celular.",
    question: "O que você faz nessa situação?",
    tip: "A empresa costuma mandar contas pelo WhatsApp? Por que tanto desconto?",
    mockupLabel:
      "Simulação de conversa no WhatsApp com 'Energia Atendimento': 'Olá! Sua conta de luz está com 40% de DESCONTO para pagamento hoje. Segue o boleto atualizado.' com um arquivo PDF anexado.",
    mockup: {
      kind: "whatsapp",
      name: "Energia Atendimento",
      subtitle: "conta comercial",
      avatar: { initials: "EA", color: "#b26a00" },
      time: "08:15",
      message: (
        <>
          Olá! Sua conta de luz está com <strong>40% de DESCONTO</strong> para pagamento hoje. Segue
          o boleto atualizado:
        </>
      ),
      attachment: { name: "fatura_desconto.pdf", detail: "1 página · PDF · 84 kB" },
    },
    choices: [
      {
        label: "Pagar o boleto para aproveitar o desconto",
        correct: false,
        feedback:
          "O boleto pode ter sido alterado e o dinheiro vai para a conta do golpista. Sua conta verdadeira continua sem pagar.",
      },
      {
        label: "Emitir a segunda via no site ou app oficial da empresa",
        correct: true,
        feedback:
          "Excelente! Pegando o boleto no canal oficial, você tem certeza de que está pagando a empresa certa. Confira também o nome do recebedor.",
      },
      {
        label: "Pagar e conferir o nome do recebedor depois",
        correct: false,
        feedback:
          "Depois de pago, é muito difícil recuperar o dinheiro. Confira o nome do recebedor antes de confirmar; se não for a empresa, não pague.",
      },
    ],
    signsTitle: "Sinais de alerta nesta mensagem",
    signs: [
      {
        icon: "!",
        title: "Desconto só para hoje",
        text: "Ofertas com prazo curto querem que você pague sem conferir.",
      },
      {
        icon: "?",
        title: "Boleto por WhatsApp",
        text: "Contas devem ser emitidas no site ou app oficial.",
      },
    ],
    goldenRule: "Boleto? Pegue só no site oficial!",
  },
  {
    id: 13,
    difficulty: "Especialista",
    title: "Voz Clonada por IA (Deepfake)",
    description: "Áudio imitando a voz de um familiar em apuros.",
    kicker: "Nível 13 · Áudio no WhatsApp",
    heading: "Escute o áudio com atenção",
    intro: "Imagine que este áudio chegou agora, com a voz idêntica à do seu neto.",
    question: "O que você faz nessa situação?",
    tip: "A voz é parecida, mas o número é conhecido? Consigo falar com ele de outro jeito?",
    mockupLabel:
      "Simulação de áudio no WhatsApp de número desconhecido. Transcrição: 'Vó, sou eu! Bati o carro e estou na delegacia. Não conta pra ninguém, por favor. Preciso de R$ 4.000 agora pelo Pix.'",
    mockup: {
      kind: "whatsapp",
      name: "+55 21 99812-3307",
      subtitle: "número desconhecido",
      avatar: { photo: grandsonPhoto },
      time: "16:32",
      audio: {
        duration: "0:18",
        transcript:
          "“Vó, sou eu! Bati o carro e estou na delegacia. Não conta pra ninguém, por favor. Preciso de R$ 4.000 agora pelo Pix.”",
      },
    },
    choices: [
      {
        label: "Fazer o Pix, porque a voz é igual à do neto",
        correct: false,
        feedback:
          "Hoje, programas de inteligência artificial copiam uma voz com poucos segundos de áudio tirados das redes sociais. Voz igual não é prova.",
      },
      {
        label: "Ligar para o neto no número que você já conhece",
        correct: true,
        feedback:
          "Perfeito! Ligar de volta para o número conhecido desmonta o golpe na hora. Se ele não atender, fale com outro familiar antes de qualquer pagamento.",
      },
      {
        label: "Fazer uma pergunta que só o neto saberia responder",
        correct: true,
        feedback:
          "Ótima ideia! Uma pergunta pessoal ou uma palavra secreta combinada com a família ajuda a descobrir a farsa. Na dúvida, não pague.",
      },
    ],
    signsTitle: "Sinais de alerta neste áudio",
    signs: [
      {
        icon: "!",
        title: "Segredo e urgência",
        text: "“Não conta pra ninguém” impede você de confirmar.",
      },
      {
        icon: "?",
        title: "Voz conhecida, número novo",
        text: "A IA imita vozes, mas o golpista não tem o celular do seu neto.",
      },
    ],
    goldenRule: "Voz parecida não é prova: ligue de volta!",
  },
  {
    id: 14,
    difficulty: "Médio",
    title: "Wi-Fi Grátis de Shopping ou Aeroporto",
    description: "Saiba quando compensa usar redes abertas e quais cuidados tomar.",
    kicker: "Nível 14 · Wi-Fi público",
    heading: "Observe as redes com atenção",
    intro: "Imagine que você está no shopping agora, com o celular na mão.",
    question: "O que você faz nessa situação?",
    tip: "Eu sei quem criou essa rede? Preciso mesmo abrir o banco nela?",
    mockupLabel:
      "Simulação da tela de configurações de Wi-Fi mostrando duas redes abertas sem cadeado: 'Shopping_WiFi_Gratis_VIP - Sem senha' e 'Aeroporto_Livre_5G - Sem senha'. Aviso: 'Você está no shopping e quer abrir o app do banco para fazer um Pix. Compensa entrar nesse Wi-Fi grátis?'",
    mockup: {
      kind: "wifi",
      place: "Shopping Center",
      networks: [
        { name: "Shopping_WiFi_Gratis_VIP", note: "Sem senha" },
        { name: "Aeroporto_Livre_5G", note: "Sem senha" },
      ],
      context: (
        <>
          Você está no shopping e quer abrir o <strong>app do banco</strong> para fazer um Pix.
          Compensa entrar nesse Wi-Fi grátis?
        </>
      ),
    },
    choices: [
      {
        label: "Conectar no Wi-Fi grátis sem senha e abrir o app do banco para fazer o Pix",
        correct: false,
        title: "Não compensa!",
        feedback:
          "Golpistas criam redes abertas falsas para espionar senhas e dados bancários. Para bancos e Pix, use sempre o 4G/5G do seu chip.",
      },
      {
        label: "Não compensa para banco: desligar o Wi-Fi e usar o 4G/5G do próprio chip",
        correct: true,
        title: "Acertou!",
        feedback:
          "Em Wi-Fi público sem senha nunca se deve abrir bancos ou digitar senhas. Usar os dados móveis do chip é a escolha segura.",
      },
      {
        label:
          "Entrar no Wi-Fi grátis apenas para ler notícias, sem digitar senhas nem abrir o banco",
        correct: true,
        partial: true,
        title: "Boa noção de risco!",
        feedback:
          "Até dá para ver coisas simples, mas nunca digite senhas nem abra o banco em redes sem senha.",
      },
    ],
    signsTitle: "Sinais de alerta nestas redes",
    signs: [
      {
        icon: "!",
        title: "Rede sem senha",
        text: "Qualquer pessoa pode criar uma rede com o nome do shopping ou do aeroporto.",
      },
      {
        icon: "?",
        title: "Nome chamativo",
        text: "Palavras como “Grátis”, “VIP” ou “Livre” servem para atrair você.",
      },
    ],
    goldenRule: "Banco e Pix? Só no 4G/5G do seu chip!",
  },
];
