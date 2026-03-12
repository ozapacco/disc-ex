/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageTransition, AnimatedItem } from '../components/animacoes/PageTransition';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heroSection = css`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(233, 69, 96, 0.08) 0%, transparent 50%);
    animation: ${fadeIn} 1s ease-out;
  }
`;

const title = css`
  font-family: 'Playfair Display', serif;
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #FFFFFF 0%, #D4AF37 50%, #FFFFFF 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
`;

const subtitle = css`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(18px, 3vw, 24px);
  color: #A0A0B8;
  max-width: 600px;
  margin-bottom: 48px;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const badge = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(233, 69, 96, 0.1);
  border: 1px solid rgba(233, 69, 96, 0.3);
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #E94560;
  margin-bottom: 24px;
  animation: ${fadeIn} 0.8s ease-out 0.1s both;
`;

const section = css`
  padding: 80px 0;
`;

const sectionTitle = css`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #D4AF37;
  text-align: center;
  margin-bottom: 48px;
`;

const featuresGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const featureCard = css`
  text-align: center;
  padding: 32px;
`;

const featureIcon = css`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, rgba(212, 175, 55, 0.2) 100%);
  border-radius: 16px;
`;

const featureTitle = css`
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: white;
  margin-bottom: 12px;
`;

const featureDesc = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #A0A0B8;
  line-height: 1.6;
`;

const ctaSection = css`
  text-align: center;
  padding: 80px 24px;
  background: linear-gradient(180deg, transparent 0%, rgba(233, 69, 96, 0.05) 100%);
  border-radius: 24px;
  margin-top: 48px;
`;

export function Landing() {
  const features = [
    {
      icon: '🎯',
      title: 'Autoconhecimento Profundo',
      desc: 'Descubra suas tendências comportamentais naturais e como você se adapta ao ambiente.',
    },
    {
      icon: '📊',
      title: 'Análise Compreensiva',
      desc: 'Integração com Big Five, Valores de Spranger e Estilos de Kolb para uma visão completa.',
    },
    {
      icon: '👥',
      title: 'Relacionamentos',
      desc: 'Entenda como se comunicar melhor com diferentes perfis e otimizar seu trabalho em equipe.',
    },
    {
      icon: '📈',
      title: 'Desenvolvimento',
      desc: 'Receba insights práticos e um mapa de desenvolvimento personalizado.',
    },
  ];

  return (
    <PageTransition>
      <div css={heroSection}>
        <motion.div
          css={badge}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          ✨ Avaliação Comportamental Avançada
        </motion.div>

        <h1 css={title}>
          Descubra seu perfil
          <br />
          comportamental
        </h1>

        <p css={subtitle}>
          Uma análise profunda baseada no modelo DISC, com integrações avançadas
          para revelar sua verdadeira essência comportamental.
        </p>

        <AnimatedItem delay={0.3}>
          <Link to="/iniciar">
            <Button size="lg" variant="gold">
              Iniciar Avaliação Grátis
            </Button>
          </Link>
        </AnimatedItem>
      </div>

      <section css={section}>
        <h2 css={sectionTitle}>O que você vai descobrir</h2>
        <div css={featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5 }}
            >
              <Card variant="glass">
                <div css={featureCard}>
                  <div css={featureIcon}>{feature.icon}</div>
                  <h3 css={featureTitle}>{feature.title}</h3>
                  <p css={featureDesc}>{feature.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div css={ctaSection}>
        <AnimatedItem>
          <h2
            css={css`
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              color: white;
              margin-bottom: 16px;
            `}
          >
            Pronto para se conhecer melhor?
          </h2>
          <p
            css={css`
              font-family: 'DM Sans', sans-serif;
              color: #A0A0B8;
              margin-bottom: 32px;
            `}
          >
            A avaliação leva cerca de 10-15 minutos
          </p>
          <Link to="/iniciar">
            <Button variant="primary" size="lg">
              Começar Agora
            </Button>
          </Link>
        </AnimatedItem>
      </div>
    </PageTransition>
  );
}
