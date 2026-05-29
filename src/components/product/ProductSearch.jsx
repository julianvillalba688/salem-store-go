import React from 'react';

export const ProductSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-10">
      <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Buscar</h3>
      <input 
        type="text" 
        placeholder="Nombre de la pieza..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent border-b border-salem-ink/20 pb-2 text-sm font-sans text-salem-ink placeholder:text-salem-muted focus:outline-none focus:border-salem-gold transition-colors"
      />
    </div>
  );
};
