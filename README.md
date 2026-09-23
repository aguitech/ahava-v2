# AHAVA Corporativo v2 — Premium Balance

Tercera versión del sitio AHAVA. Lo mejor de la versión 1 (formalismo, estructura
clara, hover reveal de servicios) **+** refinamientos visuales del rediseño
cinematográfico (micro-animaciones, gradient borders, parallax sutil, scroll
indicator) — sin sobre-diseño.

🌐 **Sitio en vivo:** https://aguitech.github.io/ahava-v2/
📦 **Otras versiones:**
- [aguitech/ahava](https://github.com/aguitech/ahava) — Réplica fiel del original
- [aguitech/ahava-redesign](https://github.com/aguitech/ahava-redesign) — Editorial cinematográfico

## Concepto

"Premium Balance" — la versión que un cliente corporativo senior aprueba sin
pedir cambios. Toma lo que gustó del v1 y le añade capas de sofisticación que
se sienten naturales, no forzadas. Sin 3D, sin film grain, sin sticky-stack —
solo detalles que suman.

## Lo que se mantiene del v1

- Hero con video de fondo + título manuscrito Dancing Script
- Servicios con **hover image-reveal** (lo que más te gustó)
- Strip "+18 Años" con gradient navy → blue
- Nosotros con foto + 4 stats animados
- Ventajas en fondo navy
- Clientes con 8 cards + counter "+50"
- Form de contacto completo con localStorage

## Lo nuevo en v2

### Micro-animaciones sutiles
- **Title shine** — gradient animado en "tu Negocio" del hero (cyan shimmer infinito)
- **Pulse dot** — punto cyan pulsante en el badge del hero
- **Scroll indicator** — línea vertical con efecto "ping-pong" en la parte inferior del hero
- **Brand logo** — rotación sutil -3° + scale al hover
- **Btn contact** — gradient overlay reveal on hover
- **Stat cards** — border-left cyan gradient que se revela en hover

### Detalles visuales nuevos
- **Eyebrows con líneas decorativas** (`::before` y `::after`) — sello editorial
- **Service numbers** — "01/06", "02/06"... en cada card de servicio
- **Floating stat en nosotros** — badge "18+ Años" con glass effect sobre la foto
- **Parallax sutil** — la foto de nosotros se mueve con el scroll
- **Service arrow rotativo** — el ↗ rota -45° en hover
- **Inputs con background tint** — fondo `#fafeff` al focus (feedback inmediato)
- **Select custom** — chevron cyan SVG inline

### Refinamientos de paleta
- Mismo navy/cyan del v1, **+ glow shadows** en elementos clave
- **Gold accent** (`--gold-400: #e0bd4a`) en el star del hero badge

## Stack

- **HTML5 + CSS3 + Vanilla JS** — cero build, cero npm
- **Tipografía:** Inter (UI) + Dancing Script (display manuscrito)
- **Deploy:** GitHub Pages desde `docs/`

## Estructura

```
ahava-v2/
├── docs/
│   ├── index.html              # 8 secciones
│   └── assets/
│       ├── styles.css          # 32KB — design system
│       ├── app.js              # Nav, reveal, form, counters, parallax
│       ├── img/                # 6 fotos + logo
│       ├── clientes/           # 8 logos
│       ├── iconos/             # 5 iconos
│       └── videos/             # Hero video
└── README.md
```

## Secciones

1. **Hero** — video + título manuscrito con shine + 2 CTAs + scroll indicator
2. **Filosofía** — 3 cards con números gradient circulares
3. **Servicios** — 6 cards con hover reveal + número de frame (01/06)
4. **Experience Strip** — gradient navy + CTA
5. **Nosotros** — foto con badge + floating stat parallax + 4 contadores
6. **Ventajas** — 5 cards navy + CTA integrado
7. **Clientes** — 8 logos + counter "+50" con pulse glow
8. **Contacto** — info cards + form completo

## Desarrollo local

```bash
cd docs && python3 -m http.server 8080
```

## Deploy

GitHub Pages: rama `main` → carpeta `docs/`.

## Créditos

Diseño y desarrollo por **AGUITECH** · Ingeniería + Diseño + Sistemas
