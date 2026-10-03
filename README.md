# MediSimple — Sitio web

Nueva versión de [getmedisimple.com](https://www.getmedisimple.com): mismo diseño del sitio actual, con el contenido alineado al **Playbook – MediSimple** (Notion, septiembre 2026) y un botón flotante de WhatsApp.

**Sitio publicado:** https://medisimple-web.vercel.app

## Stack

Vite + React 19 + TypeScript + Tailwind CSS 4 + Motion + Lucide (el mismo stack del sitio actual).

## Correr en local

```bash
npm install
npm run dev
```

Build de producción en `dist/`:

```bash
npm run build
```

Se puede desplegar en Vercel tal cual (framework: Vite).

## Dónde cambiar cosas

| Qué | Archivo |
| --- | --- |
| Todos los textos del sitio | `src/content.ts` |
| Número de WhatsApp, link de agendamiento, logos de clientes, links legales | `src/config.ts` |
| Colores y tipografías de marca | `src/index.css` |
| Secciones | `src/components/` |

### WhatsApp

El botón flotante (abajo a la derecha) abre `wa.me/56941706406` con un mensaje prellenado. El número se puede sobrescribir con la variable de entorno `VITE_WHATSAPP_NUMBER` (ver `.env.example`). Si la página tiene el píxel de Meta cargado, el clic registra un evento `Contact`.

## Secciones

1. **Hero**: socio de crecimiento en salud, "Crece en pacientes, no en likes".
2. **Video**: el sistema en acción (Wistia, el mismo video del sitio actual).
3. **Problema**: herramientas desconectadas (animación con scroll) y los problemas que resolvemos.
4. **Metodología ACR**: adquisición, conversión y recurrencia, con lo que incluye cada pilar.
5. **Cómo trabajamos**: sesión estratégica → diagnóstico ACR → implementación → ciclo mensual.
6. **Trazabilidad**: cómo medimos (anuncios + CRM + ficha clínica) e integraciones.
7. **Diferencia**: agencias tradicionales vs. MediSimple.
8. **Planes**: Growth Partner y ACR + mensualidad (sin precios) y especialidades.
9. **Clientes**: carrusel de logos.
10. **CTA final** y footer.

## Contenido: criterios

- Basado en el Playbook. **No se publican precios ni cifras de clientes**: el playbook las marca como información interna. Los casos de éxito se pueden sumar si se aprueban, siempre diciendo cómo se midieron.
- Tono de marca: de tú, español de Chile, cálido y preciso. Sin clichés de IA y sin prometer resultados.
- Los CTA apuntan a `getmedisimple.com/agendar` y conservan los parámetros UTM de la visita.
- El sitio actual tiene versión en inglés; esta versión es solo en español.
