# Script de lanzamiento para Supabase MCP
# Carga las credenciales del entorno y lanza el servidor

$SUPABASE_URL = "https://vsycxrikyuhlekhmjqoz.supabase.co"
$SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeWN4cmlreXVobGVraG1qcW96Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ1NTU4NiwiZXhwIjoyMDkyMDMxNTg2fQ.mVeDci4bwc6sppR77wPITEUe86WmCjrfV3C9sh8gIJ0"

echo "Lanzando Supabase MCP Server..."
$env:SUPABASE_URL = $SUPABASE_URL
$env:SUPABASE_SERVICE_ROLE_KEY = $SUPABASE_SERVICE_ROLE_KEY

npx -y @supabase/mcp-server-supabase@latest
