import React from 'react';
import { Heart, Sparkles, Camera, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-soft-premium">
      <div className="footer-container">
        {/* Brand Logo & Tagline */}
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <img
              src="/pixbooth-logo.png"
              alt="Pixbooth Logo"
              className="footer-logo-img"
            />
            <span className="footer-brand-title">PIXBOOTH</span>
          </div>
          <p className="footer-tagline">
            Abadikan setiap momen estetis dengan cetakan digital instan beresolusi tinggi ✦
          </p>
        </div>

        {/* Feature Badges Bar */}
        <div className="footer-badges">
          <div className="footer-badge-pill">
            <Sparkles size={13} color="#D90429" />
            <span>Design Frame Korean Studio</span>
          </div>
          <div className="footer-badge-pill">
            <Camera size={13} color="#7A1C28" />
            <span>High-DPI Canvas Engine</span>
          </div>
          <div className="footer-badge-pill">
            <ShieldCheck size={13} color="#D90429" />
            <span>100% Instan & Tanpa Login</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="footer-divider" />

        {/* Bottom Copyright & Heart Note */}
        <div className="footer-bottom-row">
          <div className="footer-crafted-text">
            <span>Dibuat dengan</span>
            <Heart size={14} fill="#FF7597" color="#FF7597" className="footer-heart-anim" />
            <span>untuk kenangan terbaik Anda</span>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} PixBooth Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
