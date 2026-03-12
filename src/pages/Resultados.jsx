/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Cell,
} from 'recharts';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { buscarAvaliacao } from '../services/supabase';
import { classificarIntensidade } from '../utils/algoritmos';
import { PageTransition, AnimatedItem, AnimatedSection } from '../components/animacoes/PageTransition';

const container = css`
  max-width: 900px;
  margin: 0 auto;
`;

const header = css`
  text-align: center;
  margin-bottom: 48px;
`;

const title = css`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: white;
  margin-bottom: 8px;
`;

const subtitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #A0A0B8;
`;

const perfilBadge = css`
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, #E94560 0%, #FF6B6B 100%);
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-top: 16px;
`;

const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const chartContainer = css`
  height: 300px;
  margin-top: 16px;
`;

const chartTitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #A0A0B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const statGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const statCard = css`
  text-align: center;
  padding: 16px;
  background: #1A1A2E;
  border-radius: 12px;
`;

const statValue = css`
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #D4AF37;
`;

const statLabel = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #A0A0B8;
  margin-top: 4px;
`;

const barContainer = css`
  height: 280px;
`;

const discColors = {
  D: '#E94560',
  I: '#F59E0B',
  S: '#10B981',
  C: '#3B82F6',
};

const discLabels = {
  D: 'Dominância',
  I: 'Influência',
  S: 'Estabilidade',
  C: 'Conformidade',
};

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #252540;
  }

  th {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #A0A0B8;
    text-transform: uppercase;
  }

  td {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: white;
  }
`;

const listStyles = css`
  list-style: none;
  padding: 0;
  margin: 16px 0;

  li {
    padding: 12px 0;
    border-bottom: 1px solid #252540;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #A0A0B8;
    display: flex;
    align-items: center;
    gap: 12px;

    &:last-child {
      border-bottom: none;
    }

    strong {
      color: white;
    }
  }
`;

const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const errorContainer = css`
  text-align: center;
  padding: 48px;
