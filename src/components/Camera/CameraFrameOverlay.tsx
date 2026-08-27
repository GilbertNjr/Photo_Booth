import React from 'react';
import type { TemplateData } from '../../types/template';

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
              // Display already captured photo
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
              // Display Live Feed into active slot!
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  background: '#000',
                }}
              >
                {/* Visual marker */}
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
              // Slot Waiting Indicator
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
