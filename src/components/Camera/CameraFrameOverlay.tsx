import React from 'react';
import type { TemplateData } from '../../types/template';
import { StickerIllustration } from '../Common/StickerIllustration';

interface CameraFrameOverlayProps {
  template: TemplateData;
  capturedPhotos: string[]; // List of captured photos so far
  activeSlotIndex: number; // Index of slot currently being captured
  isCameraActive: boolean;
}

export const CameraFrameOverlay: React.FC<CameraFrameOverlayProps> = ({
  template,
  capturedPhotos,
  activeSlotIndex,
  isCameraActive,
}) => {
  return (
    <div
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
        boxShadow: 'var(--shadow-polaroid)',
      }}
    >
      {/* Background Textures */}
      {template.backgroundTexture === 'dots' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${template.accentColor}33 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Render Photo Slots (With Live Stream for active slot, Captured Photos for done slots) */}
      {template.photoSlots.map((slot, index) => {
        const capturedImg = capturedPhotos[index];
        const isActive = index === activeSlotIndex && isCameraActive;

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
                boxShadow: isActive
                  ? '0 0 0 4px #ff7597, 0 12px 28px rgba(0, 0, 0, 0.35)'
                  : '0 10px 25px rgba(0, 0, 0, 0.28)',
                boxSizing: 'border-box',
                zIndex: index + 1,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Corner Tape Detail */}
              <div
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '15px',
                  width: '32px',
                  height: '12px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(2px)',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  background: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {capturedImg ? (
                  <img src={capturedImg} alt={`Captured ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : isActive ? (
                  <div style={{ color: '#ff7597', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.6)', borderRadius: '12px' }}>
                    ● LIVE
                  </div>
                ) : (
                  <span style={{ color: '#fff', opacity: 0.5, fontSize: '0.65rem', fontWeight: 700 }}>SLOT {index + 1}</span>
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
                background: 'linear-gradient(135deg, #7c5a43 0%, #4a3324 100%)',
                padding: '8px 14px 8px 8px',
                borderRadius: '16px',
                border: '2px solid #a88468',
                boxShadow: isActive ? '0 0 0 4px #ff7597, 0 12px 28px rgba(0, 0, 0, 0.35)' : '0 12px 28px rgba(0, 0, 0, 0.35)',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                zIndex: index + 1,
              }}
            >
              <div style={{ flex: 1, height: '100%', overflow: 'hidden', borderRadius: '8px', border: '2px solid #3e2719', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {capturedImg ? (
                  <img src={capturedImg} alt={`Captured ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : isActive ? (
                  <div style={{ color: '#ff7597', fontSize: '0.65rem', fontWeight: 700 }}>● LIVE</div>
                ) : (
                  <span style={{ color: '#fff', opacity: 0.5, fontSize: '0.65rem' }}>SLOT {index + 1}</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'radial-gradient(#d4af37, #8b6b1b)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3e2719' }} />
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
              borderRadius: slot.borderRadius ? `${slot.borderRadius}px` : '4px',
              backgroundColor: '#e2e8f0',
              boxShadow: isActive ? '0 0 0 4px var(--color-pink-primary), 0 8px 20px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              border: isActive ? '3px solid #ff7597' : '2px solid rgba(255,255,255,0.8)',
            }}
          >
            {capturedImg ? (
              <img
                src={capturedImg}
                alt={`Captured ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : isActive ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  background: '#000',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(255, 117, 151, 0.85)',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    zIndex: 5,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ● LIVE SLOT {index + 1}
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${template.backgroundColor}, ${template.accentColor}22)`,
                  color: template.textColor,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  opacity: 0.6,
                }}
              >
                <span>SLOT {index + 1}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Decorative Elements */}
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

      {/* Text Elements */}
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
          }}
        >
          {el.defaultText}
        </div>
      ))}
    </div>
  );
};
