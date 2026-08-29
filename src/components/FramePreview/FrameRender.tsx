import React from 'react';
import type { TemplateData } from '../../types/template';
import { StickerIllustration } from '../Common/StickerIllustration';

interface FrameRenderProps {
  template: TemplateData;
  scale?: number;
  className?: string;
  showPhotoPlaceholders?: boolean;
}

// Curated high quality photobooth sample portraits for different templates
const CATEGORY_SAMPLE_PHOTOS: Record<string, string[]> = {
  cute: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  ],
  vintage: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80',
  ],
  romantic: [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
  ],
  friendship: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  ],
  minimal: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  ],
};

export const FrameRender: React.FC<FrameRenderProps> = ({
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
              borderTop: '2px dashed rgba(122, 28, 40, 0.45)',
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
              background: '#FFFDF9',
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
              background: '#FFFDF9',
              zIndex: 22,
              pointerEvents: 'none',
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.15)',
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

      {/* Render Text Elements */}
      {template.textElements.map((el) => (
        <div
          key={el.id}
          style={{
            position: 'absolute',
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${el.fontSize * 0.65}px`,
            color: el.color || template.textColor,
            fontFamily: el.fontFamily || 'var(--font-heading)',
            fontWeight: 700,
            textAlign: (el.align as React.CSSProperties['textAlign']) || 'center',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 12,
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          {el.defaultText}
        </div>
      ))}

      {/* Realistic Photobooth Bottom Date Stamp & Barcode */}
      <div
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '10px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 15,
          pointerEvents: 'none',
          opacity: 0.5,
          color: template.textColor,
          fontFamily: 'monospace',
          fontSize: '0.52rem',
          letterSpacing: '0.05em',
        }}
      >
        <span>2026.08.28 • PHOTO BOOTH</span>
        <span>#04829</span>
      </div>
    </div>
  );
};

