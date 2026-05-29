import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const SalemWhatsAppCTA = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-salem-gold text-white p-4 rounded-full shadow-gold-glow flex items-center justify-center hover:bg-salem-gold-light transition-colors duration-500 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} strokeWidth={1.5} />
      {/* Subtle pulse effect */}
      <span className="absolute inset-0 rounded-full border border-salem-gold animate-pulse-slow opacity-30"></span>
    </motion.a>
  );
};
