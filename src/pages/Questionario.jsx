/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAvaliacao } from '../context/AvaliacaoContext';
import { BLOCOS_PERGUNTAS, PERGUNTAS_COMPLEMENTARES } from '../utils/dados';
import { PageTransition, AnimatedItem } from '../components/animacoes/PageTransition';

const container = css`
  max-width: 700px;
  margin: 0 auto;
`;

const header = css`
  margin-bottom: 32px;
`;

const stepIndicator = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #D4AF37;
  margin-bottom: 8px;
`;

const questionTitle = css`
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: white;
  margin-bottom: 8px;
`;

const questionSubtitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #A0A0B8;
  margin-bottom: 24px;
`;

const choicesContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const choiceButton = (isSelected) => css`
  width: 100%;
  padding: 16px 20px;
  background: ${isSelected ? 'rgba(233, 69, 96, 0.15)' : '#1A1A2E'};
  border: 2px solid ${isSelected ? '#E94560' : '#252540'};
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: ${isSelected ? '#E94560' : '#3a3a5c'};
    background: ${isSelected ? 'rgba(233, 69, 96, 0.2)' : '#252540'};
  }
`;

const choiceLetter = (isSelected) => css`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${isSelected ? '#E94560' : '#252540'};
  color: ${isSelected ? 'white' : '#A0A0B8'};
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
  transition: all 0.2s ease;
`;

const choiceText = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: white;
  line-height: 1.4;
`;

const grauSection = css`
  margin-top: 24px;
  padding: 20px;
  background: #1A1A2E;
  border-radius: 12px;
`;

const grauTitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  text-align: center;
`;

const grauLabels = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #A0A0B8;
`;

const grauSlider = css`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #252540 0%, #E94560 100%);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #E94560;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(233, 69, 96, 0.4);
    transition: transform 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
`;

const grauValue = css`
  text-align: center;
  margin-top: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #E94560;
`;

const validationError = css`
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #F87171;
  text-align: center;
`;

const navButtons = css`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
`;

const perguntasContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const perguntaField = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const perguntaLabel = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #A0A0B8;
`;

const textarea = css`
  width: 100%;
  min-height: 100px;
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: white;
  background: #1A1A2E;
  border: 2px solid #252540;
  border-radius: 8px;
  outline: none;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: #6a6a8a;
  }

  &:focus {
    border-color: #E94560;
  }
`;

const selectedWord = css`
  text-align: center;
  padding: 12px;
  background: rgba(233, 69, 96, 0.1);
  border: 1px solid rgba(233, 69, 96, 0.3);
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: white;
`;

export function Questionario() {
  const navigate = useNavigate();
  const {
    respostas,
    perguntasComplementares,
    responderBloco,
    responderPerguntasComplementares,
    finalizarAvaliacao,
    carregando,
  } = useAvaliacao();

  const [blocoAtual, setBlocoAtual] = useState(0);
  const [escolha, setEscolha] = useState('');
  const [grau, setGrau] = useState(5);
  const [mostrarComplementares, setMostrarComplementares] = useState(false);
  const [complementares, setComplementares] = useState(['', '', '', '']);
  const [erro, setErro] = useState('');

  const blocosRespondidos = respostas.length;
  const totalBlocos = BLOCOS_PERGUNTAS.length;
  const bloco = BLOCOS_PERGUNTAS[blocoAtual];

  useEffect(() => {
    const respostaExistente = respostas.find(
      (r) => r.grupoId === bloco.id
    );
    if (respostaExistente) {
      setEscolha(respostaExistente.escolha);
      setGrau(respostaExistente.grau);
    } else {
      setEscolha('');
      setGrau(5);
    }
  }, [bloco.id, respostas]);

  const handleResponder = () => {
    if (!escolha) {
      setErro('Por favor, escolha uma palavra que melhor te representa');
      return;
    }

    setErro('');
    responderBloco(bloco.id, escolha, grau);

    if (blocoAtual < totalBlocos - 1) {
      setBlocoAtual(blocoAtual + 1);
    } else {
      setMostrarComplementares(true);
    }
  };

  const handleAnterior = () => {
    if (blocoAtual > 0) {
      setBlocoAtual(blocoAtual - 1);
    }
  };

  const handleComplementarChange = (index, value) => {
    const novo = [...complementares];
    novo[index] = value;
    setComplementares(novo);
  };

  const handleFinalizar = async () => {
    if (complementares.some((c) => !c.trim())) {
      setErro('Por favor, responda todas as perguntas');
      return;
    }

    setErro('');
    responderPerguntasComplementares(complementares);

    try {
      const id = await finalizarAvaliacao();
      navigate(`/resultados/${id}`);
    } catch (err) {
      setErro('Erro ao processar avaliação. Tente novamente.');
    }
  };

  if (mostrarComplementares) {
    return (
      <PageTransition>
        <div css={container}>
          <AnimatedItem>
            <div css={header}>
              <h1 css={questionTitle}>Perguntas Complementares</h1>
              <p css={questionSubtitle}>
                Responda brevemente para enriquecer sua análise
              </p>
            </div>
          </AnimatedItem>

          <Card variant="glass">
            <div css={perguntasContainer}>
              {PERGUNTAS_COMPLEMENTARES.map((pergunta, index) => (
                <div key={index} css={perguntaField}>
                  <label css={perguntaLabel}>{pergunta}</label>
                  <textarea
                    css={textarea}
                    placeholder="Digite sua resposta..."
                    value={complementares[index]}
                    onChange={(e) =>
                      handleComplementarChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {erro && <div css={validationError}>{erro}</div>}

            <div css={navButtons}>
              <Button
                variant="ghost"
                onClick={() => setMostrarComplementares(false)}
              >
                Voltar
              </Button>
              <Button
                variant="gold"
                onClick={handleFinalizar}
                loading={carregando}
              >
                Ver Resultados
              </Button>
            </div>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div css={container}>
        <div css={header}>
          <ProgressBar current={blocosRespondidos} total={totalBlocos} />
          <div css={stepIndicator}>Grupo {blocoAtual + 1} de {totalBlocos}</div>
          <h2 css={questionTitle}>{bloco.titulo}</h2>
        </div>

        <Card variant="glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={bloco.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p css={questionSubtitle}>
                Escolha a palavra que melhor te representa:
              </p>

              {erro && <div css={validationError}>{erro}</div>}

              {escolha && (
                <div css={selectedWord}>
                  Você escolheu: <strong>{bloco.opcoes[escolha]}</strong>
                </div>
              )}

              <div css={choicesContainer}>
                {Object.entries(bloco.opcoes).map(([letra, texto]) => (
                  <button
                    key={letra}
                    css={choiceButton(escolha === letra)}
                    onClick={() => setEscolha(letra)}
                  >
                    <span css={choiceLetter(escolha === letra)}>{letra}</span>
                    <span css={choiceText}>{texto}</span>
                  </button>
                ))}
              </div>

              <div css={grauSection}>
                <div css={grauTitle}>Qual o grau de adesão?</div>
                <div css={grauLabels}>
                  <span>Quase não me representa</span>
                  <span>Me representa totalmente</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={grau}
                  onChange={(e) => setGrau(parseInt(e.target.value))}
                  css={grauSlider}
                />
                <div css={grauValue}>{grau}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div css={navButtons}>
            <Button
              variant="ghost"
              onClick={handleAnterior}
              disabled={blocoAtual === 0}
            >
              ← Anterior
            </Button>
            <Button variant="primary" onClick={handleResponder}>
              {blocoAtual === totalBlocos - 1 ? 'Continuar' : 'Próximo →'}
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
