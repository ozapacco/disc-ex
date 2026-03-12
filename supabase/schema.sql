-- Criar tabela de avaliações DISC
CREATE TABLE IF NOT EXISTS avaliacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  respostas JSONB NOT NULL,
  perfil_ajustado JSONB NOT NULL,
  perfil_natural JSONB NOT NULL,
  contraste JSONB NOT NULL,
  maturidade FLOAT NOT NULL,
  energia FLOAT NOT NULL,
  perfil_predominante TEXT NOT NULL,
  estilo_composto TEXT NOT NULL,
  valores JSONB NOT NULL,
  kolb JSONB NOT NULL,
  big_five JSONB NOT NULL,
  mbti TEXT NOT NULL,
  zonas JSONB NOT NULL,
  lideranca JSONB NOT NULL,
  emocoes JSONB NOT NULL,
  consistencia FLOAT NOT NULL,
  perguntas_complementares JSONB
);

-- Habilitar Row Level Security (opcional)
ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;

-- Política para permitir insert sem autenticação
CREATE POLICY "Allow anonymous inserts" ON avaliacoes
  FOR INSERT WITH CHECK (true);

-- Política para permitir select sem autenticação
CREATE POLICY "Allow anonymous selects" ON avaliacoes
  FOR SELECT USING (true);

-- Política para permitir update sem autenticação
CREATE POLICY "Allow anonymous updates" ON avaliacoes
  FOR UPDATE USING (true);

-- Política para permitir delete sem autenticação
CREATE POLICY "Allow anonymous deletes" ON avaliacoes
  FOR DELETE USING (true);
