import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config';
import { openWhatsApp } from '../../utils/whatsapp';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 animate-in slide-in-right">
      <div className="bg-white px-4 py-2 rounded-2xl shadow-soft text-xs font-medium text-dark border border-border-soft relative animate-bounce">
        ¿Te ayudo con tu pedido?
        <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b border-r border-border-soft transform rotate-45"></div>
      </div>
      
      <button
        onClick={() => openWhatsApp('Hola, estoy viendo el catálogo y me gustaría recibir atención personalizada.', 'whatsapp_click_floating')}
        className="relative group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring opacity-70"></div>
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg transform transition-transform group-hover:scale-110 flex items-center justify-center">
          <MessageCircle size={28} />
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
