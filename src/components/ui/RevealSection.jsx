import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const RevealSection = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  blur = true,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const yOffset = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
  const xOffset = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        x: xOffset,
        filter: blur ? 'blur(10px)' : 'none'
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : yOffset,
        x: isInView ? 0 : xOffset,
        filter: isInView ? 'blur(0px)' : blur ? 'blur(10px)' : 'none'
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
