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
const SCRAMBLE_DURATION = 1200; // ms of scramble before chars start locking

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

  charRefs.current = [];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !overlayRef.current || !captionRef.current) return;

    const lockedUpTo = { current: -1 };
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const tweens: gsap.core.Tween[] = [];

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
    tweens.push(
      gsap.to(captionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power2.out",
      }),
    );

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
            tweens.push(
              gsap.fromTo(
                el,
                { y: 16 },
                { y: 0, duration: 0.28, ease: "expo.out", force3D: true },
              ),
            );
          }

          // After the last char locks, hold then exit
          if (order === lockable.length - 1) {
            const exitT = setTimeout(() => {
              notifyPreloaderDone();
              if (overlayRef.current) {
                tweens.push(
                  gsap.to(overlayRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    duration: 1.2,
                    ease: "expo.inOut",
                    onComplete: () => setVisible(false),
                  }),
                );
              }
            }, HOLD_AFTER_LOCK);
            timeouts.push(exitT);
          }
        },
        // Start locking after ~1.2s of scramble
        SCRAMBLE_DURATION + order * LOCK_STAGGER,
      );
      timeouts.push(t);
    });

    return () => {
      clearInterval(interval);
      for (const t of timeouts) clearTimeout(t);
      for (const tw of tweens) tw.kill();
    };
  }, [mounted, notifyPreloaderDone]);

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
