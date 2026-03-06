# Accessibility & Reduced Motion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full `prefers-reduced-motion` support and core accessibility fixes across the site without changing anything for normal users.

**Architecture:** A shared `useReducedMotion` hook feeds JS components; a CSS media query block handles Tailwind transition/animation utilities; each animation system (GSAP, Framer Motion, Lenis, ScrambleText) gates on the preference independently. Accessibility fixes (skip link, focus styles, aria corrections, focus trap) are additive and invisible to sighted users.

**Tech Stack:** Next.js 15, React, GSAP, Framer Motion (`motion/react`), Lenis, Tailwind CSS v4.

---

### Task 1: `useReducedMotion` hook

**Files:**
- Create: `src/hooks/use-reduced-motion.ts`

**Step 1: Create the hook**

```ts
import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion via OS/browser settings.
 * Reactive — updates if the preference changes at runtime.
 */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};
```

**Step 2: Commit**
```bash
git add src/hooks/use-reduced-motion.ts
git commit -m "feat(a11y): add useReducedMotion hook"
```

---

### Task 2: CSS — reduced motion + focus-visible + skip link styles

**Files:**
- Modify: `src/app/(site)/globals.css`

**Step 1: Add to bottom of globals.css**

```css
/* Skip link — visually hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: var(--foreground);
  color: var(--background);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  transition: top 0.1s;
}
.skip-link:focus {
  top: 1rem;
}

/* Focus visible — works on top of mix-blend-difference */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

/* Reduced motion — kill all CSS transitions and animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Step 2: Commit**
```bash
git add src/app/(site)/globals.css
git commit -m "feat(a11y): add skip link, focus-visible, and reduced-motion CSS"
```

---

### Task 3: Skip link in layout

**Files:**
- Modify: `src/app/(site)/layout.tsx`

**Step 1: Add skip link as first child of `<body>`, before `<TransitionProvider>`**

```tsx
<body className={`${fonts.sans.variable} bg-black text-black`}>
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
  <TransitionProvider>
    ...
```

The `#main-content` id already exists on the main section in both `page.client.tsx` and `contact/page.client.tsx`.

**Step 2: Commit**
```bash
git add src/app/(site)/layout.tsx
git commit -m "feat(a11y): add skip to main content link"
```

---

### Task 4: Fix ScrambleText aria-hidden

**Files:**
- Modify: `src/components/scramble-text.tsx`

**Problem:** Both spans inside ScrambleText are `aria-hidden="true"`. The invisible sizing span should be readable by screen readers — it contains the actual text content.

**Step 1: Remove `aria-hidden` from the invisible span**

```tsx
return (
  <>
    <span className="invisible">{children}</span>
    <span
      ref={ref}
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      aria-hidden="true"
    >
      {display}
    </span>
  </>
);
```

