import React, { useState, useEffect, useRef } from 'react';
import { Download, Eye, EyeOff, Plus, Minus, RotateCw, Check, ArrowLeft } from 'lucide-react';
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

  // Full Screen / Clean View Mode (Hides editor drawer so user can inspect canvas clearly)
  const [isFullViewMode, setIsFullViewMode] = useState<boolean>(false);

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
      x: 35 + (Math.random() * 30 - 15),
      y: 35 + (Math.random() * 30 - 15),
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

  // Direct Scale (+ / -) Handler
  const handleScaleSticker = (id: string, delta: number) => {
    setPlacedStickers((prev) =>
      prev.map((st) => {
        if (st.id === id) {
          const currentScale = st.scale || 1;
          const newScale = Math.max(0.3, Math.min(3.5, Math.round((currentScale + delta) * 100) / 100));
          return { ...st, scale: newScale };
        }
        return st;
      })
    );
  };

  // Direct Rotate Handler
  const handleRotateSticker = (id: string, angleDelta: number) => {
    setPlacedStickers((prev) =>
      prev.map((st) => {
        if (st.id === id) {
          const currentRot = st.rotation || 0;
          const newRot = (currentRot + angleDelta) % 360;
          return { ...st, rotation: newRot };
        }
        return st;
      })
    );
  };

  // Pointer Drag Handlers
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

  const activeStickerObj = placedStickers.find((st) => st.id === selectedStickerId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: isFullViewMode ? '20px' : '100px' }}>
      {/* Header Bar with Action Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.4rem 0',
          borderBottom: '1px solid var(--color-border-soft)',
        }}
      >
        <button
          onClick={onBackToCamera}
          title="Foto Ulang"
          style={{
            padding: '0.4rem 0.75rem',
            borderRadius: '9999px',
            border: '1.5px solid var(--color-border)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            cursor: 'pointer',
            color: 'var(--color-neutral-dark)',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={15} />
          <span>Foto Ulang</span>
        </button>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            margin: 0,
          }}
        >
          Make It Yours
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Toggle Full View Canvas Button */}
          <button
            onClick={() => setIsFullViewMode(!isFullViewMode)}
            title={isFullViewMode ? "Tampilkan Panel Editor" : "Sembunyikan Panel (Clean View)"}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '9999px',
              border: isFullViewMode ? '1.5px solid var(--color-burgundy-deep)' : '1.5px solid var(--color-border)',
              background: isFullViewMode ? 'var(--color-pink-soft)' : 'white',
              color: 'var(--color-burgundy-deep)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 800,
            }}
          >
            {isFullViewMode ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{isFullViewMode ? 'Buka Panel' : 'Clean View'}</span>
          </button>

          {/* Done & Apply Button */}
          <button
            onClick={handleApply}
            disabled={isRendering}
            title="Selesai & Unduh"
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '9999px',
              border: 'none',
              background: 'var(--color-burgundy-deep)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(122, 28, 40, 0.25)',
            }}
          >
            <Check size={15} />
            <span>Unduh</span>
          </button>
        </div>
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
            maxWidth: 'min(calc(100vw - 32px), 420px)',
            height: isFullViewMode ? 'clamp(450px, 75vh, 680px)' : 'clamp(320px, 48vh, 500px)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none',
            touchAction: 'pan-y',
            overflow: 'visible',
            boxSizing: 'border-box',
            minWidth: 0,
            minHeight: 0,
            transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={() => setSelectedStickerId(null)}
        >
          {livePreviewUrl ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, minHeight: 0, margin: '0 auto' }}>
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

              {/* On-Canvas Floating Sticker Controls Toolbar */}
              {selectedStickerId && activeStickerObj && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-42px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 90,
                    background: 'rgba(20, 20, 22, 0.92)',
                    backdropFilter: 'blur(12px)',
                    color: 'white',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                    animation: 'fadeIn 0.2s ease',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span style={{ fontWeight: 800, color: '#fcd34d' }}>
                    Ukuran: {Math.round((activeStickerObj.scale || 1) * 100)}%
                  </span>

                  <button
                    onClick={() => handleScaleSticker(selectedStickerId, -0.15)}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                    title="Perkecil (-15%)"
                  >
                    <Minus size={12} /> Perkecil
                  </button>

                  <button
                    onClick={() => handleScaleSticker(selectedStickerId, 0.15)}
                    style={{
                      background: 'var(--color-pink-primary)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                    title="Perbesar (+15%)"
                  >
                    <Plus size={12} /> Perbesar
                  </button>

                  <button
                    onClick={() => handleRotateSticker(selectedStickerId, 15)}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                    title="Putar (+15°)"
                  >
                    <RotateCw size={12} />
                  </button>

                  <button
                    onClick={() => setSelectedStickerId(null)}
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '0.2rem 0.5rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    OK
                  </button>
                </div>
              )}

              {/* Interactive Draggable & Resizable Stickers Layer */}
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
                      onWheel={(e) => {
                        e.stopPropagation();
                        const delta = e.deltaY < 0 ? 0.1 : -0.1;
                        handleScaleSticker(st.id, delta);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${st.x}%`,
                        top: `${st.y}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                        cursor: 'grab',
                        touchAction: 'none',
                        zIndex: isSelected ? 60 : 20,
                        padding: '8px',
                        borderRadius: '14px',
                        border: isSelected ? '2px dashed var(--color-burgundy-deep)' : '2px solid transparent',
                        background: isSelected ? 'rgba(255, 255, 255, 0.55)' : 'transparent',
                        backdropFilter: isSelected ? 'blur(4px)' : 'none',
                        transition: 'border 0.15s ease, background 0.15s ease',
                      }}
                      title="Geser stiker, gunakan tombol di sudut untuk perbesar/perkecil!"
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

                      {/* Interactive Corner Action Handles when Selected */}
                      {isSelected && (
                        <>
                          {/* Top-Right: Perbesar (+) Handle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScaleSticker(st.id, 0.15);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-12px',
                              right: '-12px',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: '#10b981',
                              color: 'white',
                              border: '2px solid white',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                              zIndex: 70,
                            }}
                            title="Perbesar Stiker (+15%)"
                          >
                            +
                          </button>

                          {/* Top-Left: Perkecil (-) Handle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScaleSticker(st.id, -0.15);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '-12px',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: '#f59e0b',
                              color: 'white',
                              border: '2px solid white',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                              zIndex: 70,
                            }}
                            title="Perkecil Stiker (-15%)"
                          >
                            −
                          </button>

                          {/* Bottom-Right: Putar (↺) Handle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRotateSticker(st.id, 15);
                            }}
                            style={{
                              position: 'absolute',
                              bottom: '-12px',
                              right: '-12px',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: '#3b82f6',
                              color: 'white',
                              border: '2px solid white',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                              zIndex: 70,
                            }}
                            title="Putar Stiker (+15°)"
                          >
                            ↺
                          </button>

                          {/* Bottom-Left: Hapus (✕) Handle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSticker(st.id);
                            }}
                            style={{
                              position: 'absolute',
                              bottom: '-12px',
                              left: '-12px',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: '#ef4444',
                              color: 'white',
                              border: '2px solid white',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                              zIndex: 70,
                            }}
                            title="Hapus Stiker"
                          >
                            ✕
                          </button>
                        </>
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

        {/* Right Column: Customization Controls Panel (Hidden in Full View Mode to prevent obstruction) */}
        {!isFullViewMode && (
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
        )}
      </div>

      {/* Floating Bottom Download Action Bar (Auto-hides when a sticker is selected to avoid obstruction) */}
      {!selectedStickerId && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
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
              padding: '0.9rem 1.75rem',
              borderRadius: '9999px',
              fontSize: '1rem',
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
            <Download size={19} />
            <span>Unduh Foto (PNG)</span>
          </button>
        </div>
      )}
    </div>
  );
};
