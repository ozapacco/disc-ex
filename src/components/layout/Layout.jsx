/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const layoutStyles = css`
  min-height: 100vh;
  background: #0F0F1A;
  color: white;
`;

const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 15, 26, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const headerContent = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const logoStyles = css`
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: #E94560;
  }
`;

const navStyles = css`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const navLinkStyles = (isActive) => css`
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: ${isActive ? '#E94560' : '#A0A0B8'};
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: white;
  }

  ${isActive &&
  css`
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #E94560;
    }
  `}
`;

const mainStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const mobileMenuButton = css`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const mobileMenu = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: #1A1A2E;
  padding: 80px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 99;
`;

const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 98;
`;

export function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/iniciar', label: 'Iniciar Avaliação' },
  ];

  return (
    <div css={layoutStyles}>
      <header css={headerStyles}>
        <div css={headerContent}>
          <Link to="/" css={logoStyles}>
            DISC <span>EX</span>
          </Link>

          <nav css={navStyles}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                css={navLinkStyles(location.pathname === item.path)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            css={mobileMenuButton}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <motion.div
            css={overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            css={mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                css={navLinkStyles(location.pathname === item.path)}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        </>
      )}

      <main css={mainStyles}>{children}</main>
    </div>
  );
}
