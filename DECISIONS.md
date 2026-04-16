# Architecture Decision Records (ADRs) - CineSwipe Fase 1

Este documento detalla orgánicamente las decisiones arquitectónicas tomadas de forma colaborativa durante la Fase 1 del desarrollo de **CineSwipe**, diseñado para ser revisado por todo el equipo técnico y como pilar principal justificativo previo a la evaluación del Capstone Project.

## Tabla de Resumen
| ID | Tema de Decisión | Resolución Adoptada |
|-----|------|-----------------|
| ADR-001 | Gestión de Estado Global | Usar y configurar React Context + `useReducer` nativo |
| ADR-002 | Manejo de Gestos | Emplear `Pointer Events` sintéticos "vanilla" |
| ADR-003 | Búsqueda y Catálogos | Consumir la API V3 de TMDB (The Movie DB) |
| ADR-004 | Desarrollo Asistido | Delegación arquitectónica y de boilerplate al Agente IA vs Input Dirigido |

---

## ADR-001: React Context sobre Zustand/Redux

**Contexto:**
El proyecto demanda persistir un historial de métricas rápidas (Likes/Dislikes) de hasta 50 películas, evitar el "prop-drilling" caótico en los distintos niveles de las páginas (Home vs Discovery) y manipular configuraciones simples como el filtrado de género/año. Todo ello sincronizado contra `localStorage`.

**Decisión:**
Se definió el patrón **React Context API API acoplada mediante `useReducer`** aislando totalmente el proveedor de Estado (Read) del proveedor del Despachador (Write/Actions).

**Consecuencias Positivas:**
- Evitamos añadir peso externo o dependencias empaquetadas al `bundle` final para los usuarios.
- Separar la lectura de las acciones (`Dispatch`) protegió a componentes visuales estáticos de renderizados innecesarios o parpadeos gráficos, cumpliendo nuestro objetivo de usar `useMemo` orgánico.
- Excelente maniobrabilidad didáctica.

**Consecuencias Negativas:**
- Genera un considerable *boiler-plate* o repetitividad (se necesitan archivos y configuraciones gigantescas al montar Custom Hooks validadores y el propio Store Root) si lo comparamos a la función genérica `create()` en Zustand. 
- Implementar la persistencia síncrona nos obligó a asumir latencia directa al serializar a JSON en bloque para `localStorage` desde un `useEffect`.

**Alternativas Consideradas:**
- **Zustand**: Descartada por ahora bajo la premisa de probar los huesos de React; pudo haber simplificado masivamente el archivo `MovieContext.tsx`.
- **Redux Toolkit**: Brutal para estas exigencias y completamente exagerado ("Over-engineering") sobre todo cuando no existe complejidad masiva derivada.

---

## ADR-002: Pointer Events nativos sobre librerías de gestos

**Contexto:**
La joya técnica (`SwipeCard`) amerita que puedas tirar la película a la izquierda o derecha en simulaciones que reaccionen por igual en ratones USB o pantallas capacitivas multitáctiles de dispositivos inteligentes, calculando ángulos y umbrales.

**Decisión:**
Se prefirió fabricar el tracking asíncrono con React y **API de Punteros Nativos (`onPointerDown`, `onPointerMove`, `etc`)**, absteniéndonos de módulos externos; combinando estilos de cálculo con Tailwind estricto.

**Consecuencias Positivas:**
- Nula retención frente a posibles "abandonos" e incompatibilidades si una librería de animaciones se vuelve obsoleta.
- Comprensión subyacente fenomenal de cómo los navegadores manejan las "Capturas del Puntero" (`setPointerCapture`) salvando los cuellos de botella cuando el mouse salía de rango.

**Consecuencias Negativas:**
- El soporte a casos límite (edge cases) como gestos multitáctiles o "pinzamiento" (`Pinch`), quedan desatendidos.
- Nuestra validación actual solo se fía de un número X (`80px`), sin considerar la aceleración real intermedio. (Si sueltas el "flick" a 75px a 200km/h con el dedo, fallará al retornar al centro).

**Alternativas Consideradas:**
- **@use-gesture/react**: Muy capaz, pero descartado en este instante debido al valor técnico y al reto propuesto en `[RES]` del plan formativo.
- **Framer Motion `useDrag`**: Inmensamente superior para cálculos combinados (resortes físicos), pero descartado porque queríamos reducir el tiempo de carga móvil al no exportar una dependencia pesadísima de `~30kb+ gzip`.

