import React, { useState } from 'react';

// A clean SVG fallback that exactly matches the ivory background with subtle text
const FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" fill="none"><rect width="400" height="500" fill="#FFFDF7"/><text x="200" y="250" font-family="serif" font-size="16" fill="#6F6A61" text-anchor="middle" dominant-baseline="middle">Imagen no disponible</text></svg>`)}`;

export const ProductImage = ({ src, alt, className = '', aspect = 'aspect-[4/5]' }) => {
  const [status, setStatus] = useState('loading');

  return (
    <div className={`relative overflow-hidden bg-salem-cream ${aspect}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 bg-salem-cream">
          <div className="w-full h-full bg-gradient-to-r from-salem-cream via-salem-beige/20 to-salem-cream animate-[shimmer_1.5s_infinite]"
            style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }}
          />
        </div>
      )}
      <img
        src={src || FALLBACK_SVG}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={(e) => {
          setStatus('error');
          e.target.src = FALLBACK_SVG; // Replace broken image explicitly
        }}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ${status === 'loading' ? 'opacity-0' : 'opacity-100'} ${className}`}
      />
    </div>
  );
};
