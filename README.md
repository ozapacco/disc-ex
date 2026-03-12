# DISC EX - Avaliação Comportamental

Aplicação web de avaliação comportamental DISC com integrações avançadas (Big Five, Valores de Spranger, Estilos de Kolb, MBTI).

## Stack

- **Frontend:** React 18 + Vite
- **Estilização:** Emotion
- **Roteamento:** React Router v6
- **Animações:** Framer Motion
- **Gráficos:** Recharts
- **Backend:** Supabase (PostgreSQL)
- **PDF:** React-PDF / html2canvas + jsPDF

## Configuração

### 1. Clone e instale dependências

```bash
cd disc-ex
npm install
```

### 2. Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o script SQL em `supabase/schema.sql` no SQL Editor do Supabase
3. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
4. Preencha as variáveis com os dados do seu projeto Supabase:
   ```
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   ```

### 3. Execute localmente

```bash
npm run dev
```

### 4. Deploy na Vercel

1. Faça push do código para GitHub
2. Importe o projeto na Vercel
3. Configure as variáveis de ambiente na Vercel
4. Deploy!

## Estrutura do Projeto

```
src/
├── components/
│   ├── animacoes/     # Componentes de transição
│   ├── layout/        # Layout principal
│   ├── ui/            # Componentes base (Button, Card, etc)
│   └── questionario/  # Componentes do questionário
├── context/          # Estado global
├── hooks/            # Custom hooks
├── pages/            # Páginas da aplicação
├── services/         # Integração Supabase
├── styles/          # Theme e estilos globais
└── utils/            # Algoritmos e dados
```

## Funcionalidades

- Questionário DISC de 24 blocos
- Cálculo de perfis Ajustado e Natural
- Derivações: Big Five, Spranger, Kolb, MBTI
- Gráficos interativos (barras, radar)
- Dashboard completo de resultados
- Design responsivo e animações sofisticadas

## Licença

MIT
