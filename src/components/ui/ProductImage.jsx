import React, { useState } from 'react';

const FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" fill="none"><rect width="400" height="500" fill="#E8DDC8" opacity="0.3"/><text x="200" y="260" font-family="serif" font-size="18" fill="#6F6A61" fill-opacity="0.5" text-anchor="middle" dominant-baseline="middle">Salem Store</text><circle cx="200" cy="220" r="30" stroke="#B99A55" stroke-width="0.5" fill="none" opacity="0.3"/></svg>`)}`;

export const ProductImage = ({ src, alt, className = '', aspect = 'aspect-[3/4]' }) => {
  const [status, setStatus] = useState('loading');

  return (
    <div className={`relative overflow-hidden bg-salem-beige/10 ${aspect}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gradient-to-r from-salem-beige/10 via-salem-beige/30 to-salem-beige/10 animate-[shimmer_1.5s_infinite]"
            style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }}
          />
        </div>
      )}
      <img
        src={src || FALLBACK_SVG}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ${status === 'loading' ? 'opacity-0' : 'opacity-100'} ${className}`}
        style={status === 'error' ? { display: 'none' } : {}}
      />
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-salem-beige/15">
          <img src="/logo_salem_icon.png" alt="" className="h-12 opacity-20 mb-3" />
          <span className="text-salem-muted/40 text-[9px] tracking-widest uppercase font-sans">Salem Store</span>
        </div>
      )}
    </div>
  );
};
