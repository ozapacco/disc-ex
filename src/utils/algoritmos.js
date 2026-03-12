const DIMENSAO_MAP = {
  A: 'D',
  B: 'I',
  C: 'S',
  D: 'C',
};

const PERFIL_NAMES = {
  D: 'Dominância',
  I: 'Influência',
  S: 'Estabilidade',
  C: 'Conformidade',
};

const PERFIL_TITLES = {
  D: 'EXECUTOR',
  I: 'COMUNICADOR',
  S: 'PLANEJADOR',
  C: 'ANALISTA',
};

const ESTILOS_COMPOSTOS = {
  DI: 'INSPIRADOR',
  ID: 'INSPIRADOR',
  DC: 'IMPLEMENTADOR',
  CD: 'IMPLEMENTADOR',
  IC: 'HARMONIZADOR',
  CI: 'HARMONIZADOR',
  IS: 'PROMOTOR',
  SI: 'PROMOTOR',
  SC: 'COORDENADOR',
  CS: 'COORDENADOR',
  DS: 'CONDUTOR',
  SD: 'CONDUTOR',
};

const ESTILOS_LIDERANCA = {
  CONDUTOR: {
    descricao: 'Comunicação unilateral, gestão dirigida, pressão por metas',
    foco: 'DIREÇÃO',
    ideal_para: 'Equipes de alta performance',
  },
  CENTRALIZADOR: {
    descricao: 'Ambiente formal, padrões elevados, estrutura rígida',
    foco: 'DIREÇÃO + CONTROLE',
    ideal_para: 'Situações que exigem conformidade',
  },
  SISTEMÁTICO: {
    descricao: 'Processos claros, metodologia, previsibilidade',
    foco: 'ORIENTAÇÃO',
    ideal_para: 'Equipes técnicas',
  },
  VISIONÁRIO: {
    descricao: 'Inspiração, visão de futuro, mudança',
    foco: 'ORIENTAÇÃO + MOTIVAÇÃO',
    ideal_para: 'Transformações organizacionais',
  },
  INSPIRADOR: {
    descricao: 'Entusiasmo, motivação, reconhecimento',
    foco: 'MOTIVAÇÃO',
    ideal_para: 'Equipes criativas e inovadoras',
  },
  PARTICIPATIVO: {
    descricao: 'Decisão compartilhada, colaboração',
    foco: 'APOIO + DIREÇÃO',
    ideal_para: 'Equipes em desenvolvimento',
  },
  APOIADOR: {
    descricao: 'Desenvolvimento, confiança, autonomia gradual',
    foco: 'APOIO',
    ideal_para: 'Desenvolvimento de talentos',
  },
  PLANEJADOR: {
    descricao: 'Organização, delegação estruturada',
    foco: 'DELEGAÇÃO',
    ideal_para: 'Projetos complexos',
  },
};

const DISC_EMOCOES = {
  D: {
    primaria: 'Raiva',
    secundarias: ['Agressividade', 'Interesse', 'Vigilância'],
    negativas: ['Aborrecimento', 'Irritação'],
    funcao: 'Motivacional',
  },
  I: {
    primaria: 'Alegria',
    secundarias: ['Otimismo', 'Amor', 'Confiança'],
    negativas: ['Apreensão', 'Distração'],
    funcao: 'Social',
  },
  S: {
    primaria: 'Confiança',
    secundarias: ['Serenidade', 'Aceitação', 'Submissão'],
    negativas: ['Tristeza', 'Abatimento'],
    funcao: 'Adaptativa',
  },
  C: {
    primaria: 'Medo',
    secundarias: ['Apreensão', 'Surpresa', 'Antecipação'],
    negativas: ['Terror', 'Angústia'],
    funcao: 'Motivacional',
  },
};

const DISC_VALORES = {
  D: {
    Individualista: 0.35,
    Utilitária: 0.30,
    Teórica: 0.20,
    Social: 0.05,
    Estética: 0.05,
    Tradicional: 0.05,
  },
  I: {
    Social: 0.35,
    Estética: 0.25,
    Individualista: 0.20,
    Tradicional: 0.10,
    Utilitária: 0.05,
    Teórica: 0.05,
  },
  S: {
    Tradicional: 0.30,
    Social: 0.30,
    Estética: 0.15,
    Utilitária: 0.10,
    Teórica: 0.10,
    Individualista: 0.05,
  },
  C: {
    Teórica: 0.35,
    Utilitária: 0.25,
    Tradicional: 0.20,
    Social: 0.10,
    Estética: 0.05,
    Individualista: 0.05,
  },
};