---

## ADR-003: API de TMDB v3 sobre otras fuentes homólogas

**Contexto:**
Buscábamos una base de datos pública y robusta capaz de otorgar pósteres variados, sistemas de popularidad e identificar si algo es para adultos. Deberíamos poder solicitarle "Dime películas del 2024 de Acción".

**Decisión:**
La plataforma escogida es **The Movie Database (TMDB v3)**.

**Consecuencias Positivas:**
- Facilidad intrínseca para aplicar la técnica de filtros con `URLSearchParams` a los Endpoint como `discover/movie`. 
- Paginación construida en el núcleo nativamente (Total results y pages expuestos).
- Data fuertemente tipada vía TypeScript en nuestra app.

**Consecuencias Negativas:**
- TMDB nos obligó a manejar un control estricto de Errores `429 Too Many Requests` porque su "Rate Limiting" es riguroso.
- Dificulta la simpleza de imagen: Las URLs retornadas por TMDB solo incluyen un hash `\asdf.jpg`, forzando a anexar en duro el protocolo e injertarlo.

**Alternativas Consideradas:**
- **OMDb API (Open Movie DB)**: Omitida porque destaca primordialmente al buscar nombres directos o perfiles completos de un título (`/t=Batman`), fracasa estrepitosamente proveer paginas enteras relacionales sin buscar.
- **IMDb APIs extraoficiales**: Peligrosamente débiles si IMDb modera su sistema público, con tiempos de respuesta horribles no propicias para swipes veloces. 

---

## ADR-004: Tareas delegadas al Agente vs. Manuales

**Contexto:**
Teníamos que crear una gran cantidad de ficheros modulares y componentes sólidos cumpliendo pautas estrictas y preestablecidas desde la planificación.

**Decisión:**
Delegamos directamente el **"scaffolding" del proyecto (arquitecturas, context reducers crudos, documentaciones exhaustivas, tipados strict TS) a la IA (Antigravity)**, mientras conservamos la formulación de constraints, la dictadura sobre el límite de dependencias, auditoría de bugs reactivos y la manipulación final de variables secretas de entrono (API Keys) estrcitamente bajo el dominio **Manual del Desarrollador (Humano)**.

**Consecuencias Positivas:**
- Generó un producto estable libre de `SyntaxErrors` en una fracción del tiempo estimado originalizado para el Sprint / Fase 1.
- Documentó y estructuró explicaciones lógicas in-line en todo el proyecto asegurando su portabilidad total.

**Consecuencias Negativas:**
- Posibles cajas negras (Ej: se debe gastar tiempo re-estudiando la estructura delegada para poder defenderla frente a los evaluadores del Capstone Project y no parecer "extranjero" en tu propia *App*).

**Alternativas Consideradas:**
- **Code-Monkeying manual (Construcción tradicional Cero Asistencias)**: Imposible y de poco valor dadas las exigencias modernas y el apretado cronograma.
- **Prompt Simple sin Límites ("Hazme un Tinder para Netflix")**: Negativo. Hubiera insertado librerías indeseadas en el `package.json` destrozando completamente los *Guidelines* de las Tareas [RES]. 

---

## Próximas Decisiones Pendientes (Para Fase 2)

1. **Estrategia de Persistencia Cloud:** Reevaluar si seguir atados a `localStorage` (Limitante a nivel de dispositivo único) o delegar el guardado a Firebase/Supabase para *Syncing* multiplataforma.
2. **Debouncers frente al Hook TMDB:** Decidir si crear un `useDebounce` ante la manipulación rápida de filtros del Frontend, para evitar saturar agresivamente los requests hacia TMDB al oprimir 3 filtros simultáneos.
3. **Manejo del DOM Exhausto (Windowing):** Si la sesión se alarga a `> 300 Swipes`, decidir si incluir un `IntersectionObserver` o "React Window" virtualizando la pila inferior para salvaguardar la memoria RAM en los navegadores móviles más modestos.
4. **Físicas y Animaciones Reales:** Explorar el uso de librerías CSS externas que soporten matemáticas inerciales, tras haber aprobado satisfactoriamente los requerimientos nativos limitadores en la Fase 1.
