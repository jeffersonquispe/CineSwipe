# Registro de Errores (BUGLOG.md) - CineSwipe

Este archivo documenta los errores críticos encontrados durante el desarrollo, su causa raíz y el test de regresión que asegura que no vuelvan a ocurrir.

---

## [BUG-001] ReferenceError: IntersectionObserver is not defined

### SÍNTOMA
Al ejecutar los tests unitarios con Vitest y JSDOM, los componentes que utilizan efectos visuales de visibilidad (como `SwipeCard`) fallan inmediatamente y detienen la suite de pruebas.

### CAUSA RAÍZ
El entorno de ejecución **JSDOM** (utilizado por Vitest) es un simulador de DOM que no implementa APIs modernas del navegador como `IntersectionObserver`. Cuando el código de React intenta instanciar `new IntersectionObserver()`, el objeto no existe en el scope global.

### SOLUCIÓN
Se implementó un **Mock Global** en el archivo de configuración de pruebas. Este mock simula las funciones básicas (`observe`, `unobserve`, `disconnect`) para que el código de React pueda ejecutarse sin errores.

**Archivo modificado:** `src/setupTests.ts`

### TEST DE REGRESIÓN
El test en `src/pages/Discovery/Discovery.test.tsx` verifica que el componente `Discovery` (que renderiza `SwipeCard`) se monte correctamente sin lanzar excepciones.

**Comando de verificación:**
```bash
npx vitest run src/pages/Discovery/Discovery.test.tsx
```

---

## [BUG-003] MCP Server Supabase: "Unauthorized" on initialize

### SÍNTOMA
Al intentar conectar Antigravity con el MCP de Supabase, aparece el error: `Error: calling "initialize": sending "initialize": Unauthorized`.

### CAUSA RAÍZ
El servidor MCP requiere permisos de administrador para leer el esquema de la base de datos. Si solo se proporciona la `ANON_KEY` o si la `SERVICE_ROLE_KEY` es incorrecta, la inicialización falla por falta de privilegios.

### SOLUCIÓN
Es imperativo usar la **Service Role Key** (no la Anon Key) para el MCP y asegurarse de que las variables de entorno se pasen correctamente al proceso `npx`.

**Comando de ejecución corregido:**
```bash
$env:SUPABASE_URL="tu_url"; $env:SUPABASE_SERVICE_ROLE_KEY="tu_service_key"; npx @supabase/mcp-server-supabase
```

### TEST DE REGRESIÓN
La conexión es exitosa si el comando `list_tools` desde el cliente MCP devuelve la lista de funciones de Supabase.
