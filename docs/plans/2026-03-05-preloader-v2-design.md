# Preloader v2 — Percentage Counter + Terminal Lines

**Date:** 2026-03-05

## Layout

Dark overlay `fixed inset-0 z-200 bg-foreground p-4`, two zones:

**Bottom-left:**
- Large digit counter `000 → 100`, `clamp(5rem,10vw,13rem)`, monospaced, `text-background`
- Three digit columns (hundreds, tens, ones), each with `overflow:hidden`
- On each increment: new digit slides up (`y: 100% → 0`, `expo.out`, ~0.15s)
- Below counter: `Benjamin Wagner` in `text-caption text-background/50`

**Top-left (mid-height):**
- Terminal-style text block — lines appear one by one during loading
- Each line flips in from below (3D: `y:100%, rotateX:80, transformPerspective:300 → 0`)
- Lines tied to load progress (~every 20%):
  1. `Born 2005.`
  2. `Based in Austria.`
  3. `Obsessed with details.`
  4. `Builds for the web.`
  5. `Currently available.`
- Lines stack up, previous lines stay visible (terminal log feel)
- Text: `text-caption text-background/50`, active/latest line: `text-background`

## Real Preloading

- On mount: `document.querySelectorAll('img')` → attach `load`/`error` listeners
- `progress = loaded / total * 100`, update counter in real time
- Minimum display: 800ms (so fast connections don't flash)
- Fallback: if no images found, count 0→100 over 1.2s via RAF
- Counter animates smoothly (no jumps larger than ~5% per tick via lerp or capped increments)

## Exit

- At 100%: 300ms hold → `notifyPreloaderDone()` fires → overlay wipes up
- `clipPath: inset(0 0 0% 0) → inset(0 0 100% 0)`, 1.2s `expo.inOut`
- `onComplete`: `setVisible(false)`