const DISC_KOLB = {
  D: 'CONVERGENTE',
  I: 'ADAPTADOR',
  S: 'DIVERGENTE',
  C: 'ASSIMILADOR',
};

const INSIGHTS_TEMPLATES = {
  D_alto_I_baixo: {
    insight: 'Perfil orientado a resultados que pode negligenciar relacionamentos',
    desafio: 'Pode parecer impaciente ou autoritário',
    desenvolvimento: 'Praticar escuta ativa e valorizar contribuições dos outros',
  },
  I_alto_D_baixo: {
    insight: 'Alta energia social que pode resultar em falta de foco',
    desafio: 'Pode ter dificuldade em dar continuidade',
    desenvolvimento: 'Definir metas claras e criar sistemas de acompanhamento',
  },
  S_alto_D_baixo: {
    insight: 'Perfil cooperativo que evita conflitos',
    desafio: 'Pode ter dificuldade em asserting necessidades',
    desenvolvimento: 'Praticar comunicação assertiva',
  },
  C_alto_I_baixo: {
    insight: 'Foco em precisão que pode parecer crítico',
    desafio: 'Pode ter dificuldade em adaptar-se a mudanças',
    desenvolvimento: 'Equilibrar análise com flexibilidade',
  },
};

export function processarRespostas(respostas) {
  const pontuacoes = { D: 0, I: 0, S: 0, C: 0 };
  
  respostas.forEach(({ escolha, grau }) => {
    const dimensao = DIMENSAO_MAP[escolha];
    if (dimensao) {
      pontuacoes[dimensao] += grau;
    }
  });

  return pontuacoes;
}

export function calcularPercentuais(pontuacoes) {
  const maximo = 38 * 10;
  return {
    D: Math.round((pontuacoes.D / maximo) * 100 * 100) / 100,
    I: Math.round((pontuacoes.I / maximo) * 100 * 100) / 100,
    S: Math.round((pontuacoes.S / maximo) * 100 * 100) / 100,
    C: Math.round((pontuacoes.C / maximo) * 100 * 100) / 100,
  };
}

export function calcularContraste(perfil) {
  return {
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  };
}

export function calcularMaturidade(perfil) {
  const valores = Object.values(perfil);
  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  const variancia = valores.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / valores.length;
  const desvioPadrao = Math.sqrt(variancia);
  const maturidade = 100 - (desvioPadrao / 25) * 100;
  return Math.max(0, Math.min(100, Math.round(maturidade * 10) / 10));
}

export function calcularEnergia(perfil) {
  const total = Object.values(perfil).reduce((a, b) => a + b, 0);
  const maximo = 38 * 10;
  return Math.round((total / maximo) * 100 * 100) / 100;
}

export function perfilPredominante(disc) {
  const ordenado = Object.entries(disc).sort((a, b) => b[1] - a[1]);
  return PERFIL_TITLES[ordenado[0][0]];
}

export function estiloComposto(disc) {
  const ordenado = Object.entries(disc).sort((a, b) => b[1] - a[1]);
  const top2 = ordenado[0][0] + ordenado[1][0];
  return ESTILOS_COMPOSTOS[top2] || 'EQUILIBRADO';
}

export function derivarValores(disc) {
  const valores = {
    Teórica: 0,
    Utilitária: 0,
    Estética: 0,
    Social: 0,
    Individualista: 0,
    Tradicional: 0,
  };

  Object.entries(disc).forEach(([dim, peso]) => {
    const pesoNorm = peso / 100;
    Object.entries(DISC_VALORES[dim]).forEach(([valor, contribuicao]) => {
      valores[valor] += pesoNorm * contribuicao * 100;
    });
  });

  Object.keys(valores).forEach((key) => {
    valores[key] = Math.round(valores[key] * 100) / 100;
  });

  return valores;
}

export function estiloAprendizagem(disc) {
  const dimPrincipal = Object.entries(disc).sort((a, b) => b[1] - a[1])[0][0];
  const dimSecundaria = Object.entries(disc).sort((a, b) => b[1] - a[1])[1][0];

  return {
    principal: DISC_KOLB[dimPrincipal],
    secundario: DISC_KOLB[dimSecundaria],
    experimentando: Math.round((disc.I + disc.S) * 100) / 100,
    pensando: Math.round((disc.D + disc.C) * 100) / 100,
    fazendo: Math.round((disc.D + disc.I) * 100) / 100,
    observando: Math.round((disc.S + disc.C) * 100) / 100,
  };
}