The scrambled `display` span stays aria-hidden (it's noise to screen readers). The invisible span now provides the accessible text.

**Step 2: Commit**
```bash
git add src/components/scramble-text.tsx
git commit -m "fix(a11y): expose accessible text in ScrambleText"
```

---

### Task 5: ScrambleText — respect reduced motion

**Files:**
- Modify: `src/components/scramble-text.tsx`

**Step 1: Gate scramble on reduced motion preference**

```tsx
"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScramble } from "@/hooks/use-scramble";
import cn from "clsx";
import { type FC, useEffect, useRef } from "react";

interface ScrambleTextProps {
  children: string;
  className?: string;
}

export const ScrambleText: FC<ScrambleTextProps> = ({ children, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const { display, scramble, reset } = useScramble(children);

  useEffect(() => {
    if (reducedMotion) return; // skip all scramble listeners
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener("mouseenter", scramble);
    parent.addEventListener("mouseleave", reset);
    return () => {
      parent.removeEventListener("mouseenter", scramble);
      parent.removeEventListener("mouseleave", reset);
    };
  }, [scramble, reset, reducedMotion]);

  return (
    <>
      <span className="invisible">{children}</span>
      <span
        ref={ref}
        className={cn("absolute inset-0 flex items-center justify-center", className)}
        aria-hidden="true"
      >
        {reducedMotion ? children : display}
      </span>
    </>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/scramble-text.tsx
git commit -m "feat(a11y): disable ScrambleText animation for reduced motion"
```

---

### Task 6: Fix navigation — remove aria-label from non-interactive divs

**Files:**
- Modify: `src/components/layout/navigation.tsx`

**Problem:** `aria-label` on plain `<div>` elements has no effect and confuses assistive tech. The location/about info can just be descriptive text.

**Step 1: Remove `aria-label` from the two info divs**

```tsx
{/* Before */}
<div className="col-span-2 max-md:hidden" aria-label="Location">
<div className="col-span-3 max-md:hidden" aria-label="About">

{/* After */}
<div className="col-span-2 max-md:hidden">
<div className="col-span-3 max-md:hidden">
```

**Step 2: Commit**
```bash
git add src/components/layout/navigation.tsx
git commit -m "fix(a11y): remove aria-label from non-interactive nav divs"
```

---

### Task 7: Lenis — respect reduced motion

**Files:**
- Modify: `src/components/layout/lenis.tsx`

**Step 1: Detect reduced motion and set `lerp: 1` (instant, no smoothing)**

```tsx
import { useEffect, useRef } from "react";

// At the top of the Lenis component function body, before the return:
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  setPrefersReducedMotion(mq.matches);
  const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);

// In ReactLenis options:
options={{
  ...options,
  lerp: prefersReducedMotion ? 1 : (options?.lerp ?? 0.125),
  autoRaf: false,
  anchors: true,
  prevent: (node) => node?.nodeName === "VERCEL-LIVE-FEEDBACK" || node?.id === "theatrejs-studio-root",
}}
```

Also add `import { useState } from "react"` to the existing import.

**Step 2: Commit**
```bash
git add src/components/layout/lenis.tsx
git commit -m "feat(a11y): disable Lenis smooth scroll for reduced motion"
```

---

### Task 8: Preloader — respect reduced motion

**Files:**
- Modify: `src/components/layout/preloader.tsx`

**Step 1: Skip bar-wipe animation, instantly notify done and dismiss**

At the top of the main `useEffect` (after the null check):

```tsx
useEffect(() => {
  if (!mounted || !overlayRef.current || !captionRef.current) return;

  // Skip entire animation for reduced motion users
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    notifyPreloaderDone();
    setVisible(false);
    return;
  }

  // ... rest of existing animation code unchanged
}, [mounted, notifyPreloaderDone]);
```

**Step 2: Commit**
```bash
git add src/components/layout/preloader.tsx
git commit -m "feat(a11y): skip preloader animation for reduced motion"
```

---

### Task 9: Page transitions — respect reduced motion

**Files:**
- Modify: `src/features/page-transitions/components/page-transitions.tsx`

**Step 1: In the entry animation `useEffect`, skip clip-path/slide transitions and just reveal the wrapper**

At the start of `runPageAnimation`, before the existing `fn` check:

```tsx
const runPageAnimation = () => {
  if (cancelled) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wrapper = content.querySelector<HTMLElement>("[data-page-wrapper]");

  if (reducedMotion) {
    if (wrapper) gsap.set(wrapper, { opacity: 1 });
    return;
  }

  // ... rest of existing fn logic unchanged
};
```

Also in the exit animation handler (inside `handleClick`), wrap the `transition.exit(ghost)` call:

```tsx
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // No exit animation — just navigate
  ghost.remove();
  ghostRef.current = null;
} else {
  const exitTween = transition.exit(ghost);
  exitTween.eventCallback("onComplete", () => {
    if (ghostRef.current === ghost) {
      ghost.remove();
      ghostRef.current = null;
    }
  });
  exitTweenRef.current = exitTween;
}
```

And skip `setInitialState` in `useLayoutEffect` when reduced motion:

```tsx
useLayoutEffect(() => {
  // ... existing early returns ...
  if (!activeTransitionRef.current) return;

  gsap.set(content, { clearProps: "clipPath,x,y,scale,opacity" });

  // Skip clip-path hide for reduced motion — wrapper will just be opacity:0 from Tailwind
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    activeTransitionRef.current.setInitialState(content);
  }
}, [pathname]);
```

**Step 2: Commit**
```bash
git add src/features/page-transitions/components/page-transitions.tsx
git commit -m "feat(a11y): skip page transition animations for reduced motion"
```

---

### Task 10: Info panel — reduced motion + focus trap

**Files:**
- Modify: `src/components/layout/info.tsx`

**Step 1: Reduced motion — instant open/close**

In the pathname `useEffect` where animations run, gate on reduced motion:

```tsx
if (pathname === "/info") {
  isAnimatingOut.current = false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(content.current, { clipPath: "inset(0 0 0% 0)", pointerEvents: "auto" });
    gsap.set(blend.current, { opacity: 1, pointerEvents: "auto" });
    return;
  }

  // ... existing animated open code unchanged
}

// Close path:
if (!isAnimatingOut.current) {
  isAnimatingOut.current = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(content.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set(blend.current, { opacity: 0, pointerEvents: "none" });
    return;
  }

  // ... existing animated close code unchanged
}
```

Same gate in `handleBack`:

```tsx
const handleBack = () => {
  if (isAnimatingOut.current) return;
  isAnimatingOut.current = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(content.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set(blend.current, { opacity: 0, pointerEvents: "none" });
    router.back();
    return;
  }

  // ... existing animated close code unchanged
};
```

**Step 2: Focus trap + focus management**

Add refs and logic:

```tsx
const triggerRef = useRef<Element | null>(null); // element that opened the panel

// On open: save trigger, move focus into panel
useEffect(() => {
  if (!mounted) return;
  if (pathname === "/info") {
    triggerRef.current = document.activeElement;
    // Move focus to the panel after animation settles
    const timer = setTimeout(() => {
      content.current?.focus();
    }, pathname === "/info" ? 300 : 0);
    return () => clearTimeout(timer);
  }
}, [mounted, pathname]);

// On close: return focus to trigger
// Add to handleBack after router.back():
// (triggerRef.current as HTMLElement)?.focus();
```

Add `tabIndex={-1}` to the `<aside>` so it's programmatically focusable:
```tsx
<aside
  ref={content}
  tabIndex={-1}
  ...
>
```

Add a basic focus trap inside the panel using `keydown` on the aside:
```tsx
onKeyDown={(e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    handleBack();
    return;
  }
  if (e.key !== "Tab") return;
  const focusable = content.current?.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable?.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}}
```

**Step 3: Commit**
```bash
git add src/components/layout/info.tsx
git commit -m "feat(a11y): reduced motion + focus trap in info panel"
```

---

### Task 11: Index page — Framer Motion reduced motion

**Files:**
- Modify: `src/app/(site)/[...slug]/page.client.tsx`

**Step 1: Use `useReducedMotion` from `motion/react` to disable hover image animations**

```tsx
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Inside IndexPageClient:
const shouldReduceMotion = useReducedMotion();

// On the hover image motion.div, conditionally disable transition:
<motion.div
  animate={{
    filter: hoverStack.length > 0 ? "blur(0px)" : "blur(120px)",
    opacity: hoverStack.length > 0 ? 1 : 0,
    pointerEvents: hoverStack.length > 0 ? "auto" : "none",
  }}
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.64, ease: [0.87, 0, 0.13, 1] }}
  ...
>

// On each image motion.div inside AnimatePresence:
<motion.div
  ...
  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.64, ease: [0.87, 0, 0.13, 1] }}
>
```

**Step 2: Skip GSAP bar-wipe entry animation**

At the top of the `setEntryAnimations` callback:

```tsx
setEntryAnimations(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // ... rest of existing animation code unchanged
});
```

**Step 3: Commit**
```bash
git add src/app/(site)/[...slug]/page.client.tsx
git commit -m "feat(a11y): disable index page animations for reduced motion"
```

---

### Task 12: Contact page — reduced motion

**Files:**
- Modify: `src/app/(site)/contact/page.client.tsx`

**Step 1: Skip GSAP entry animation**

```tsx
setEntryAnimations(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // ... rest of existing animation code unchanged
});
```

**Step 2: Disable Framer Motion on ErrorMessage and form transitions**

```tsx
import { useReducedMotion } from "motion/react";

// Inside ContactPageClient:
const shouldReduceMotion = useReducedMotion();

// ErrorMessage — pass through:
const ErrorMessage: FC<{ message?: string; reducedMotion?: boolean }> = ({ message, reducedMotion }) => (
  <AnimatePresence>
    {message && (
      <motion.span
        initial={reducedMotion ? false : { opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={reducedMotion ? {} : { opacity: 0, y: -4, height: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
        className="mt-1.5 block overflow-hidden text-caption text-rose-600"
      >
        {message}
      </motion.span>
    )}
  </AnimatePresence>
);

// Success state motion.div and form motion.form — set transition to duration:0:
transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
```

**Step 3: Commit**
```bash
git add src/app/(site)/contact/page.client.tsx
git commit -m "feat(a11y): disable contact page animations for reduced motion"
```

---

### Task 13: Final verification

**Step 1: Test with DevTools**
- Open Chrome DevTools → Rendering tab → check "Emulate CSS media feature prefers-reduced-motion: reduce"
- Verify: no bar wipes, no scramble, no clip-path transitions, instant page changes, Lenis scroll is immediate
- Verify: normal users see zero difference (disable the emulation)

**Step 2: Test keyboard navigation**
- Tab through the page, check all interactive elements are reachable
- Focus the skip link (first Tab press) — verify it appears and jumps to `#main-content`
- Open info panel, verify Tab stays within the panel, Escape closes it

**Step 3: Final commit**
```bash
git add -A
git commit -m "chore(a11y): verify accessibility and reduced motion pass"
```
