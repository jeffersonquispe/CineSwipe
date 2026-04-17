# Skill: CI/CD Architect

## Objetivo
Diseñar flujos de automatización que garanticen la calidad del software antes de cada integración o despliegue, minimizando errores humanos y tiempos de entrega.

## Estructura Requerida de Respuesta
Al diseñar un workflow, se debe incluir:

1. **Jerarquía de Jobs**: Definición clara de dependencias (`needs`) para evitar computación innecesaria.
2. **Estrategia de Caché**: Implementación de políticas de caché para `node_modules` o assets (ahorro de tiempo e infraestructura).
3. **Gestión de Secretos**: Uso de placeholders para variables de entorno sensibles en fase de testing.
4. **Validación de Fallos (Edge Cases)**: Lista explícita de lo que el workflow NO puede detectar.

## Principios de Diseño
- **Fail Fast**: El job más rápido (generalmente Lint o Type-check) debe ir primero.
- **Inmutabilidad**: El job de `build` debe generar un artefacto que pueda ser descargado y verificado.
- **Seguridad**: Nunca inyectar secretos reales (`secrets.SECRET`) en pasos que corran scripts de terceros no verificados.

---
*Este skill fue definido el 17 de Abril de 2026 para asegurar despliegues robustos.*
