import React from 'react';
import { motion } from 'framer-motion';

export const GoldDivider = ({ className = '', vertical = false }) => {
  return (
    <motion.div 
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, opacity: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-salem-gold/30 ${vertical ? 'w-px h-full origin-top' : 'h-px w-full origin-left'} ${className}`}
    />
  );
};
