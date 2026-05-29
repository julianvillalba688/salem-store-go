import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSparkles = ({ count = 5, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;
        const size = 2 + Math.random() * 4;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-salem-gold shadow-gold-glow"
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              width: size,
              height: size
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
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
