# Cómo editar el contenido del sitio

Todo el contenido del sitio web vive en esta carpeta `content/`. **No necesitas tocar código** para añadir miembros, patrocinadores, fases o galería: solo crea o edita un archivo `.md`.

Tras subir los cambios, la web se reconstruye sola.

---

## 📁 Estructura

```
content/
├── site/           ← textos generales (hero, misión, navegación, footer…)
│   ├── es.md
│   └── en.md
├── members/        ← un archivo por miembro
├── sponsors/       ← un archivo por patrocinador
├── subsystems/     ← un archivo por subsistema
├── phases/         ← un archivo por fase del cronograma
└── gallery/        ← un archivo por foto/vídeo
```

Cada archivo tiene un bloque inicial entre `---` llamado **frontmatter** con los datos, y opcionalmente texto debajo.

---

## 👥 Añadir un miembro

Crea `content/members/nombre-apellido.md`:

```markdown
---
name: "María García"
role_es: "Líder de Subsistema de Energía"
role_en: "Power Subsystem Lead"
area: "EPS"
photo: "/members/maria.jpg"   # opcional, archivo en public/members/
linkedin: "https://linkedin.com/in/maria"
order: 1                       # orden de aparición (menor = antes)
featured: true                 # aparece en la home si es true
---

Bio opcional en español.
```

Pon la foto en `public/members/maria.jpg`. Si no hay foto, se mostrarán las iniciales.

---

## 🤝 Añadir un patrocinador

Crea `content/sponsors/nombre.md`:

```markdown
---
name: "Universidad de Málaga"
logo: "/sponsors/uma.png"
url: "https://uma.es"
tier: "platinum"               # platinum | gold | silver | bronze
description_es: "Institución que respalda al equipo."
description_en: "Institution that backs the team."
order: 1
---
```

---

## 🛰️ Añadir/editar un subsistema

Crea `content/subsystems/slug.md` (el slug aparece en la URL):

```markdown
---
slug: "estructura"
icon: "Box"                    # nombre de icono lucide-react
order: 1
title_es: "Estructura"
title_en: "Structure"
short_es: "Diseño mecánico del CubeSat 1U."
short_en: "Mechanical design of the 1U CubeSat."
lead_es: "Subsistema de estructura"
lead_en: "Structure subsystem"
---

# Descripción larga en español

Texto markdown que aparecerá en la página de detalle del subsistema.

---LANG-EN---

# Long description in English

Markdown text shown on the subsystem detail page.
```

Separa la versión española y la inglesa con `---LANG-EN---`.

Iconos disponibles (lucide-react): Box, Zap, Compass, Cpu, Radio, FlaskConical, Satellite, Rocket, etc.

---

## 📅 Añadir una fase del cronograma

Crea `content/phases/01-fase.md`:

```markdown
---
order: 1
year: "2024"
status: "completed"            # completed | in-progress | upcoming
title_es: "Definición de misión"
title_en: "Mission definition"
desc_es: "Análisis de requisitos y selección de payload."
desc_en: "Requirements analysis and payload selection."
---
```

---

## 🖼️ Añadir foto/vídeo a la galería

Crea `content/gallery/nombre.md`:

```markdown
---
image: "/gallery/lanzamiento.jpg"   # o usa "video" en lugar de "image"
caption_es: "Test de vibración del prototipo"
caption_en: "Vibration test of the prototype"
category: "cubesat"                  # cubesat | events | team
date: "2024-11-20"
order: 1
---
```

Pon la imagen en `public/gallery/`.

---

## ✏️ Editar textos generales (hero, misión, footer…)

Edita `content/site/es.md` y `content/site/en.md`. **Mantén la misma estructura** en ambos idiomas.

---

## 🌐 Idiomas

El sitio funciona en **español** (URLs `/es/...`) e **inglés** (URLs `/en/...`).
Los campos terminados en `_es` se usan en la versión española y los `_en` en la inglesa.
