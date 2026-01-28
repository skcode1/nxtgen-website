import React, { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  children: ReactNode;
  className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-zinc-950 text-zinc-50 shadow-2xl',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-sm font-medium text-zinc-400">Terminal</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-2">{children}</div>
    </div>
  );
}

interface TypingAnimationProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function TypingAnimation({ children, className, speed = 50 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const text = typeof children === 'string' ? children : String(children);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className={cn('inline-block', className)}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">▊</span>}
    </div>
  );
}

interface AnimatedSpanProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSpan({ children, className, delay = 0 }: AnimatedSpanProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}
