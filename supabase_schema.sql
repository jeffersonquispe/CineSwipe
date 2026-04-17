-- Tabla para registrar likes y dislikes de películas
CREATE TABLE movie_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  user_id UUID DEFAULT NULL, 
  interaction_type TEXT CHECK (interaction_type IN ('like', 'dislike')),
  poster_path TEXT,
  vote_average FLOAT
);

-- Políticas de Seguridad (RLS)
ALTER TABLE movie_interactions ENABLE ROW LEVEL SECURITY;

-- Permitir insertar a usuarios anonimos (para demo rapida) 
CREATE POLICY "Enable insert for all users" ON movie_interactions
  FOR INSERT WITH CHECK (true);

-- Permitir lectura
CREATE POLICY "Enable read access for all" ON movie_interactions
  FOR SELECT USING (true);
