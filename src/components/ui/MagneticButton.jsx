import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const MagneticButton = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  href, 
  showArrow = false,
  ...props 
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.15);
    y.set((clientY - (top + height / 2)) * 0.15);
  };

  const reset = () => { x.set(0); y.set(0); };

  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans font-medium overflow-hidden group pressable";
  
  const variants = {
    primary: "bg-salem-ink text-white",
    secondary: "bg-salem-gold text-white shadow-gold-glow",
    outline: "border border-salem-ink/20 text-salem-ink hover:border-salem-ink",
    ghost: "text-salem-ink hover:text-salem-gold"
  };

  const fillVariants = {
    primary: "bg-salem-gold",
    secondary: "bg-salem-ink",
    outline: "bg-salem-ink",
    ghost: "bg-transparent"
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href } : {};

  return (
    <Component
      ref={ref}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...componentProps}
      {...props}
    >
      {/* Fill sweep on hover */}
      <span className={clsx(
        "absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500",
        fillVariants[variant]
      )} style={{ transitionTimingFunction: 'var(--ease-out-strong)' }} />
      
      <span className={clsx(
        "relative z-10 transition-colors duration-300",
        variant === 'outline' ? 'group-hover:text-white' : ''
      )}>
        {children}
      </span>
      
      {/* High-End: Button-in-Button trailing arrow icon */}
      {showArrow && (
        <span className="relative z-10 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 transition-transform duration-300" style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 9L9 1M9 1H3M9 1V7" />
          </svg>
        </span>
      )}
    </Component>
  );
};
