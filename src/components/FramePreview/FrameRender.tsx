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
