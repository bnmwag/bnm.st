# Preloader Scramble-to-Name Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the char-flip preloader with a scramble-to-name effect where `BENJAMIN WAGNER` starts as random uppercase noise and resolves left-to-right.

**Architecture:** Pure React state drives the displayed chars. A single `setInterval` randomises unlocked positions. A `setTimeout` cascade locks each char in order, triggering a GSAP per-char snap. GSAP handles only the char snap and the exit wipe — no SplitText.

**Tech Stack:** React, GSAP (already imported via `@/lib/gsap`), Tailwind, Next.js portal

---

### Task 1: Rewrite `preloader.tsx`

**Files:**
- Modify: `src/components/layout/preloader.tsx`

The entire component is self-contained — replace it wholesale.

**Step 1: Replace the file contents**

```tsx
"use client";

import { useTransition } from "@/features/page-transitions/context/page-transition.context";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAME = "BENJAMIN WAGNER";
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SCRAMBLE_INTERVAL = 60;   // ms between random ticks
const LOCK_STAGGER = 40;        // ms between each char locking
const HOLD_AFTER_LOCK = 400;    // ms hold before exit wipe starts

function randomChar() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export const Preloader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  // Displayed chars — start fully scrambled (spaces preserved)
  const [chars, setChars] = useState<string[]>(() =>
    NAME.split("").map((c) => (c === " " ? " " : randomChar())),
  );

  const { notifyPreloaderDone } = useTransition();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !overlayRef.current || !captionRef.current) return;

    const lockedUpTo = { current: -1 };
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // ── Scramble interval — randomises every unlocked char ──────────────────
    const interval = setInterval(() => {
      setChars((prev) =>
        prev.map((c, i) => {
          if (c === " " || i <= lockedUpTo.current) return c;
          return randomChar();
        }),
      );
    }, SCRAMBLE_INTERVAL);

    // ── Caption fade-in ──────────────────────────────────────────────────────
    gsap.set(captionRef.current, { opacity: 0, y: 6 });
    gsap.to(captionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out",
    });

    // ── Lock chars left → right ──────────────────────────────────────────────
    const lockable = NAME.split("").reduce<number[]>((acc, c, i) => {
      if (c !== " ") acc.push(i);
      return acc;
    }, []);

    lockable.forEach((charIndex, order) => {
      const t = setTimeout(
        () => {
          lockedUpTo.current = charIndex;

          // Snap char to correct value
          setChars((prev) => {
            const next = [...prev];
            next[charIndex] = NAME[charIndex];
            return next;
          });

          // Physical pop on the span
          const el = charRefs.current[charIndex];
          if (el) {
            gsap.fromTo(
              el,
              { y: 16 },
              { y: 0, duration: 0.28, ease: "expo.out", force3D: true },
            );
          }

          // After the last char locks, hold then exit
          if (order === lockable.length - 1) {
            const exitT = setTimeout(() => {
              notifyPreloaderDone();
              if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                  clipPath: "inset(0 0 100% 0)",
                  duration: 1.2,
                  ease: "expo.inOut",
                  onComplete: () => setVisible(false),
                });
              }
            }, HOLD_AFTER_LOCK);
            timeouts.push(exitT);
          }
        },
        // Start locking after ~1.2s of scramble
        1200 + order * LOCK_STAGGER,
      );
      timeouts.push(t);
    });

    return () => {
      clearInterval(interval);
      for (const t of timeouts) clearTimeout(t);
    };
  }, [mounted]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 flex flex-col justify-between p-4 bg-foreground"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <span ref={captionRef} className="text-caption uppercase text-background/50">
        Freelance Creative Developer
      </span>

      <div
        className="uppercase leading-[.85] tracking-[-0.04em] text-background text-[clamp(3rem,7vw,9rem)]"
        aria-label={NAME}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            className="inline-block"
            aria-hidden="true"
          >
            {c}
          </span>
        ))}
      </div>
    </div>,
    document.body,
  );
};
```

**Step 2: Verify in browser**

- Hard-reload the page
- Expected: chars scramble for ~1.2s, then lock left-to-right with a small pop, hold 0.4s, wipe up
- Page entry animation should start at same time as wipe (unchanged)
- No console errors

**Step 3: Commit**

```bash
git add src/components/layout/preloader.tsx
git commit -m "feat: scramble-to-name preloader"
```
