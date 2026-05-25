import { IGame } from "../types/centralMCI/centralMCI";

export const alertwarnings = [
  {
    "id": "asd19as5d1a9s5d19as51da",
    "title": "Equipe Financeira em Risco",
    "description": "Abaixo da meta por 3 semanas consecutivas",
    "icon": "warning"
  },
  {
    "id": "77A8S49s19A51S",
    "title": "Reunião Pendente",
    "description": "Equipe do RH não registrou reunião esta semana",
    "icon": "reunion"
  },
  {
    "id": "49a8s4d9as1915d5v19v",
    "title": "Nova MCI criada",
    "description": "Equipe de vendas definiu nova meta para o trimestre",
    "icon": "alert"
  },
  {
    "id": "cvxc87v984v69d519sd15vsdv",
    "title": "Meta atingida",
    "description": "Equipe de Marketing completou MCI 2 semanas antes do prazo",
    "icon": "success"
  },
  {
    "id": "mtmh9191n9g5n19n519n",
    "title": "Meta atingida",
    "description": "Equipe de Marketing completou MCI 2 semanas antes do prazo",
    "icon": "success"
  }
]

export const scores = [
  {
    "id": 1,
    "initial": "EV",
    "title": "Equipe de Vendas",
    "description": "92% de desempenho",
    "image": "trophy"
  },
  {
    "id": 2,
    "initial": "EM",
    "title": "Equipe de Marketing",
    "description": "87% de desempenho",
    "image": "trophy"
  },
  {
    "id": 3,
    "initial": "ET",
    "title": "Equipe de TI",
    "description": "78% de desempenho",
    "image": "star"
  },
  {
    "id": 4,
    "initial": "RH",
    "title": "Equipe de Recursos Humanos",
    "description": "30% de desempenho",
    "image": "other"
  },
  {
    "id": 5,
    "initial": "EF",
    "title": "Equipe de Financeira",
    "description": "30% de desempenho",
    "image": "other"
  },
] as const

