import React from 'react';
import type { TemplateData } from '../../types/template';

interface FrameRenderProps {
  template: TemplateData;
  scale?: number;
  className?: string;
  showPhotoPlaceholders?: boolean;
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
];

export const FrameRender: React.FC<FrameRenderProps> = ({
  template,
  className = '',
  showPhotoPlaceholders = true,
}) => {

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
      }}
    >
      {/* Texture Overlays */}
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
      {template.backgroundTexture === 'paper' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundColor: '#000',
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
            backgroundSize: '8px 8px',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Render Photo Slots */}
      {template.photoSlots.map((slot, index) => {
        const sampleUrl = SAMPLE_PHOTOS[index % SAMPLE_PHOTOS.length];

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
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0, 0, 0, 0.12)',
                boxSizing: 'border-box',
                zIndex: index + 1,
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
                  background: 'rgba(255, 255, 255, 0.75)',
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
                background: 'linear-gradient(135deg, #7c5a43 0%, #4a3324 100%)',
                padding: '8px 14px 8px 8px',
                borderRadius: '16px',
                border: '2px solid #a88468',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                zIndex: index + 1,
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
              backgroundColor: '#e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.8)',
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
            fontSize: el.fontSize ? `${el.fontSize * 0.75}px` : '1rem',
            color: el.color || template.textColor,
            fontFamily: el.fontFamily || 'inherit',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {el.content}
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
            textShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          {el.defaultText}
        </div>
      ))}
    </div>
  );
};
