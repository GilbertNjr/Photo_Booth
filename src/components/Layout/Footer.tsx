import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <span>Crafted with</span>
        <Heart size={15} fill="#ff7597" color="#ff7597" />
        <span>for aesthetic memories & instant digital prints</span>
      </div>
    </footer>
  );
};
