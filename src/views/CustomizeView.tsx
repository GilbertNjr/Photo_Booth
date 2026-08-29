import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import type { TemplateData } from '../types/template';
import type { PhotoFilterType, PlacedSticker } from '../types/editor';
import { FilterPicker } from '../components/PhotoEditor/FilterPicker';
import { TextEditor } from '../components/PhotoEditor/TextEditor';
import { StickerPicker } from '../components/PhotoEditor/StickerPicker';
import { CanvasEngine } from '../services/canvas/canvasEngine';

interface CustomizeViewProps {
  template: TemplateData;
  capturedPhotos: string[];
  onBackToCamera: () => void;
  onApplyCustomization: (finalImageDataUrl: string) => void;
}

export const CustomizeView: React.FC<CustomizeViewProps> = ({
  template,
  capturedPhotos,
  onBackToCamera,
  onApplyCustomization,
}) => {
  const [activeTab, setActiveTab] = useState<'filter' | 'color' | 'text' | 'stickers'>('filter');

  // Customization State
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilterType>('original');
  const [backgroundColor, setBackgroundColor] = useState<string>(template.backgroundColor);
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [customBottomText, setCustomBottomText] = useState<string>('2026.08.28 • PHOTO BOOTH STUDIO');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [skinSmoothness, setSkinSmoothness] = useState<number>(50);
  const [beautyBrightness, setBeautyBrightness] = useState<number>(50);

  // Live Canvas Rendering State
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');
  const [isRendering, setIsRendering] = useState(false);

  // Re-render live preview whenever customization state changes
  useEffect(() => {
    let isCancelled = false;

    async function updatePreview() {
      setIsRendering(true);
      const canvas = document.createElement('canvas');
      const dataUrl = await CanvasEngine.renderFullCanvas(canvas, template, capturedPhotos, {
        filter: selectedFilter,
        backgroundColor,
        customTexts,
        customBottomText,
        placedStickers,
      });

      if (!isCancelled) {
        setLivePreviewUrl(dataUrl);
        setIsRendering(false);
      }
    }

    updatePreview();

    return () => {
      isCancelled = true;
    };
  }, [template, capturedPhotos, selectedFilter, backgroundColor, customTexts, customBottomText, placedStickers, skinSmoothness, beautyBrightness]);

  const handleTextChange = (id: string, value: string) => {
    setCustomTexts((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSticker = (content: string) => {
    const newSticker: PlacedSticker = {
      id: `st-${Date.now()}-${Math.random()}`,
      stickerId: content,
      content,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      scale: 1,
      rotation: Math.floor(Math.random() * 30) - 15,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
  };

  const handleRemoveSticker = (id: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleApply = () => {
    if (livePreviewUrl) {
      onApplyCustomization(livePreviewUrl);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '90px' }}>
      {/* Header Bar matching "Make It Yours ✦" */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: '1px solid var(--color-border-soft)',
        }}
      >
        <button
          onClick={onBackToCamera}
          title="Retake Photos"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1.5px dashed var(--color-burgundy-deep)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-burgundy-deep)',
          }}
        >
          ✕
        </button>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            margin: 0,
          }}
        >
          Make It Yours ✦
        </h1>

        <button
          onClick={handleApply}
          disabled={isRendering}
          title="Done Customizing"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1.5px dashed var(--color-burgundy-deep)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-burgundy-deep)',
          }}
        >
          ✓
        </button>
      </div>

      {/* Main Workspace */}
      <div className="editor-workspace-grid">
        {/* Left Column: Live Canvas Preview */}
        <div
          style={{
            background: 'var(--color-cream-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            aspectRatio: '2/3',
            maxHeight: '70vh',
            maxWidth: '480px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-hover)',
            position: 'relative',
          }}
        >
          {livePreviewUrl ? (
            <img
              src={livePreviewUrl}
              alt="Live Customized Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-polaroid)',
              }}
            />
          ) : (
            <div style={{ color: 'var(--color-neutral-sub)', fontWeight: 600 }}>Rendering Preview...</div>
          )}
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--color-border-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Sheet Handle Indicator */}
          <div style={{ width: '40px', height: '4px', background: 'var(--color-border)', borderRadius: '2px', margin: '0 auto' }} />

          {/* Navigation Tabs (STICKERS, FRAME, BG, TEXT, FILTER) */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-soft)', overflowX: 'auto' }}>
            {[
              { id: 'stickers', label: 'STICKERS' },
              { id: 'color', label: 'FRAME' },
              { id: 'color', label: 'BG' },
              { id: 'text', label: 'TEXT' },
              { id: 'filter', label: 'FILTER' },
            ].map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.5rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--color-burgundy-deep)' : '2px solid transparent',
                    color: isActive ? 'var(--color-burgundy-deep)' : 'var(--color-neutral-sub)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          {activeTab === 'stickers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-neutral-sub)', letterSpacing: '0.05em' }}>
                ADD DOODLES
              </span>
              <StickerPicker
                onAddSticker={handleAddSticker}
                placedStickers={placedStickers}
                onRemoveSticker={handleRemoveSticker}
              />
            </div>
          )}

          {activeTab === 'filter' && (
            <FilterPicker
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              skinSmoothness={skinSmoothness}
              onSkinSmoothnessChange={setSkinSmoothness}
              beautyBrightness={beautyBrightness}
              onBeautyBrightnessChange={setBeautyBrightness}
            />
          )}

          {activeTab === 'color' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', textTransform: 'uppercase' }}>
                FRAME BACKGROUND COLOR
              </label>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {template.colorPalettes.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setBackgroundColor(c)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: backgroundColor === c ? '3px solid var(--color-burgundy-deep)' : '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextEditor
                textElements={template.textElements}
                customTexts={customTexts}
                onChangeText={handleTextChange}
              />
              <div style={{ background: 'var(--color-cream-bg)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-soft)' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'block', marginBottom: '0.4rem' }}>
                  FOOTER TEKS:
                </label>
                <input
                  type="text"
                  value={customBottomText}
                  onChange={(e) => setCustomBottomText(e.target.value)}
                  placeholder="2026.08.28 • PHOTO BOOTH STUDIO"
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Sticky Bottom "Print & Save" Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1010,
          width: 'calc(100% - 32px)',
          maxWidth: '380px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleApply}
          disabled={isRendering}
          style={{
            width: '100%',
            background: 'var(--color-pink-primary)',
            color: '#ffffff',
            padding: '0.95rem 1.75rem',
            borderRadius: '9999px',
            fontSize: '1.02rem',
            fontWeight: 800,
            border: 'none',
            boxShadow: '0 10px 30px rgba(211, 47, 47, 0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
        >
          <Download size={20} />
          <span>Unduh Foto (PNG)</span>
        </button>
      </div>
    </div>
  );
};
