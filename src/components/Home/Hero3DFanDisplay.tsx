import React from 'react';
import { StickerIllustration } from '../Common/StickerIllustration';
import type { TemplateData } from '../../types/template';
import { TemplateService } from '../../services/template/templateService';

interface Hero3DFanDisplayProps {
  onSelectTemplate?: (template: TemplateData) => void;
}

export const Hero3DFanDisplay: React.FC<Hero3DFanDisplayProps> = ({ onSelectTemplate }) => {
  // Sample high quality portrait photos for hero preview
  const photos1 = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  ];

  const photos2 = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  ];

  const photos3 = [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=400&q=80',
  ];

  const photos4 = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  ];

  const handleStripClick = (templateId: string) => {
    const tpl = TemplateService.getTemplateById(templateId) || TemplateService.getAllTemplates()[0];
    if (tpl && onSelectTemplate) {
      onSelectTemplate(tpl);
    }
  };

  return (
    <div className="hero-3d-container">
      {/* Decorative Floral & Sticker Accents */}
      <div className="hero-floating-decor decor-flower-left">
        <StickerIllustration content="🌺" size={48} />
      </div>
      <div className="hero-floating-decor decor-sparkle-top">
        <span style={{ fontSize: '1.8rem', color: '#D90429' }}>✨</span>
      </div>
      <div className="hero-floating-decor decor-heart-top">
        <span style={{ fontSize: '2rem', color: '#800020' }}>♡</span>
      </div>

      {/* Fan-Stacked 4 Photo Strips */}
      <div className="hero-fan-wrapper">
        {/* Strip 1: Catch Yours / Film Story (Far Left, Tilted -10 deg) */}
        <div
          className="hero-strip strip-film"
          onClick={() => handleStripClick('template-catch-yours-strip')}
          style={{ cursor: 'pointer' }}
          title="Klik untuk memilih frame Catch Yours ✦"
        >
          <div className="strip-tape-top" />
          <div className="strip-header">CATCH YOURS • STRIP</div>
          <div className="strip-photos">
            {photos1.map((url, i) => (
              <div key={i} className="strip-photo-box">
                <img src={url} alt="Catch Yours sample" />
              </div>
            ))}
          </div>
          <div className="strip-footer">CATCH YOURS ♡</div>
        </div>

        {/* Strip 2: Special Day Burgundy Ticket (Center Left, Elevated, Tilted -2 deg) */}
        <div
          className="hero-strip strip-ticket-burgundy"
          onClick={() => handleStripClick('master-02-special-day')}
          style={{ cursor: 'pointer' }}
          title="Klik untuk memilih frame Special Day ✦"
        >
          <div className="ticket-pin-top">📍</div>
          <div className="ticket-barcode-top">||| |||| || ||||</div>
          <div className="ticket-title">Special Day</div>
          <div className="ticket-badge-icon">📷</div>
          <div className="strip-photos">
            {photos2.map((url, i) => (
              <div key={i} className="strip-photo-box">
                <img src={url} alt="Special Day sample" />
              </div>
            ))}
          </div>
          <div className="ticket-footer-text">Special Day ✦</div>
          <div className="ticket-badge-icon">📷</div>
        </div>

        {/* Strip 3: Sweet Moment Pink Ribbon (Center Right, Tilted +8 deg) */}
        <div
          className="hero-strip strip-sweet-pink"
          onClick={() => handleStripClick('master-01-sweet-moment')}
          style={{ cursor: 'pointer' }}
          title="Klik untuk memilih frame Sweet Moment ✦"
        >
          <div className="strip-ribbon-bow">🎀</div>
          <div className="strip-title-script">Sweet Moment</div>
          <div className="strip-photos compact">
            {photos3.map((url, i) => (
              <div key={i} className="strip-photo-box">
                <img src={url} alt="Sweet Moment sample" />
              </div>
            ))}
          </div>
          <div className="strip-teddy-sticker">🧸</div>
          <div className="strip-footer-script">Sweet Memories ♡</div>
        </div>

        {/* Strip 4: Caramel Click Cinema Ticket (Far Right, Tilted +14 deg) */}
        <div
          className="hero-strip strip-movie-blue"
          onClick={() => handleStripClick('template-caramel-click-ticket')}
          style={{ cursor: 'pointer' }}
          title="Klik untuk memilih frame Caramel Click ✦"
        >
          <div className="ticket-cutout cutout-left" />
          <div className="ticket-cutout cutout-right" />
          <div className="ticket-movie-header">
            <div>Caramel Click</div>
            <div className="ticket-date-badge">CINEMA PASS</div>
          </div>
          <div className="strip-photos">
            {photos4.map((url, i) => (
              <div key={i} className="strip-photo-box">
                <img src={url} alt="Caramel Click sample" />
              </div>
            ))}
          </div>
          <div className="ticket-admit-box">
            <div className="admit-text">CARAMEL CLICK • ADMIT ONE</div>
            <div className="admit-barcode">|||| | |||||| |||</div>
          </div>
        </div>
      </div>
    </div>
  );
};
