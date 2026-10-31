# Portfolio · Adrián Chozas

Portfolio personal **bilingüe (español / English)** con aspecto de videojuego arcade: pantalla de inicio *Press Start*, menú tipo consola, diálogos con mi perfil, experiencia y proyectos, música sintetizada y efecto CRT.

🌐 <https://adrianchozasportfolio.netlify.app>

## Características

- Menú principal con cuatro fases: perfil, experiencia y formación, proyectos y contacto.
- Cambio de idioma ES/EN creado desde cero, sin librerías (estado con `useSyncExternalStore` y diccionario tipado).
- Música y efectos generados con la Web Audio API.
- Accesible por teclado, respeta `prefers-reduced-motion` y se puede leer sin JavaScript.
- Exportación estática lista para Netlify.

## Tecnologías

Next.js · React · TypeScript · Tailwind CSS · pnpm · Playwright (solo para pruebas) · ESLint.

## Estructura

```text
src/app/              Rutas de Next.js (página principal, 404, imagen Open Graph)
src/modules/          Un módulo por dominio: about, contact, experience, profile, projects
src/shared/           i18n, interfaz compartida, utilidades y tipos
public/               Foto, fuentes y cabeceras de Netlify (_headers)
tests/                Pruebas de navegador, del sintetizador y de la exportación
scripts/              Empaquetado para Netlify (export-netlify.ps1)
```

## Arranque

```bash
pnpm install
pnpm dev      # http://localhost:3001
pnpm build    # compilación de producción
pnpm lint
```

## Publicar en Netlify

```powershell
pnpm export:netlify   # genera exports/portfolio-netlify.zip (Windows PowerShell)
```

Sube el ZIP a Netlify Drop. Más detalle en [EXPORT.md](EXPORT.md).

## Tests

Las pruebas usan una instalación existente de Playwright (ver [tests/README.md](tests/README.md)). Con la aplicación en marcha:

```bash
node tests/arcade-journey.mjs           # recorrido completo en 6 tamaños de pantalla
node --test tests/arcade-music.test.mjs # ciclo de vida del sintetizador
node tests/arcade-output.mjs            # audio generado (OfflineAudioContext)
node tests/static-export.mjs            # comprueba el sitio ya exportado
```

## Forma de trabajo

Desarrollo guiado por tests (TDD): cada mejora empieza con una prueba que falla, documentada en `tests/README.md`. El repositorio incluye `AGENTS.md` con las reglas para los agentes de IA que colaboran en el código, siempre con aprobación humana.

## Contacto

[LinkedIn](https://www.linkedin.com/in/adrichdev/) · [GitHub](https://github.com/AdrichDev)

---

# Portfolio · Adrián Chozas (English)

Personal **bilingual (Spanish / English)** portfolio with an arcade-game look: *Press Start* screen, console-style menu, dialogs with my profile, experience and projects, synthesised music and a CRT effect.

Built with Next.js, React, TypeScript and Tailwind CSS. Run it with `pnpm install && pnpm dev` (port 3001); build the static Netlify upload with `pnpm export:netlify`. The test commands above work the same way. Developed test-first (TDD), with browser tests at six screen sizes, keyboard navigation, reduced motion and a no-JavaScript reading mode.
