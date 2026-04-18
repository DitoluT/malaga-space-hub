
# Web del Málaga Space Team

## Visión general
Sitio web bilingüe (ES/EN) inspirado en spaceteam.uma.es, con tema oscuro espacial, fondo de estrellas, glassmorphism y acentos azules. Todo el contenido (miembros, patrocinadores, fases, subsistemas, noticias) vive en archivos Markdown fáciles de editar — añadir un miembro = crear un `.md`.

## Arquitectura de rutas
URLs separadas por idioma para mejor SEO:

- `/es` — Inicio (español, idioma por defecto)
- `/en` — Inicio (inglés)
- `/es/equipo`, `/en/team` — Equipo completo
- `/es/subsistemas/$slug`, `/en/subsystems/$slug` — Detalle de cada subsistema
- `/es/galeria`, `/en/gallery` — Galería multimedia
- `/` — redirige a `/es` (o al idioma del navegador)

Cada ruta tiene su propio `head()` con title/description/og en el idioma correspondiente.

## Secciones del Inicio
Replicando la estructura actual:
1. **Hero** — logo, lema, CTAs "Descubrir Proyecto" / "Únete"
2. **Estadísticas** — miembros, subsistemas, año, áreas
3. **Misión** — 4 pilares (Innovación, Educación, Investigación, Impacto)
4. **Cronograma** — 6 fases con estado (Completado / En progreso / Próximo)
5. **Subsistemas** — 6 tarjetas (Estructura, Energía, ADCS, CDHS, Payload, Comunicaciones) → enlace a página de detalle
6. **Equipo** — preview de miembros destacados + CTA "Ver equipo completo"
7. **Colaboradores/Patrocinadores** — tarjetas con logo, descripción, enlace
8. **Galería** — preview de fotos/vídeos
9. **Contacto** — info + formulario (mailto por ahora)

## Sistema de contenido en Markdown
Estructura en `content/`:

```
content/
  members/
    juan-perez.md          → frontmatter: name, role, area, photo, linkedin, featured
  sponsors/
    uma.md                 → frontmatter: name, logo, url, contribution, tier
  subsystems/
    estructura.md          → frontmatter: slug, icon, lead; cuerpo en MD
    energia.md
    ...
  phases/
    fase-1.md              → frontmatter: year, status, order
  gallery/
    lanzamiento-cubesat.md → frontmatter: image, video, date, category
  news/                    (preparado por si se añade después)
  site/
    es.md                  → textos del sitio (hero, misión, etc.) en español
    en.md                  → mismos textos en inglés
```

Cada archivo `.md` tiene **frontmatter bilingüe** donde aplica:
```yaml
---
name: "Juan Pérez"
role_es: "Líder de subsistema"
role_en: "Subsystem lead"
bio_es: "..."
bio_en: "..."
photo: "/members/juan.jpg"
---
```

Para añadir un miembro nuevo: crear un archivo .md en `content/members/`. Para un patrocinador: uno en `content/sponsors/`. La web lo recoge automáticamente.

## Internacionalización
- Cambio de idioma vía botón ES/EN en el header → enlaza a la ruta equivalente en el otro idioma
- Detección inicial del idioma del navegador en la raíz `/`
- Todos los textos de UI en `content/site/es.md` y `content/site/en.md`
- Textos del contenido (miembros, subsistemas) leídos del campo `_es` o `_en` del frontmatter

## Diseño visual
- **Tema oscuro** con fondo negro espacial y estrellas animadas sutiles (CSS)
- **Glassmorphism**: tarjetas semi-transparentes con `backdrop-blur` y borde luminoso
- **Acento principal** azul (similar al actual) y verde para CTAs secundarios
- **Tipografía**: sans-serif moderna (Inter), titulares en mayúscula con tracking amplio
- **Animaciones de scroll** suaves con `tw-animate-css`
- **Header pegajoso** con navegación + selector idioma + CTA "Únete"
- **Footer** con redes sociales, contacto, créditos UMA
- Totalmente responsive (mobile-first)

## Galería multimedia
- Cuadrícula tipo masonry con fotos y vídeos
- Filtros por categoría (CubeSat, Eventos, Equipo)
- Lightbox al hacer click
- Cada item es un `.md` en `content/gallery/`

## Stack técnico
- TanStack Start (rutas en `src/routes/`)
- Tailwind v4 + componentes shadcn ya disponibles
- Parser de Markdown + frontmatter (gray-matter + remark) en build/SSR
- Sin backend — todo estático y renderizado en SSR para SEO óptimo

## Cómo se actualiza la web (para el equipo)
1. Editar/crear archivos en la carpeta `content/`
2. Subir cambios → la web se reconstruye automáticamente
3. Documentación incluida en `content/README.md` con ejemplos de cada tipo de archivo
