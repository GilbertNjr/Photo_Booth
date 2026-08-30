import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <img
          src="/pixbooth-logo.png"
          alt="Pixbooth Logo"
          style={{ height: '32px', width: 'auto', objectFit: 'contain', opacity: 0.9 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.82rem', opacity: 0.85 }}>
          <span>Crafted with</span>
          <Heart size={14} fill="#ff7597" color="#ff7597" />
          <span>for aesthetic memories & instant digital prints</span>
        </div>
      </div>
    </footer>
  );
};
