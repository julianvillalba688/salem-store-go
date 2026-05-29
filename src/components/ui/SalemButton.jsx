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
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 font-sans font-medium";
  
  const variants = {
    primary: "bg-carbon text-white hover:bg-carbon-light",
    secondary: "bg-gold text-white hover:bg-gold-dark shadow-gold-glow",
    outline: "border border-carbon text-carbon hover:bg-carbon hover:text-white",
    ghost: "text-carbon hover:text-gold"
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