export const leaders = [
  { id: 1, nome: "João Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "Carlos Santos" },
  { id: 4, nome: "Ana Costa" },
  { id: 5, nome: "Pedro Almeida" },
  { id: 6, nome: "Luisa Pereira" }
]

export const cups = [
  {
    id: 1,
    nome: "Copa de Evangelismo",
    lider: {
      id: 1,
      nome: "João Silva",
    },
    verbo: "Convidar",
    medida: "pessoas",
    de: 10,
    para: 30,
    inicio: "2026-01-10",
    fim: "2026-03-15",
    departamentos: ["Jovens", "Louvor"],
  },
  {
    id: 2,
    nome: "Copa da Recepção",
    lider: {
      id: 2,
      nome: "Maria Oliveira",
    },
    verbo: "Recepcionar",
    medida: "visitantes",
    de: 20,
    para: 50,
    inicio: "2026-02-01",
    fim: "2026-04-20",
    departamentos: ["Recepção"],
  },
  {
    id: 3,
    nome: "Copa Infantil",
    lider: {
      id: 3,
      nome: "Carlos Santos",
    },
    verbo: "Alcançar",
    medida: "crianças",
    de: 15,
    para: 40,
    inicio: "2026-03-05",
    fim: "2026-05-10",
    departamentos: ["Kids"],
  },
  {
    id: 4,
    nome: "Copa de Consolidação",
    lider: {
      id: 4,
      nome: "Ana Costa",
    },
    verbo: "Consolidar",
    medida: "vidas",
    de: 5,
    para: 25,
    inicio: "2026-01-20",
    fim: "2026-06-01",
    departamentos: ["Consolidação", "Discipulado"],
  },
  {
    id: 5,
    nome: "Copa do Louvor",
    lider: {
      id: 5,
      nome: "Pedro Almeida",
    },
    verbo: "Ensaiar",
    medida: "músicas",
    de: 8,
    para: 20,
    inicio: "2026-02-15",
    fim: "2026-07-01",
    departamentos: ["Louvor"],
  },
  {
    id: 6,
    nome: "Copa de Oração",
    lider: {
      id: 6,
      nome: "Luisa Pereira",
    },
    verbo: "Orar",
    medida: "horas",
    de: 50,
    para: 150,
    inicio: "2026-01-01",
    fim: "2026-12-31",
    departamentos: ["Intercessão"],
  },
  {
    id: 7,
    nome: "Copa de Missões",
    lider: {
      id: 7,
      nome: "Fernanda Rocha",
    },
    verbo: "Evangelizar",
    medida: "famílias",
    de: 12,
    para: 35,
    inicio: "2026-04-01",
    fim: "2026-08-30",
    departamentos: ["Missões"],
  },
  {
    id: 8,
    nome: "Copa de Mídia",
    lider: {
      id: 8,
      nome: "Ricardo Lima",
    },
    verbo: "Produzir",
    medida: "conteúdos",
    de: 25,
    para: 80,
    inicio: "2026-02-10",
    fim: "2026-09-15",
    departamentos: ["Mídia", "Comunicação"],
  },
  {
    id: 9,
    nome: "Copa de Discipulado",
    lider: {
      id: 9,
      nome: "Juliana Martins",
    },
    verbo: "Discipular",
    medida: "pessoas",
    de: 6,
    para: 18,
    inicio: "2026-03-01",
    fim: "2026-10-01",
    departamentos: ["Discipulado"],
  },
  {
    id: 10,
    nome: "Copa de Eventos",
    lider: {
      id: 10,
      nome: "Gabriel Souza",
    },
    verbo: "Organizar",
    medida: "eventos",
    de: 2,
    para: 10,
    inicio: "2026-05-01",
    fim: "2026-11-20",
    departamentos: ["Eventos", "Produção"],
  },
];

export const departments = [
  {
    id: "1",
    nome: "Louvor",
  },
  {
    id: "2",
    nome: "Recepção",
  },
  {
    id: "3",
    nome: "Intercessão",
  },
  {
    id: "4",
    nome: "Mídia",
  },
  {
    id: "5",
    nome: "Kids",
  },
  {
    id: "6",
    nome: "Jovens",
  },
  {
    id: "7",
    nome: "Eventos",
  },
  {
    id: "8",
    nome: "Consolidação",
  },
  {
    id: "9",
    nome: "Discipulado",
  },
  {
    id: "10",
    nome: "Missões",
  },
];

export const mockedGames: IGame[] = [
  {
    id: 1,
    nome: "Projeto 300",
    lider: {
      id: 1,
      nome: "João Silva",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Alcançar",
    medida: "Pessoas",
    de: 120,
    para: 300,
    inicio: "2026-01-10",
    fim: "2026-03-30",
    observacoes:
      "Foco em crescimento do primeiro trimestre.",
    incluirPLP: true,
    medidasDirecao: [
      {
        id: 1,
        verbo: "Evangelizar",
        unidadeMedida: "Pessoas",
        placarDesejado: 120,
        dataInicial: "2026-01-01",
        dataFinal: "2026-03-31",
        excluirPeriodo: false,
        semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 100, compromisso: 120, entrevistaqtd: 10, promotores: 9, neutros: 1, detratores: 0} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true, lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null},
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null},
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null},
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null},
        ]
      },

      {
        id: 2,
        verbo: "Discipular",
        unidadeMedida: "Alunos",
        placarDesejado: 45,
        dataInicial: "2026-02-01",
        dataFinal: "2026-05-30",
        excluirPeriodo: true,
        dataInicialPeriodoExcluido: "2026-03-10",
        dataFinalPeriodoExcluido: "2026-03-20",
        semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
      }
    ]
  },

  {
    id: 2,
    nome: "Missão Impacto",
    lider: {
      id: 2,
      nome: "Maria Oliveira",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Conectar",
    medida: "Visitantes",
    de: 40,
    para: 120,
    inicio: "2026-02-01",
    fim: "2026-05-01",
    incluirPLP: false,
    medidasDirecao: [{
      id: 3,
      verbo: "Batizar",
      unidadeMedida: "Pessoas",
      placarDesejado: 30,
      dataInicial: "2026-01-15",
      dataFinal: "2026-06-15",
      excluirPeriodo: false,
      semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
    },

    {
      id: 4,
      verbo: "Conectar",
      unidadeMedida: "Famílias",
      placarDesejado: 18,
      dataInicial: "2026-04-01",
      dataFinal: "2026-08-01",
      excluirPeriodo: true,
      dataInicialPeriodoExcluido: "2026-06-01",
      dataFinalPeriodoExcluido: "2026-06-15",
      semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
    },

    {
      id: 5,
      verbo: "Treinar",
      unidadeMedida: "Líderes",
      placarDesejado: 12,
      dataInicial: "2026-02-10",
      dataFinal: "2026-09-10",
      excluirPeriodo: false,
      semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true, lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
    }
    ]
  },

  {
    id: 3,
    nome: "Aviva Jovem",
    lider: {
      id: 3,
      nome: "Carlos Mendes",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Engajar",
    medida: "Jovens",
    de: 80,
    para: 200,
    inicio: "2026-03-01",
    fim: "2026-06-01",
    incluirPLP: true,
    medidasDirecao: [{
      id: 6,
      verbo: "Alcançar",
      unidadeMedida: "Jovens",
      placarDesejado: 200,
      dataInicial: "2026-03-01",
      dataFinal: "2026-12-01",
      excluirPeriodo: true,
      dataInicialPeriodoExcluido: "2026-07-01",
      dataFinalPeriodoExcluido: "2026-07-31",
      semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
    }
    ]
  },

  {
    id: 4,
    nome: "Conferência DNA",
    lider: {
      id: 4,
      nome: "Fernanda Costa",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Mobilizar",
    medida: "Inscrições",
    de: 150,
    para: 500,
    inicio: "2026-04-15",
    fim: "2026-07-20",
    incluirPLP: false,
    medidasDirecao: [
      {
        id: 7,
        verbo: "Mobilizar",
        unidadeMedida: "Voluntários",
        placarDesejado: 80,
        dataInicial: "2026-01-20",
        dataFinal: "2026-04-20",
        excluirPeriodo: false,
        semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
      },

      {
        id: 8,
        verbo: "Expandir",
        unidadeMedida: "Células",
        placarDesejado: 25,
        dataInicial: "2026-05-01",
        dataFinal: "2026-11-01",
        excluirPeriodo: true,
        dataInicialPeriodoExcluido: "2026-08-10",
        dataFinalPeriodoExcluido: "2026-08-25",
        semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 6, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 7, status: "indisponivel", permiteLancamento: false, lancamento: null },
        ]
      },

      {
        id: 9,
        verbo: "Ensinar",
        unidadeMedida: "Turmas",
        placarDesejado: 16,
        dataInicial: "2026-02-05",
        dataFinal: "2026-07-05",
        excluirPeriodo: false,
        semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true,  lancamento: null},
        ]
      }
    ]
  },

  {
    id: 5,
    nome: "Expansão Kids",
    lider: {
      id: 5,
      nome: "Juliana Rocha",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Cadastrar",
    medida: "Crianças",
    de: 60,
    para: 180,
    inicio: "2026-01-05",
    fim: "2026-04-10",
    incluirPLP: true,
    medidasDirecao: [{
      id: 10,
      verbo: "Enviar",
      unidadeMedida: "Missionários",
      placarDesejado: 9,
      dataInicial: "2026-06-01",
      dataFinal: "2026-12-20",
      excluirPeriodo: true,
      dataInicialPeriodoExcluido: "2026-10-01",
      dataFinalPeriodoExcluido: "2026-10-10",
      semanas: [
          { semana: 1, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 2, status: "concluída", permiteLancamento: true, lancamento: {realizado: 150, compromisso: 180, entrevistaqtd: 30, promotores: 20, neutros: 5, detratores: 5} },
          { semana: 3, status: "disponivel", permiteLancamento: true, lancamento: null },
          { semana: 4, status: "indisponivel", permiteLancamento: false, lancamento: null },
          { semana: 5, status: "indisponivel", permiteLancamento: false, lancamento: null },

        ]
    }
    ]
  },

  {
    id: 6,
    nome: "Operação Discipulado",
    lider: {
      id: 6,
      nome: "Ricardo Lima",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Treinar",
    medida: "Líderes",
    de: 25,
    para: 80,
    inicio: "2026-02-10",
    fim: "2026-08-10",
    incluirPLP: true,
    medidasDirecao: []
  },

  {
    id: 7,
    nome: "Semana da Colheita",
    lider: {
      id: 7,
      nome: "Patrícia Souza",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Ganhar",
    medida: "Almas",
    de: 300,
    para: 1000,
    inicio: "2026-05-01",
    fim: "2026-05-07",
    incluirPLP: false,
    medidasDirecao: []
  },

  {
    id: 8,
    nome: "Projeto Conexão",
    lider: {
      id: 8,
      nome: "Lucas Ferreira",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Abrir",
    medida: "Células",
    de: 12,
    para: 40,
    inicio: "2026-03-15",
    fim: "2026-09-15",
    incluirPLP: true,
    medidasDirecao: []
  },

  {
    id: 9,
    nome: "Impacto Universitário",
    lider: {
      id: 9,
      nome: "Amanda Ribeiro",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Alcançar",
    medida: "Universitários",
    de: 90,
    para: 250,
    inicio: "2026-02-20",
    fim: "2026-06-30",
    incluirPLP: false,
    medidasDirecao: []
  },

  {
    id: 10,
    nome: "Desafio 90 Dias",
    lider: {
      id: 10,
      nome: "Thiago Martins",
    },
    departamentos: [
      { id: 1, nome: "Evangelismo" }
    ],
    verbo: "Fortalecer",
    medida: "Participantes",
    de: 45,
    para: 150,
    inicio: "2026-01-01",
    fim: "2026-03-31",
    observacoes:
      "Campanha intensiva de oração e discipulado.",
    incluirPLP: true,
    medidasDirecao: []
  },
];