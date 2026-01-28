'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useMemo, useRef, useState, type HTMLAttributes } from 'react';

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div className={cn('relative w-full overflow-hidden', className)} {...props} />
);

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'left' | 'right';
  speed?: number;
  loop?: number;
  autoFill?: boolean;
  pauseOnHover?: boolean;
  gradient?: boolean;
};

export const MarqueeContent = ({
  direction = 'left',
  speed = 40,
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  gradient = false,
  className,
  children,
  ...props
}: MarqueeContentProps) => (
  <MarqueeTrack
    direction={direction}
    speed={speed}
    loop={loop}
    autoFill={autoFill}
    pauseOnHover={pauseOnHover}
    gradient={gradient}
    className={className}
    {...props}
  >
    {children}
  </MarqueeTrack>
);

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div
    className={cn(
      'absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn('mx-2 flex-shrink-0 object-contain', className)} {...props} />
);

const MarqueeTrack = ({
  direction,
  speed,
  pauseOnHover,
  gradient,
  autoFill,
  loop,
  className,
  children,
  ...props
}: MarqueeContentProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);
  const [isPaused, setIsPaused] = useState(false);
  const childArray = useMemo(() => React.Children.toArray(children), [children]);
  const duplicatedChildren = useMemo(() => [...childArray, ...childArray], [childArray]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const calculateDuration = () => {
      const totalWidth = el.scrollWidth / 2;
      const pxPerSecond = Math.max(10, speed ?? 40);
      const nextDuration = Math.max(10, totalWidth / pxPerSecond);
      setDuration(nextDuration);
    };

    calculateDuration();
    const observer = new ResizeObserver(() => calculateDuration());
    observer.observe(el);
    return () => observer.disconnect();
  }, [speed, autoFill, loop]);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        gradient
          ? 'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent'
          : '',
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      {...props}
    >
      <div
        ref={trackRef}
        className="marquee-track flex w-max items-center gap-6"
        style={{
          animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: pauseOnHover && isPaused ? 'paused' : 'running'
        }}
      >
        {duplicatedChildren}
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
