import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealSection } from '../ui/RevealSection';

export const CategoryShowcase = ({ categoryCovers }) => {
  if (!categoryCovers || categoryCovers.length === 0) return null;

  return (
    <section className="py-8 bg-salem-ivory overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Horizontal scroll strip of category pills */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar py-4 -mx-2 px-2">
          {categoryCovers.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link
                to={`/catalog?category=${encodeURIComponent(item.category)}`}
                className="flex items-center gap-2.5 px-5 py-2.5 border border-salem-ink/10 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase text-salem-ink whitespace-nowrap hover:border-salem-gold hover:text-salem-gold hover:bg-salem-gold/[0.03] transition-all duration-300 group pressable"
              >
                <span>{item.category}</span>
                <span className="w-5 h-5 rounded-full bg-salem-ink/5 flex items-center justify-center text-[8px] font-medium text-salem-muted group-hover:bg-salem-gold/10 group-hover:text-salem-gold transition-colors duration-300">
                  {item.count}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
