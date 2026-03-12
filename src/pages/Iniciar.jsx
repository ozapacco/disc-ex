/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAvaliacao } from '../context/AvaliacaoContext';
import { PageTransition, AnimatedItem } from '../components/animacoes/PageTransition';

const container = css`
  max-width: 500px;
  margin: 0 auto;
  padding-top: 40px;
`;

const header = css`
  text-align: center;
  margin-bottom: 40px;
`;

const title = css`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: white;
  margin-bottom: 12px;
`;

const subtitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #A0A0B8;
`;

const form = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const infoBox = css`
  background: rgba(233, 69, 96, 0.1);
  border: 1px solid rgba(233, 69, 96, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
`;

const infoText = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #A0A0B8;
  line-height: 1.6;

  strong {
    color: #E94560;
  }
`;

const errorText = css`
  color: #F87171;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  text-align: center;
`;

export function Iniciar() {
  const navigate = useNavigate();
  const { iniciarAvaliacao } = useAvaliacao();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim()) {
      setErro('Por favor, informe seu nome');
      return;
    }

    if (nome.trim().length < 2) {
      setErro('Nome deve ter pelo menos 2 caracteres');
      return;
    }

    setLoading(true);

    try {
      iniciarAvaliacao({ nome: nome.trim(), email: email.trim() || null });
      navigate('/questionario');
    } catch (err) {
      setErro('Erro ao iniciar avaliação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div css={container}>
        <AnimatedItem>
          <div css={header}>
            <h1 css={title}>Iniciar Avaliação</h1>
            <p css={subtitle}>
              Preencha seus dados para começar o questionário DISC
            </p>
          </div>
        </AnimatedItem>

        <AnimatedItem delay={0.1}>
          <Card variant="glass">
            <form css={form} onSubmit={handleSubmit}>
              <Input
                label="Nome completo"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <Input
                label="Email (opcional)"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div css={infoBox}>
                <p css={infoText}>
                  <strong>O que esperar:</strong> Você responderá 24 blocos de
                  perguntas sobre seu comportamento. Cada bloco contém 4
                  afirmações e você deve escolher qual mais e qual menos
                  descreve sua forma de agir.
                </p>
              </div>

              {erro && <p css={errorText}>{erro}</p>}

              <Button type="submit" loading={loading} fullWidth size="lg">
                Começar Questionário
              </Button>
            </form>
          </Card>
        </AnimatedItem>
      </div>
    </PageTransition>
  );
}
