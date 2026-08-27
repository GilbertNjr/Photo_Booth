import React from 'react';
import type { TemplateData } from '../../types/template';

interface FrameRenderProps {
  template: TemplateData;
  scale?: number;
  className?: string;
  showPhotoPlaceholders?: boolean;
}

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
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            {showPhotoPlaceholders && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${template.backgroundColor}, ${template.accentColor}33)`,
                  color: template.textColor,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  gap: '0.2rem',
                }}
              >
                <div style={{ opacity: 0.7, fontSize: '1rem' }}>📸</div>
                <div style={{ opacity: 0.8, fontSize: '0.65rem' }}>PHOTO {index + 1}</div>
              </div>
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
