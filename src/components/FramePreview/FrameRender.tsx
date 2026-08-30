import React from 'react';
import type { TemplateData } from '../../types/template';
import { StickerIllustration } from '../Common/StickerIllustration';

interface FrameRenderProps {
  template: TemplateData;
  scale?: number;
  className?: string;
  showPhotoPlaceholders?: boolean;
}

// Curated high quality photobooth sample portraits for different templates (Optimized 240px WebP thumbnails)
const CATEGORY_SAMPLE_PHOTOS: Record<string, string[]> = {
  cute: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=70',
  ],
  vintage: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=70',
  ],
  romantic: [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=240&q=70',
  ],
  friendship: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=240&q=70',
  ],
  minimal: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=70',
  ],
};

export const FrameRender: React.FC<FrameRenderProps> = React.memo(({
  template,
  className = '',
  showPhotoPlaceholders = true,
}) => {
  const samplePhotos = template.samplePhotos || CATEGORY_SAMPLE_PHOTOS[template.category] || CATEGORY_SAMPLE_PHOTOS.cute;

  return (
    <div
      className={`frame-render-box ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: template.backgroundGradient && template.backgroundGradient !== 'none'
          ? template.backgroundGradient
          : template.backgroundColor,
        borderRadius: `${template.frameBorderRadius}px`,
        border: template.frameBorderWidth > 0 ? `${template.frameBorderWidth}px solid ${template.frameBorderColor}` : 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
        transition: 'opacity var(--motion-normal), transform var(--motion-normal)',
        willChange: 'opacity, transform',
      }}
    >
      {/* Glossy Sheen Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 45%, rgba(0, 0, 0, 0.08) 100%)',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      />

      {/* Texture & Paper Grain Overlays */}
      {template.backgroundTexture === 'dots' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${template.accentColor}33 1.2px, transparent 1.2px)`,
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {(template.backgroundTexture === 'paper' || template.backgroundTexture === 'vintage-paper') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundColor: '#000',
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
            backgroundSize: '6px 6px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {template.backgroundTexture === 'film-grain' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '4px 4px, 6px 6px',
            backgroundPosition: '0 0, 2px 2px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {(template.backgroundTexture === 'gingham' || template.backgroundTexture === 'gingham-red') && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25,
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.25) 50%, transparent 50%), linear-gradient(rgba(255,255,255,0.25) 50%, transparent 50%)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      {template.backgroundTexture === 'wood' && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.45,
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.3) 8px, transparent 14px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          {/* Inner Cream Vintage Scalloped Ticket Card for Caramel Cinema */}
          <div
            style={{
              position: 'absolute',
              top: '4%',
              bottom: '4%',
              left: '4%',
              right: '4%',
              background: '#EBE0CA',
              borderRadius: '12px',
              border: '2px dashed #B8A388',
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* 35mm Film Strip Side Perforations & Frame Numbers */}
      {(template.style === 'film-strip' || template.id.includes('film')) && (
        <>
          {/* Left & Right Sprocket Holes */}
          <div
            style={{
              position: 'absolute',
              top: '4%',
              bottom: '4%',
              left: '3%',
              width: '6%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 18,
              pointerEvents: 'none',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ width: '100%', height: '14px', borderRadius: '3px', background: '#000000', border: '1px solid rgba(255,255,255,0.15)' }} />
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '4%',
              bottom: '4%',
              right: '3%',
              width: '6%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 18,
              pointerEvents: 'none',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ width: '100%', height: '14px', borderRadius: '3px', background: '#000000', border: '1px solid rgba(255,255,255,0.15)' }} />
            ))}
          </div>

          {/* Authentic 35mm Film Frame Exposure Numbers */}
          <div
            style={{
              position: 'absolute',
              top: '4%',
              bottom: '4%',
              right: '10.5%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              zIndex: 18,
              pointerEvents: 'none',
              color: template.accentColor || '#F59E0B',
              fontFamily: 'monospace',
              fontSize: '0.52rem',
              fontWeight: 700,
              opacity: 0.85,
            }}
          >
            <span>▶ 01A</span>
            <span>▶ 02A</span>
            <span>▶ 03A</span>
            <span>▶ 04A</span>
          </div>
        </>
      )}

      {/* Ticket Cutout Notches & Dashed Perforated Line */}
      {(template.style === 'ticket' || template.id.includes('ticket')) && (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '8%',
              right: '8%',
              height: '1px',
              borderTop: `2px dashed ${template.textColor}66`,
              zIndex: 18,
              pointerEvents: 'none',
            }}
          />
          {/* Circular Ticket Side Cutout Notches */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '-10px',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: template.backgroundColor || '#FFFDF9',
              zIndex: 22,
              pointerEvents: 'none',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              right: '-10px',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: template.backgroundColor || '#FFFDF9',
              zIndex: 22,
              pointerEvents: 'none',
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.15)',
            }}
          />
        </>
      )}

      {/* Vintage Newspaper Masthead Double Rules & Article Column Lines */}
      {(template.style === 'newspaper' || template.id.includes('newspaper')) && (
        <>
          {/* Masthead Header Double Rules */}
          <div
            style={{
              position: 'absolute',
              top: '10.5%',
              left: '6%',
              right: '6%',
              height: '5px',
              borderTop: `2px solid ${template.textColor || '#1C1917'}`,
              borderBottom: `1px solid ${template.textColor || '#1C1917'}`,
              zIndex: 15,
              pointerEvents: 'none',
            }}
          />
          {/* Gazette Bottom Editorial Rule Line */}
          <div
            style={{
              position: 'absolute',
              bottom: '7.5%',
              left: '6%',
              right: '6%',
              height: '1px',
              background: template.textColor || '#1C1917',
              opacity: 0.7,
              zIndex: 15,
              pointerEvents: 'none',
            }}
          />
          {/* Newsprint Column Margin Lines */}
          <div
            style={{
              position: 'absolute',
              top: '11.5%',
              bottom: '8%',
              left: '5%',
              width: '1px',
              background: `${template.textColor || '#1C1917'}25`,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '11.5%',
              bottom: '8%',
              right: '5%',
              width: '1px',
              background: `${template.textColor || '#1C1917'}25`,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Render Photo Slots */}
      {template.photoSlots.map((slot, index) => {
        const sampleUrl = samplePhotos[index % samplePhotos.length];

        if (slot.frameStyle === 'polaroid') {
          return (
            <div
              key={slot.id}
              style={{
                position: 'absolute',
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
                transform: slot.rotation ? `rotate(${slot.rotation}deg)` : 'none',
                background: '#ffffff',
                padding: '6px 6px 24px 6px',
                borderRadius: '4px',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.32), 0 2px 8px rgba(0, 0, 0, 0.15)',
                boxSizing: 'border-box',
                zIndex: index + 2,
              }}
            >
              {/* Corner Tape Detail */}
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '15px',
                  width: '32px',
                  height: '11px',
                  background: 'rgba(255, 255, 255, 0.82)',
                  backdropFilter: 'blur(2px)',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  background: '#111827',
                }}
              >
                {showPhotoPlaceholders && (
                  <img
                    src={sampleUrl}
                    alt={`Sample ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
            </div>
          );
        }

        if (slot.frameStyle === 'digicam') {
          return (
            <div
              key={slot.id}
              style={{
                position: 'absolute',
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
                transform: slot.rotation ? `rotate(${slot.rotation}deg)` : 'none',
                background: 'linear-gradient(135deg, #8c684d 0%, #4a3324 100%)',
                padding: '8px 14px 8px 8px',
                borderRadius: '16px',
                border: '2px solid #b89374',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.38)',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                zIndex: index + 2,
              }}
            >
              {/* Screen Cutout */}
              <div
                style={{
                  flex: 1,
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '2px solid #3e2719',
                  background: '#000',
                }}
              >
                {showPhotoPlaceholders && (
                  <img
                    src={sampleUrl}
                    alt={`Sample ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
              {/* Camera Dial & Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'radial-gradient(#d4af37, #8b6b1b)', border: '1px solid #fff' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3e2719' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3e2719' }} />
              </div>
            </div>
          );
        }

        return (
          <div
            key={slot.id}
            style={{
              position: 'absolute',
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              width: `${slot.width}%`,
              height: `${slot.height}%`,
              transform: slot.rotation ? `rotate(${slot.rotation}deg)` : 'none',
              borderRadius: slot.shape === 'arch'
                ? '50% 50% 12px 12px / 25% 25% 12px 12px'
                : slot.borderRadius
                ? `${slot.borderRadius}px`
                : '4px',
              backgroundColor: '#1f2937',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.22), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              zIndex: index + 2,
            }}
          >
            {showPhotoPlaceholders && (
              <img
                src={sampleUrl}
                alt={`Sample ${index + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            )}
          </div>
        );
      })}

      {/* Render Decorative Elements */}
      {template.decorativeElements.map((el) => (
        <div
          key={el.id}
          style={{
            position: 'absolute',
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: `translate(-50%, -50%) ${el.rotation ? `rotate(${el.rotation}deg)` : ''}`,
            color: el.color || template.textColor,
            fontFamily: el.fontFamily || 'inherit',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
          }}
        >
          {el.type === 'sticker' || el.type === 'doodle' || el.type === 'stamp' ? (
            <StickerIllustration content={el.content} size={el.fontSize ? el.fontSize * 0.8 : 40} color={el.color} />
          ) : (
            <span style={{ fontSize: el.fontSize ? `${el.fontSize * 0.75}px` : '1rem' }}>{el.content}</span>
          )}
        </div>
      ))}

      {/* Render HD Typography Text Elements */}
      {template.textElements.map((el) => {
        const isSerif = el.fontFamily?.toLowerCase().includes('playfair') || el.fontFamily?.toLowerCase().includes('serif');
        const isScript = el.fontFamily?.toLowerCase().includes('caveat') || el.fontFamily?.toLowerCase().includes('cursive');

        return (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.x}%`,
              top: `${el.y}%`,
              transform: `translate(${el.align === 'left' ? '0%' : el.align === 'right' ? '-100%' : '-50%'}, -50%) ${el.rotation ? `rotate(${el.rotation}deg)` : ''}`,
              fontSize: `${(el.fontSize || 20) * 0.68}px`,
              color: el.color || template.textColor,
              fontFamily: el.fontFamily ? `"${el.fontFamily}", "Playfair Display", "Plus Jakarta Sans", "Caveat", serif` : 'var(--font-heading)',
              fontWeight: isSerif ? 900 : isScript ? 600 : 800,
              textAlign: (el.align as React.CSSProperties['textAlign']) || 'center',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 14,
              letterSpacing: isSerif ? '0.08em' : isScript ? '0.02em' : '0.04em',
              textTransform: isSerif ? 'uppercase' : 'none',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.22), 0 0 1px rgba(0, 0, 0, 0.35)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {el.defaultText}
          </div>
        );
      })}

    </div>
  );
});

