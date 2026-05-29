import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSparkles = ({ count = 5, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => {
        const top = 10 + Math.random() * 80;
        const left = 10 + Math.random() * 80;
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 2;
        const size = 2 + Math.random() * 3;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-salem-gold"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              width: size,
              height: size,
              boxShadow: '0 0 8px 2px rgba(185, 154, 85, 0.3)'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};
