import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SalemButton = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick, 
  href, 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 font-sans font-medium";
  
  const variants = {
    primary: "bg-salem-black text-white hover:bg-salem-black-soft",
    secondary: "bg-salem-gold text-white hover:bg-salem-gold-light shadow-gold-glow",
    outline: "border border-salem-black text-salem-black hover:bg-salem-black hover:text-white",
    ghost: "text-salem-black hover:text-salem-gold"
  };

  const Component = href ? 'a' : motion.button;
  const componentProps = href ? { href } : { whileTap: { scale: 0.98 } };

  return (
    <Component 
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      onClick={onClick}
      {...componentProps}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Component>
  );
};
