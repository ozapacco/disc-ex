import { createContext, useContext, useState, useEffect } from 'react';
import { processarAvaliacaoCompleta } from '../utils/algoritmos';
import { salvarAvaliacao } from '../services/supabase';

const AvaliacaoContext = createContext();

export function AvaliacaoProvider({ children }) {
  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [perguntasComplementares, setPerguntasComplementares] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [avaliacaoId, setAvaliacaoId] = useState(null);

  useEffect(() => {
    const salvo = localStorage.getItem('disc_ex_progress');
    if (salvo) {
      const parsed = JSON.parse(salvo);
      if (parsed.respostas?.length > 0) {
        setRespostas(parsed.respostas);
        setDadosIniciais(parsed.dadosIniciais);
      }
    }
  }, []);

  const salvarProgresso = (novasRespostas, novosDadosIniciais) => {
    const toSave = {
      respostas: novasRespostas,
      dadosIniciais: novosDadosIniciais || dadosIniciais,
    };
    localStorage.setItem('disc_ex_progress', JSON.stringify(toSave));
  };

  const iniciarAvaliacao = (dados) => {
    setDadosIniciais(dados);
    setRespostas([]);
    setResultado(null);
    setErro(null);
  };

  const responderBloco = (grupoId, escolha, grau) => {
    const respostaExistente = respostas.find(r => r.grupoId === grupoId);
    
    let novasRespostas;
    if (respostaExistente) {
      novasRespostas = respostas.map((r) =>
        r.grupoId === grupoId ? { grupoId, escolha, grau } : r
      );
    } else {
      const novaResposta = { grupoId, escolha, grau };
      novasRespostas = [...respostas, novaResposta];
    }
    
    setRespostas(novasRespostas);
    salvarProgresso(novasRespostas);
  };

  const responderPerguntasComplementares = (respostas) => {
    setPerguntasComplementares(respostas);
  };

  const finalizarAvaliacao = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const resultadoProcessado = processarAvaliacaoCompleta(
        respostas,
        perguntasComplementares
      );

      const dadosSalvar = {
        nome: dadosIniciais.nome,
        email: dadosIniciais.email || null,
        respostas: respostas,
        perfil_ajustado: resultadoProcessado.perfilAjustado,
        perfil_natural: resultadoProcessado.perfilNatural,
        contraste: resultadoProcessado.contraste,
        maturidade: resultadoProcessado.maturidade,
        energia: resultadoProcessado.energia,
        perfil_predominante: resultadoProcessado.perfilPredominante,
        estilo_composto: resultadoProcessado.estiloComposto,
        valores: resultadoProcessado.valores,
        kolb: resultadoProcessado.kolb,
        big_five: resultadoProcessado.bigFive,
        mbti: resultadoProcessado.mbti,
        zonas: resultadoProcessado.zonas,
        lideranca: resultadoProcessado.lideranca,
        emocoes: resultadoProcessado.emocoes,
        consistencia: resultadoProcessado.confiabilidade,
        perguntas_complementares: perguntasComplementares,
      };

      const saved = await salvarAvaliacao(dadosSalvar);
      setAvaliacaoId(saved.id);
      setResultado(resultadoProcessado);
      
      localStorage.removeItem('disc_ex_progress');
      
      return saved.id;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const resetar = () => {
    setDadosIniciais(null);
    setRespostas([]);
    setPerguntasComplementares([]);
    setResultado(null);
    setErro(null);
    setAvaliacaoId(null);
    localStorage.removeItem('disc_ex_progress');
  };

  return (
    <AvaliacaoContext.Provider
      value={{
        dadosIniciais,
        respostas,
        perguntasComplementares,
        resultado,
        carregando,
        erro,
        avaliacaoId,
        iniciarAvaliacao,
        responderBloco,
        responderPerguntasComplementares,
        finalizarAvaliacao,
        resetar,
      }}
    >
      {children}
    </AvaliacaoContext.Provider>
  );
}

export function useAvaliacao() {
  const context = useContext(AvaliacaoContext);
  if (!context) {
    throw new Error('useAvaliacao must be used within AvaliacaoProvider');
  }
  return context;
}
