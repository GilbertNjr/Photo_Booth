import React, { useState, useEffect } from 'react';
import type { TemplateData } from '../types/template';
import type { PhotoFilterType, PlacedSticker } from '../types/editor';
import { FilterPicker } from '../components/PhotoEditor/FilterPicker';
import { TextEditor } from '../components/PhotoEditor/TextEditor';
import { StickerPicker } from '../components/PhotoEditor/StickerPicker';
import { Button } from '../components/Common/Button';
import { CanvasEngine } from '../services/canvas/canvasEngine';
import {
  Sparkles,
  Palette,
  Type,
  Smile,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

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
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);

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
  }, [template, capturedPhotos, selectedFilter, backgroundColor, customTexts, placedStickers]);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onBackToCamera}>
          <RotateCcw size={18} />
          <span>Retake Photos</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            Customize Your Memory ✨
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-neutral-sub)' }}>
            Apply photo filters, background colors, custom text & cute stickers!
          </span>
        </div>

        <Button variant="primary" onClick={handleApply} disabled={isRendering}>
          <CheckCircle size={18} />
          <span>Apply & Finalize ✨</span>
        </Button>
      </div>

      {/* Main Workspace */}
      <div className="editor-workspace-grid">
        {/* Left Column: Live Canvas Preview */}
        <div
          style={{
            background: 'var(--color-cream-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            aspectRatio: '2/3',
            maxHeight: '75vh',
            maxWidth: '520px',
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
            padding: '1.5rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--color-border-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Navigation Control Tabs */}
          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--color-cream-bg)', padding: '0.3rem', borderRadius: 'var(--radius-full)', overflowX: 'auto' }}>
            <button
              className={`category-pill ${activeTab === 'filter' ? 'active' : ''}`}
              onClick={() => setActiveTab('filter')}
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <Sparkles size={14} /> Filter
            </button>
            <button
              className={`category-pill ${activeTab === 'color' ? 'active' : ''}`}
              onClick={() => setActiveTab('color')}
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <Palette size={14} /> Color
            </button>
            <button
              className={`category-pill ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <Type size={14} /> Text
            </button>
            <button
              className={`category-pill ${activeTab === 'stickers' ? 'active' : ''}`}
              onClick={() => setActiveTab('stickers')}
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              <Smile size={14} /> Stickers
            </button>
          </div>

          {/* Active Tab Content */}
          {activeTab === 'filter' && (
            <FilterPicker selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
          )}

          {activeTab === 'color' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Palette size={16} color="#10b981" /> FRAME BACKGROUND COLOR
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
                      border: backgroundColor === c ? '3px solid var(--color-pink-primary)' : '1px solid rgba(0,0,0,0.15)',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                    }}
                  />
                ))}
              </div>

              {/* Custom Color Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-neutral-sub)' }}>
                  CUSTOM COLOR:
                </span>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{ width: '40px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <TextEditor
              textElements={template.textElements}
              customTexts={customTexts}
              onChangeText={handleTextChange}
            />
          )}

          {activeTab === 'stickers' && (
            <StickerPicker
              onAddSticker={handleAddSticker}
              placedStickers={placedStickers}
              onRemoveSticker={handleRemoveSticker}
            />
          )}

          {/* Action CTA */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <Button
              variant="primary"
              onClick={handleApply}
              disabled={isRendering}
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              <CheckCircle size={18} />
              <span>Finalize & Preview ✨</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
