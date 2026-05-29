import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const MagneticButton = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  href, 
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center px-10 py-4 text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans font-medium overflow-hidden group";
  
  const variants = {
    primary: "bg-salem-ink text-white",
    secondary: "bg-salem-gold text-white shadow-gold-glow",
    outline: "border border-salem-ink text-salem-ink",
    ghost: "text-salem-ink hover:text-salem-gold"
  };

  const innerVariants = {
    primary: "bg-salem-black",
    secondary: "bg-salem-gold-soft",
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
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      {...componentProps}
      {...props}
    >
      <span className={clsx("absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]", innerVariants[variant])}></span>
      <span className={clsx("relative z-10 transition-colors duration-500", variant === 'outline' ? 'group-hover:text-white' : '')}>
        {children}
      </span>
    </Component>
  );
};
