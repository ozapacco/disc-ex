/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { AvaliacaoProvider } from './context/AvaliacaoContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Iniciar } from './pages/Iniciar';
import { Questionario } from './pages/Questionario';
import { Resultados } from './pages/Resultados';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0F0F1A;
    color: white;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1A1A2E;
  }

  ::-webkit-scrollbar-thumb {
    background: #3a3a5c;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #E94560;
  }

  ::selection {
    background: rgba(233, 69, 96, 0.3);
    color: white;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <AvaliacaoProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/iniciar" element={<Iniciar />} />
            <Route path="/questionario" element={<Questionario />} />
            <Route path="/resultados/:id" element={<Resultados />} />
          </Routes>
        </Layout>
      </AvaliacaoProvider>
    </BrowserRouter>
  );
}

export default App;