`;

const CUSTOME_TOOLTIP = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1A1A2E',
          padding: '12px 16px',
          border: '1px solid #E94560',
          borderRadius: '8px',
        }}
      >
        <p style={{ color: '#A0A0B8', fontSize: '12px', marginBottom: '4px' }}>
          {label}
        </p>
        <p style={{ color: '#E94560', fontWeight: 'bold', fontSize: '16px' }}>
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function Resultados() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await buscarAvaliacao(id);
        setDados(data);
      } catch (err) {
        setErro('Erro ao carregar resultados');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div css={loadingContainer}>
          <div
            css={css`
              font-family: 'DM Sans', sans-serif;
              color: #a0a0b8;
            `}
          >
            Carregando resultados...
          </div>
        </div>
      </PageTransition>
    );
  }

  if (erro || !dados) {
    return (
      <PageTransition>
        <div css={errorContainer}>
          <h2
            css={css`
              color: #f87171;
              margin-bottom: 16px;
            `}
          >
            {erro || 'Resultado não encontrado'}
          </h2>
          <Link to="/iniciar">
            <Button variant="primary">Fazer Nova Avaliação</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const { perfil_ajustado, perfil_natural, consistencia, maturidade, energia, perfil_predominante, mbti, lideranca, emocoes, valores, kolb, big_five, perguntas_complementares } = dados;

  const discData = Object.entries(perfil_ajustado).map(([key, value]) => ({
    name: discLabels[key],
    short: key,
    value: Math.round(value),
    classificacao: classificarIntensidade(value),
    color: discColors[key],
  }));

  const radarData = [
    { subject: 'D', value: perfil_ajustado.D, fullMark: 100 },
    { subject: 'I', value: perfil_ajustado.I, fullMark: 100 },
    { subject: 'S', value: perfil_ajustado.S, fullMark: 100 },
    { subject: 'C', value: perfil_ajustado.C, fullMark: 100 },
    { subject: 'Maturidade', value: maturidade, fullMark: 100 },
  ];

  const contrasteData = Object.keys(perfil_ajustado).map((key) => ({
    name: discLabels[key],
    Ajustado: perfil_ajustado[key],
    Natural: perfil_natural[key],
  }));

  const bigFiveData = Object.entries(big_five).map(([key, value]) => ({
    name: key,
    value: Math.round(value),
  }));

  return (
    <PageTransition>
      <div css={container}>
        <AnimatedItem>
          <div css={header}>
            <h1 css={title}>Resultados da Avaliação</h1>
            <p css={subtitle}>
              {dados.nome} •{' '}
              {new Date(dados.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div css={perfilBadge}>{perfil_predominante} • {mbti}</div>
          </div>
        </AnimatedItem>

        <AnimatedSection title="Visão Geral">
          <div css={grid}>
            <Card variant="glass">
              <div css={chartTitle}>Perfil DISC</div>
              <div css={barContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={discData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
                    <XAxis type="number" domain={[0, 100]} stroke="#A0A0B8" />
                    <YAxis type="category" dataKey="short" stroke="#A0A0B8" width={30} />
                    <Tooltip content={<CUSTOME_TOOLTIP />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {discData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card variant="glass">
              <div css={chartTitle}>Radar Comportamental</div>
              <div css={chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#252540" />
                    <PolarAngleAxis dataKey="subject" stroke="#A0A0B8" />
                    <Radar
                      name="Perfil"
                      dataKey="value"
                      stroke="#E94560"
                      fill="#E94560"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card variant="glass">
            <div css={statGrid}>
              <div css={statCard}>
                <div css={statValue}>{maturidade}%</div>
                <div css={statLabel}>Maturidade</div>
              </div>
              <div css={statCard}>
                <div css={statValue}>{energia}%</div>
                <div css={statLabel}>Energia</div>
              </div>
              <div css={statCard}>
                <div css={statValue}>{consistencia}%</div>
                <div css={statLabel}>Confiabilidade</div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Perfil Ajustado vs Natural">
          <Card variant="glass">
            <div css={chartTitle}>Comparativo</div>
            <div css={chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contrasteData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
                  <XAxis dataKey="name" stroke="#A0A0B8" />
                  <YAxis domain={[0, 100]} stroke="#A0A0B8" />
                  <Tooltip content={<CUSTOME_TOOLTIP />} />
                  <Bar dataKey="Ajustado" fill="#E94560" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Natural" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table css={tableStyles}>
              <thead>
                <tr>
                  <th>Dimensão</th>
                  <th>Ajustado</th>
                  <th>Natural</th>
                </tr>
              </thead>
              <tbody>
                {discData.map((d) => (
                  <tr key={d.short}>
                    <td>{d.name}</td>
                    <td>{perfil_ajustado[d.short]}% ({d.classificacao})</td>
                    <td>{perfil_natural[d.short]}% ({classificarIntensidade(perfil_natural[d.short])})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Estilo de Liderança">
          <Card variant="glass">
            <div css={listStyles}>
              <li>
                <strong>Principal:</strong> {lideranca.principal} — {lideranca.descricao}
              </li>
              <li>
                <strong>Secundário:</strong> {lideranca.secundario}
              </li>
              <li>
                <strong>Foco:</strong> {lideranca.foco}
              </li>
              <li>
                <strong>Ideal para:</strong> {lideranca.idealPara}
              </li>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Mapa Emocional">
          <Card variant="glass">
            <div css={listStyles}>
              <li>
                <strong>Emoção Central:</strong> {emocoes.emocaoCentral}
              </li>
              <li>
                <strong>Associadas:</strong> {emocoes.emocoesAssociadas.join(', ')}
              </li>
              <li>
                <strong>Riscos:</strong> {emocoes.riscosEmocionais.join(', ')}
              </li>
              <li>
                <strong>Equilíbrio:</strong> {emocoes.equilibrioEmocional}%
              </li>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Valores (Spranger)">
          <Card variant="glass">
            <div css={chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(valores).map(([k, v]) => ({ name: k, value: Math.round(v) }))} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
                  <XAxis type="number" domain={[0, 40]} stroke="#A0A0B8" />
                  <YAxis type="category" dataKey="name" stroke="#A0A0B8" width={100} />
                  <Tooltip content={<CUSTOME_TOOLTIP />} />
                  <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Big Five">
          <Card variant="glass">
            <div css={chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bigFiveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252540" />
                  <XAxis dataKey="name" stroke="#A0A0B8" />
                  <YAxis domain={[0, 100]} stroke="#A0A0B8" />
                  <Tooltip content={<CUSTOME_TOOLTIP />} />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Estilo de Aprendizagem (Kolb)">
          <Card variant="glass">
            <div css={listStyles}>
              <li><strong>Principal:</strong> {kolb.principal}</li>
              <li><strong>Secundário:</strong> {kolb.secundario}</li>
              <li><strong>Experimentando:</strong> {kolb.experimentando}%</li>
              <li><strong>Pensando:</strong> {kolb.pensando}%</li>
              <li><strong>Fazendo:</strong> {kolb.fazendo}%</li>
              <li><strong>Observando:</strong> {kolb.observando}%</li>
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection title="Suas Respostas">
          <Card variant="glass">
            {perguntas_complementares && perguntas_complementares.map((resp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <p style={{ color: '#A0A0B8', fontSize: '14px', marginBottom: '4px' }}>
                  {['Qual é seu maior desafio profissional atual?', 'O que você mais valoriza em um ambiente de trabalho?', 'Como você descreveria seu estilo de liderar ou trabalhar com outros?', 'O que te motiva a dar o seu melhor?'][i]}
                </p>
                <p style={{ color: 'white', fontSize: '15px' }}>{resp}</p>
              </div>
            ))}
          </Card>
        </AnimatedSection>

        <div style={{ textAlign: 'center', marginTop: '48px', marginBottom: '32px' }}>
          <Link to="/iniciar">
            <Button variant="outline">Fazer Nova Avaliação</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