export function derivarBigFive(disc) {
  const abertura =
    disc.I * 0.4 + disc.D * 0.3 + disc.C * 0.2 + disc.S * 0.1;
  const conscienciosidade =
    disc.C * 0.5 + disc.S * 0.25 + disc.D * 0.15 + disc.I * 0.1;
  const extroversao =
    disc.I * 0.5 + disc.D * 0.3 + disc.S * 0.1 + disc.C * 0.1;
  const agradabilidade =
    disc.S * 0.5 + disc.I * 0.25 + disc.C * 0.15 + disc.D * 0.1;
  const desequilibrio = Math.max(...Object.values(disc)) - Math.min(...Object.values(disc));
  const neuroticismo = Math.min(100, desequilibrio * 0.8 + 20);

  return {
    Abertura: Math.round(abertura * 100) / 100,
    Conscienciosidade: Math.round(conscienciosidade * 100) / 100,
    Extroversão: Math.round(extroversao * 100) / 100,
    Agradabilidade: Math.round(agradabilidade * 100) / 100,
    Neuroticismo: Math.round(neuroticismo * 100) / 100,
  };
}

export function derivarTipoMbti(disc) {
  const extroversao = disc.D + disc.I;
  const introversao = disc.S + disc.C;
  const ei = extroversao > introversao ? 'E' : 'I';

  const sensacao = disc.S + disc.C;
  const intuicao = disc.D + disc.I;
  const sn = intuicao > sensacao ? 'N' : 'S';

  const pensamento = disc.D + disc.C;
  const sentimento = disc.I + disc.S;
  const tf = pensamento > sentimento ? 'T' : 'F';

  const julgamento = disc.D + disc.C;
  const percepcao = disc.I + disc.S;
  const jp = julgamento > percepcao ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}

export function calcularZonas(disc, maturidade) {
  const zonaConforto = ((disc.S + disc.C) / 2) * (1 - maturidade / 100);
  const desequilibrio = Math.max(...Object.values(disc)) - Math.min(...Object.values(disc));
  const zonaMedo = desequilibrio * (1 - maturidade / 100);
  let zonaAprendizagem = 100 - zonaConforto - zonaMedo;
  if (maturidade > 60) zonaAprendizagem *= 0.7;
  const zonaSuperacao = maturidade > 60 ? maturidade * 0.8 : maturidade * 0.5;

  const total = zonaConforto + zonaMedo + zonaAprendizagem + zonaSuperacao;

  return {
    Conforto: Math.round((zonaConforto / total) * 100 * 100) / 100,
    Medo: Math.round((zonaMedo / total) * 100 * 100) / 100,
    Aprendizagem: Math.round((zonaAprendizagem / total) * 100 * 100) / 100,
    Superação: Math.round((zonaSuperacao / total) * 100 * 100) / 100,
  };
}

export function determinarLideranca(disc) {
  const scores = {
    CONDUTOR: disc.D * 1.0,
    CENTRALIZADOR: disc.D * 0.5 + disc.C * 0.5,
    SISTEMÁTICO: disc.C * 0.7 + disc.S * 0.3,
    VISIONÁRIO: disc.D * 0.4 + disc.I * 0.6,
    INSPIRADOR: disc.I * 1.0,
    PARTICIPATIVO: disc.I * 0.5 + disc.S * 0.5,
    APOIADOR: disc.S * 1.0,
    PLANEJADOR: disc.S * 0.5 + disc.C * 0.5,
  };

  const ordenado = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return {
    principal: ordenado[0][0],
    secundario: ordenado[1][0],
    menorAfinidade: ordenado[ordenado.length - 1][0],
    descricao: ESTILOS_LIDERANCA[ordenado[0][0]].descricao,
    foco: ESTILOS_LIDERANCA[ordenado[0][0]].foco,
    idealPara: ESTILOS_LIDERANCA[ordenado[0][0]].ideal_para,
    scores,
  };
}

