# Preloader Redesign — Scramble-to-Name

**Date:** 2026-03-05

## Goal

Replace the current char-flip preloader with a scramble-to-name effect: the name area starts as random uppercase noise and resolves left-to-right into `BENJAMIN WAGNER`.

## Layout

- Same overlay: `fixed inset-0 z-200 bg-foreground`
- Name block: bottom-left, `clamp(3rem,7vw,9rem)`, uppercase, `tracking-[-0.04em]`, `leading-[.85]`, `text-background`
- Caption `Freelance Creative Developer`: top-left, `text-caption`, `text-background/50`

## Animation Sequence

### 1. Scramble phase (~1.2s)
- On mount, render `BENJAMIN WAGNER` with every char randomised
- Each char cycles through `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789` at ~60ms per tick
- Each char has a small random offset so they cycle out of sync (pure noise feel)
- Driven by a single `setInterval`

### 2. Resolve phase (staggered left→right, ~0.8s total)
- A `setTimeout` cascade locks each char at stagger ~0.04s apart
- On lock: char snaps to correct value + `gsap.fromTo` `y: 20 → 0`, duration 0.3s, `expo.out`
- Space character locks as a silent beat (no snap animation)
- Caption fades in during this phase (`opacity: 0→1, y: 6→0`, `power2.out`, offset `<0.2` from first lock)

### 3. Hold
- ~0.4s after last char locks, call `notifyPreloaderDone`

### 4. Exit
- `clipPath: inset(0 0 0% 0) → inset(0 0 100% 0)`, duration 1.2s, `expo.inOut`
- Fires simultaneously with `notifyPreloaderDone` (same as current)
- `onComplete`: `setVisible(false)` to unmount

## Implementation Notes

- No SplitText — pure JS char array rendered via React state
- Random char pool: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
- Track locked chars with an index; `setInterval` re-randomises only unlocked positions
- GSAP used only for per-char snap and exit wipe
- `notifyPreloaderDone` timing unchanged — page entry animation unaffected
