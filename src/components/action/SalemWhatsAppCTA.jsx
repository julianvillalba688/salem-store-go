import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const SalemWhatsAppCTA = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gold text-white p-4 rounded-full shadow-gold-glow flex items-center justify-center hover:bg-gold-dark transition-colors duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} strokeWidth={1.5} />
      {/* Subtle pulse effect */}
      <span className="absolute inset-0 rounded-full border border-gold animate-ping opacity-20"></span>
    </motion.a>
  );
};
