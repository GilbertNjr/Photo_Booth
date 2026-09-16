import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Camera, ShieldCheck, Lock } from 'lucide-react';
import { PrivacyModal } from '../Common/PrivacyModal';
import { SessionMetricsService } from '../../services/analytics/sessionMetricsService';

export const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [sessionCount, setSessionCount] = useState<string>(SessionMetricsService.getFormattedCount());

  useEffect(() => {
    const unsubscribe = SessionMetricsService.subscribe(() => {
      setSessionCount(SessionMetricsService.getFormattedCount());
    });
    return unsubscribe;
  }, []);

  return (
    <>
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
              Abadikan setiap momen estetis dengan cetakan digital instan beresolusi tinggi
            </p>
          </div>

          {/* Feature Badges Bar */}
          <div className="footer-badges">
            <div className="footer-badge-pill">
              <Sparkles size={13} color="#D90429" />
              <span>Frame Studio Korea</span>
            </div>
            <div className="footer-badge-pill">
              <Camera size={13} color="#7A1C28" />
              <span>Kanvas HD DPI</span>
            </div>
            <button
              className="footer-badge-pill"
              onClick={() => setIsPrivacyModalOpen(true)}
              style={{
                cursor: 'pointer',
                background: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.25)',
                color: '#065F46',
                fontWeight: 700,
              }}
              title="Klik untuk melihat jaminan privasi 100% on-device"
            >
              <ShieldCheck size={13} color="#10B981" />
              <span>🔒 100% On-Device (Tanpa Database)</span>
            </button>
            <div
              className="footer-badge-pill"
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                borderColor: 'rgba(245, 158, 11, 0.25)',
                color: '#B45309',
                fontWeight: 700,
              }}
            >
              <span>🔥 {sessionCount} Sesi Dicetak</span>
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
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#800020',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginLeft: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <Lock size={12} /> Jaminan Privasi
              </button>
            </div>
            <div className="footer-copyright" style={{ fontWeight: 600 }}>
              © 2026 GilbertNjr. PixBooth Studio. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
};

