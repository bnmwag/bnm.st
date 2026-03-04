"use client";

import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";

export type TimelineAnimationFn = (tl: gsap.core.Timeline) => void;
export type FreeAnimationFn = () => void;
export type AnimationFn = TimelineAnimationFn | FreeAnimationFn;

interface TransitionContextType {
  setEntryAnimations: (fn: AnimationFn) => void;
  getEntryAnimations: () => AnimationFn | null;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

interface ITransitionProviderProps extends PropsWithChildren {}

export const TransitionProvider: FC<ITransitionProviderProps> = ({
  children,
}) => {
  const entryAnimations = useRef<AnimationFn | null>(null);

  return (
    <TransitionContext.Provider
      value={{
        setEntryAnimations: (fn) => {
          entryAnimations.current = fn;
        },
        getEntryAnimations: () => entryAnimations.current,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("'useTransition' must be within TransitionProvider");
  }
  return context;
};
