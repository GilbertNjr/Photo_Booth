import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import type { TemplateData } from '../types/template';
import type { PhotoFilterType, PlacedSticker } from '../types/editor';
import { FilterPicker } from '../components/PhotoEditor/FilterPicker';
import { TextEditor } from '../components/PhotoEditor/TextEditor';
import { StickerPicker } from '../components/PhotoEditor/StickerPicker';
import { StickerIllustration } from '../components/Common/StickerIllustration';
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
  const [activeTab, setActiveTab] = useState<'filter' | 'frame' | 'bg' | 'text' | 'stickers'>('stickers');

  // Customization State
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilterType>('original');
  const [backgroundColor, setBackgroundColor] = useState<string>(template.backgroundColor);
  const [backgroundTexture, setBackgroundTexture] = useState<string>(template.backgroundTexture || 'none');
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [customBottomText, setCustomBottomText] = useState<string>('2026.08.28 • PHOTO BOOTH STUDIO');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [skinSmoothness, setSkinSmoothness] = useState<number>(50);
  const [beautyBrightness, setBeautyBrightness] = useState<number>(50);

  // Live Canvas Rendering State
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');
  const [isRendering, setIsRendering] = useState(false);

  // Dragging sticker ref
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; initX: number; initY: number } | null>(null);

  // Re-render live preview whenever customization state changes
  useEffect(() => {
    let isCancelled = false;

    async function updatePreview() {
      setIsRendering(true);
      const canvas = document.createElement('canvas');
      const dataUrl = await CanvasEngine.renderFullCanvas(canvas, template, capturedPhotos, {
        filter: selectedFilter,
        backgroundColor,
        backgroundTexture,
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
  }, [template, capturedPhotos, selectedFilter, backgroundColor, backgroundTexture, customTexts, customBottomText, placedStickers, skinSmoothness, beautyBrightness]);

  const handleTextChange = (id: string, value: string) => {
    setCustomTexts((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSticker = (content: string) => {
    const newId = `st-${Date.now()}-${Math.random()}`;
    const newSticker: PlacedSticker = {
      id: newId,
      stickerId: content,
      content,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      scale: 1,
      rotation: Math.floor(Math.random() * 30) - 15,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newId);
  };

  const handleRemoveSticker = (id: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedStickerId === id) {
      setSelectedStickerId(null);
    }
  };

  const handleUpdateSticker = (id: string, updates: Partial<PlacedSticker>) => {
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  // Interactive Drag Event Handlers for Stickers on Canvas
  const handlePointerDownSticker = (e: React.PointerEvent, id: string, initX: number, initY: number) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initX,
      initY,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveSticker = (e: React.PointerEvent) => {
    if (!dragRef.current || !dragRef.current.isDragging || !selectedStickerId || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const deltaX = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragRef.current.startY) / rect.height) * 100;

    const newX = Math.max(2, Math.min(98, dragRef.current.initX + deltaX));
    const newY = Math.max(2, Math.min(98, dragRef.current.initY + deltaY));

    setPlacedStickers((prev) =>
      prev.map((st) => (st.id === selectedStickerId ? { ...st, x: newX, y: newY } : st))
    );
  };

  const handlePointerUpSticker = () => {
    if (dragRef.current) {
      dragRef.current.isDragging = false;
    }
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
      <div className="editor-workspace-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* Left Column: Interactive Canvas Preview */}
        <div
          ref={previewRef}
          className="editor-preview-card-wrapper"
          style={{
            background: 'transparent',
            borderRadius: 'var(--radius-xl)',
            padding: '0.25rem',
            width: '100%',
            maxWidth: 'min(calc(100vw - 32px), 380px)',
            height: 'clamp(300px, 46vh, 480px)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none',
            touchAction: 'pan-y',
            overflow: 'hidden',
            boxSizing: 'border-box',
            minWidth: 0,
            minHeight: 0,
          }}
          onClick={() => setSelectedStickerId(null)}
        >
          {livePreviewUrl ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minWidth: 0, minHeight: 0, margin: '0 auto' }}>
              <img
                src={livePreviewUrl}
                alt="Live Customized Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '16px',
                  boxShadow: '0 16px 40px rgba(122, 28, 40, 0.18), 0 4px 12px rgba(0,0,0,0.06)',
                  pointerEvents: 'none',
                }}
              />

              {/* Interactive Draggable Stickers Layer */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto', touchAction: 'pan-y' }}>
                {placedStickers.map((st) => {
                  const isSelected = st.id === selectedStickerId;
                  const scale = st.scale || 1;
                  const rotation = st.rotation || 0;

                  return (
                    <div
                      key={st.id}
                      onPointerDown={(e) => handlePointerDownSticker(e, st.id, st.x, st.y)}
                      onPointerMove={handlePointerMoveSticker}
                      onPointerUp={handlePointerUpSticker}
                      style={{
                        position: 'absolute',
                        left: `${st.x}%`,
                        top: `${st.y}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                        cursor: 'grab',
                        touchAction: 'none',
                        zIndex: isSelected ? 50 : 20,
                        padding: '6px',
                        borderRadius: '12px',
                        border: isSelected ? '2px dashed var(--color-burgundy-deep)' : '2px solid transparent',
                        background: isSelected ? 'rgba(255, 255, 255, 0.45)' : 'transparent',
                        backdropFilter: isSelected ? 'blur(4px)' : 'none',
                        transition: 'border 0.15s ease, background 0.15s ease',
                      }}
                      title="Klik & Geser stiker ke mana saja!"
                    >
                      <div
                        style={{
                          display: 'block',
                          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          pointerEvents: 'none',
                        }}
                      >
                        <StickerIllustration content={st.content} size={48} />
                      </div>

                      {/* Delete handle when selected */}
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            display: 'flex',
                            gap: '4px',
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSticker(st.id);
                            }}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            }}
                            title="Hapus Stiker"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--color-neutral-sub)', fontWeight: 600 }}>Rendering Preview...</div>
          )}
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '0.9rem 0.85rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--color-border-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Sheet Handle Indicator */}
          <div style={{ width: '40px', height: '4px', background: 'var(--color-border)', borderRadius: '2px', margin: '0 auto' }} />

          {/* Navigation Tabs (STICKERS, FRAME, BG, TEXT, FILTER) */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-soft)', overflowX: 'auto' }}>
            {[
              { id: 'stickers', label: 'STICKERS' },
              { id: 'frame', label: 'FRAME' },
              { id: 'bg', label: 'BG' },
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
              <StickerPicker
                onAddSticker={handleAddSticker}
                placedStickers={placedStickers}
                onRemoveSticker={handleRemoveSticker}
                onUpdateSticker={handleUpdateSticker}
                selectedStickerId={selectedStickerId}
                onSelectSticker={setSelectedStickerId}
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

          {activeTab === 'frame' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', textTransform: 'uppercase' }}>
                WARNA FRAME FOTO
              </label>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {template.colorPalettes.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setBackgroundColor(c)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: backgroundColor === c ? '3px solid var(--color-burgundy-deep)' : '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      boxShadow: backgroundColor === c ? '0 4px 10px rgba(0,0,0,0.2)' : 'none',
                      transition: 'transform 0.15s ease',
                    }}
                    title={`Pilih Warna ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bg' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', textTransform: 'uppercase' }}>
                TEKSTUR & PATTERN BACKGROUND
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                {[
                  { id: 'none', label: 'Polos Solid', icon: '🎨' },
                  { id: 'dots', label: 'Polka Dots', icon: '✨' },
                  { id: 'grid', label: 'Grid Lines', icon: '📐' },
                  { id: 'gingham', label: 'Kain Gingham', icon: '🧺' },
                  { id: 'paper', label: 'Vintage Paper', icon: '📜' },
                  { id: 'film-grain', label: 'Retro Grain', icon: '🎞️' },
                ].map((pat) => {
                  const isSelected = backgroundTexture === pat.id;
                  return (
                    <button
                      key={pat.id}
                      onClick={() => setBackgroundTexture(pat.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
                        background: isSelected ? 'var(--color-pink-soft)' : '#ffffff',
                        color: isSelected ? 'var(--color-burgundy-deep)' : 'var(--color-neutral-dark)',
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{pat.icon}</span>
                      <span>{pat.label}</span>
                    </button>
                  );
                })}
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
