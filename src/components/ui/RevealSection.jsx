import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const RevealSection = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.7,
  blur = true,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const yOffset = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;
  const xOffset = direction === 'left' ? 24 : direction === 'right' ? -24 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        x: xOffset,
        scale: 0.98,
        filter: blur ? 'blur(6px)' : 'none'
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : yOffset,
        x: isInView ? 0 : xOffset,
        scale: isInView ? 1 : 0.98,
        filter: isInView ? 'blur(0px)' : blur ? 'blur(6px)' : 'none'
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.23, 1, 0.32, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