export function mapaEmocional(disc) {
  const dimPrincipal = Object.entries(disc).sort((a, b) => b[1] - a[1])[0][0];
  const emocoes = DISC_EMOCOES[dimPrincipal];
  const equilibrio = 100 - (Math.max(...Object.values(disc)) - Math.min(...Object.values(disc)));

  return {
    emocaoCentral: emocoes.primaria,
    emocoesAssociadas: emocoes.secundarias,
    riscosEmocionais: emocoes.negativas,
    funcaoPrincipal: emocoes.funcao,
    equilibrioEmocional: Math.round(equilibrio * 100) / 100,
  };
}

export function validarConsistencia(respostas) {
  const contagens = { A: 0, B: 0, C: 0, D: 0 };
  respostas.forEach(({ escolha }) => {
    contagens[escolha] = (contagens[escolha] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(contagens));
  const percentMax = maxCount / respostas.length;

  if (percentMax > 0.6) {
    return {
      valido: false,
      motivo: 'Padrão de resposta muito repetitivo detectado',
    };
  }

  const graus = respostas.map(r => r.grau);
  const mediaGrau = graus.reduce((a, b) => a + b, 0) / graus.length;
  const varianciaGrau = graus.reduce((acc, g) => acc + Math.pow(g - mediaGrau, 2), 0) / graus.length;
  
  if (varianciaGrau < 2) {
    return {
      valido: false,
      motivo: 'Respostas com pouca variação de intensidade',
    };
  }

  return { valido: true };
}

export function calcularConfiabilidade(respostas, disc) {
  const contagens = { A: 0, B: 0, C: 0, D: 0 };
  respostas.forEach(({ escolha }) => {
    contagens[escolha] = (contagens[escolha] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(contagens));
  const percentMax = maxCount / respostas.length;
  
  let confiabilidade = 100 - (percentMax - 0.25) * 100;

  const valores = Object.values(disc);
  const minValor = Math.min(...valores);
  const maxValor = Math.max(...valores);
  
  if (maxValor - minValor > 60) {
    confiabilidade *= 0.9;
  }

  return Math.max(0, Math.min(100, Math.round(confiabilidade * 10) / 10));
}

export function gerarInsights(disc) {
  const insights = [];
  const alto = Object.entries(disc)
    .filter(([, v]) => v > 60)
    .map(([k]) => k);
  const baixo = Object.entries(disc)
    .filter(([, v]) => v < 40)
    .map(([k]) => k);

  alto.forEach((a) => {
    baixo.forEach((b) => {
      const chave = `${a}_alto_${b}_baixo`;
      if (INSIGHTS_TEMPLATES[chave]) {
        insights.push(INSIGHTS_TEMPLATES[chave]);
      }
    });
  });

  return insights;
}

export function classificarIntensidade(percentual) {
  if (percentual <= 25) return 'MUITO BAIXO';
  if (percentual <= 45) return 'BAIXO';
  if (percentual <= 55) return 'MÉDIO';
  if (percentual <= 75) return 'ALTO';
  return 'MUITO ALTO';
}

export function processarAvaliacaoCompleta(respostas, perguntasComplementares) {
  const consistencia = validarConsistencia(respostas);

  const pontuacoes = processarRespostas(respostas);
  const perfilPct = calcularPercentuais(pontuacoes);
  const contraste = calcularContraste(perfilPct);
  const maturidade = calcularMaturidade(perfilPct);
  const energia = calcularEnergia(pontuacoes);
  const perfilPredom = perfilPredominante(perfilPct);
  const estiloComp = estiloComposto(perfilPct);
  const valores = derivarValores(perfilPct);
  const kolb = estiloAprendizagem(perfilPct);
  const bigFive = derivarBigFive(perfilPct);
  const mbti = derivarTipoMbti(perfilPct);
  const zonas = calcularZonas(perfilPct, maturidade);
  const lideranca = determinarLideranca(perfilPct);
  const emocoes = mapaEmocional(perfilPct);
  const confiabilidade = calcularConfiabilidade(respostas, perfilPct);
  const insights = gerarInsights(perfilPct);

  return {
    consistencia,
    perfilAjustado: perfilPct,
    perfilNatural: perfilPct,
    contraste,
    maturidade,
    energia,
    perfilPredominante: perfilPredom,
    estiloComposto: estiloComp,
    valores,
    kolb,
    bigFive,
    mbti,
    zonas,
    lideranca,
    emocoes,
    confiabilidade,
    insights,
    perguntasComplementares,
  };
}
