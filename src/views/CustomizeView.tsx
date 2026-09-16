import React, { useState, useEffect, useRef } from 'react';
import { Download, Eye, EyeOff, Plus, Minus, RotateCw, Check, ArrowLeft, Maximize2, Trash2, Copy } from 'lucide-react';
import type { TemplateData, PaperTextureType, GridAspectRatio } from '../types/template';
import type { PhotoFilterType, PlacedSticker } from '../types/editor';
import { FilterPicker } from '../components/PhotoEditor/FilterPicker';
import { TextEditor } from '../components/PhotoEditor/TextEditor';
import { StickerPicker } from '../components/PhotoEditor/StickerPicker';
import { StickerIllustration } from '../components/Common/StickerIllustration';
import { GridAspectSelector } from '../components/TemplatePicker/GridAspectSelector';
import { LayoutBlueprintService } from '../services/layout/layoutBlueprintService';
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
  const [currentTemplate, setCurrentTemplate] = useState<TemplateData>(template);
  const [activeTab, setActiveTab] = useState<'stickers' | 'frame' | 'bg' | 'text' | 'filter' | 'layout'>('stickers');

  // Customization State
  const [selectedFilter, setSelectedFilter] = useState<PhotoFilterType>('original');
  const [backgroundColor, setBackgroundColor] = useState<string>(template.backgroundColor);
  const [backgroundTexture, setBackgroundTexture] = useState<PaperTextureType>(template.backgroundTexture || 'none');
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [customBottomText, setCustomBottomText] = useState<string>('2026.09.15 • PHOTO BOOTH STUDIO');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [skinSmoothness, setSkinSmoothness] = useState<number>(50);
  const [beautyBrightness, setBeautyBrightness] = useState<number>(50);

  // Physical Photobooth Accents
  const [showWashiTape, setShowWashiTape] = useState<boolean>(template.showWashiTape ?? true);
  const [showLiveStamp, setShowLiveStamp] = useState<boolean>(template.showLiveStamp ?? false);
  const [showBarcode, setShowBarcode] = useState<boolean>(template.showBarcode ?? true);
  const [washiTapeColor, setWashiTapeColor] = useState<string>(template.washiTapeColor || 'rgba(255, 230, 205, 0.85)');

  // Full Screen / Clean View Mode (Hides editor drawer so user can inspect canvas clearly)
  const [isFullViewMode, setIsFullViewMode] = useState<boolean>(false);

  // Live Canvas Rendering State
  const [livePreviewUrl, setLivePreviewUrl] = useState<string>('');
  const [isRendering, setIsRendering] = useState(false);

  // Freeform Drag, Rotate & Scale ref
  const previewRef = useRef<HTMLDivElement>(null);
  type DragMode = 'none' | 'move' | 'rotate' | 'scale';
  const dragRef = useRef<{
    mode: DragMode;
    stickerId: string | null;
    startX: number;
    startY: number;
    centerX: number;
    centerY: number;
    initX: number;
    initY: number;
    initRotation: number;
    initScale: number;
    initDist: number;
    initAngle: number;
  }>({
    mode: 'none',
    stickerId: null,
    startX: 0,
    startY: 0,
    centerX: 0,
    centerY: 0,
    initX: 0,
    initY: 0,
    initRotation: 0,
    initScale: 1,
    initDist: 0,
    initAngle: 0,
  });

  // Re-render live preview whenever customization state changes
  useEffect(() => {
    let isCancelled = false;

    async function updatePreview() {
      setIsRendering(true);
      const canvas = document.createElement('canvas');
      const dataUrl = await CanvasEngine.renderFullCanvas(canvas, currentTemplate, capturedPhotos, {
        filter: selectedFilter,
        backgroundColor,
        backgroundTexture,
        customTexts,
        customBottomText,
        placedStickers: [], // Exclude stickers from background to eliminate ghosting
        showWashiTape,
        showLiveStamp,
        showBarcode,
        washiTapeColor,
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
  }, [currentTemplate, capturedPhotos, selectedFilter, backgroundColor, backgroundTexture, customTexts, customBottomText, skinSmoothness, beautyBrightness, showWashiTape, showLiveStamp, showBarcode, washiTapeColor]);

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

  // Duplicate Sticker Handler
  const handleDuplicateSticker = (id: string) => {
    const st = placedStickers.find((s) => s.id === id);
    if (!st) return;
    const newId = `st-${Date.now()}-${Math.random()}`;
    const duplicated: PlacedSticker = {
      ...st,
      id: newId,
      x: Math.min(94, st.x + 5),
      y: Math.min(94, st.y + 5),
    };
    setPlacedStickers((prev) => [...prev, duplicated]);
    setSelectedStickerId(newId);
  };

  // Helper to compute sticker center in screen client coordinates
  const getStickerScreenCenter = (stickerEl: HTMLElement): { x: number; y: number } => {
    const rect = stickerEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  // Pointer Down on Sticker Body (Move)
  const handlePointerDownSticker = (e: React.PointerEvent, id: string, initX: number, initY: number) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    const target = e.currentTarget as HTMLElement;
    const center = getStickerScreenCenter(target);
    const st = placedStickers.find((s) => s.id === id);

    dragRef.current = {
      mode: 'move',
      stickerId: id,
      startX: e.clientX,
      startY: e.clientY,
      centerX: center.x,
      centerY: center.y,
      initX,
      initY,
      initRotation: st?.rotation || 0,
      initScale: st?.scale || 1,
      initDist: 0,
      initAngle: 0,
    };
    target.setPointerCapture(e.pointerId);
  };

  // Pointer Down on Top Rotation Stem & Handle (Free Angle 360° Rotate)
  const handlePointerDownRotate = (e: React.PointerEvent, id: string, stickerEl: HTMLElement | null) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    const st = placedStickers.find((s) => s.id === id);
    if (!st || !stickerEl) return;

    const center = getStickerScreenCenter(stickerEl);
    const initAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI);

    dragRef.current = {
      mode: 'rotate',
      stickerId: id,
      startX: e.clientX,
      startY: e.clientY,
      centerX: center.x,
      centerY: center.y,
      initX: st.x,
      initY: st.y,
      initRotation: st.rotation || 0,
      initScale: st.scale || 1,
      initDist: 0,
      initAngle,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Pointer Down on Corner Scale Handle (Continuous Zoom/Scale)
  const handlePointerDownScale = (e: React.PointerEvent, id: string, stickerEl: HTMLElement | null) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    const st = placedStickers.find((s) => s.id === id);
    if (!st || !stickerEl) return;

    const center = getStickerScreenCenter(stickerEl);
    const initDist = Math.max(10, Math.hypot(e.clientX - center.x, e.clientY - center.y));

    dragRef.current = {
      mode: 'scale',
      stickerId: id,
      startX: e.clientX,
      startY: e.clientY,
      centerX: center.x,
      centerY: center.y,
      initX: st.x,
      initY: st.y,
      initRotation: st.rotation || 0,
      initScale: st.scale || 1,
      initDist,
      initAngle: 0,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Unified Pointer Move (Move / Rotate / Scale)
  const handlePointerMoveSticker = (e: React.PointerEvent) => {
    const { mode, stickerId, centerX, centerY, initX, initY, initRotation, initScale, initDist, initAngle } = dragRef.current;
    if (mode === 'none' || !stickerId || !previewRef.current) return;

    if (mode === 'move') {
      const rect = previewRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const deltaX = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const deltaY = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      const newX = Math.max(2, Math.min(98, initX + deltaX));
      const newY = Math.max(2, Math.min(98, initY + deltaY));

      setPlacedStickers((prev) =>
        prev.map((st) => (st.id === stickerId ? { ...st, x: newX, y: newY } : st))
      );
    } else if (mode === 'rotate') {
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const angleDelta = currentAngle - initAngle;
      let newRot = Math.round((initRotation + angleDelta) % 360);
      if (newRot < 0) newRot += 360;

      setPlacedStickers((prev) =>
        prev.map((st) => (st.id === stickerId ? { ...st, rotation: newRot } : st))
      );
    } else if (mode === 'scale') {
      const currentDist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const ratio = currentDist / Math.max(10, initDist);
      const newScale = Math.max(0.25, Math.min(3.8, Math.round(initScale * ratio * 100) / 100));

      setPlacedStickers((prev) =>
        prev.map((st) => (st.id === stickerId ? { ...st, scale: newScale } : st))
      );
    }
  };

  const handlePointerUpSticker = () => {
    dragRef.current.mode = 'none';
    dragRef.current.stickerId = null;
  };

  // Multi-Touch Pinch-to-Zoom & Two-Finger Twist Rotation for Mobile
  const touchStateRef = useRef<{
    initialDist: number;
    initialAngle: number;
    initialScale: number;
    initialRotation: number;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (e.touches.length === 2) {
      e.stopPropagation();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const angle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * (180 / Math.PI);
      const st = placedStickers.find((s) => s.id === id);
      touchStateRef.current = {
        initialDist: dist,
        initialAngle: angle,
        initialScale: st?.scale || 1,
        initialRotation: st?.rotation || 0,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    if (e.touches.length === 2 && touchStateRef.current) {
      e.stopPropagation();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const angle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * (180 / Math.PI);

      const scaleFactor = dist / Math.max(10, touchStateRef.current.initialDist);
      const newScale = Math.max(0.25, Math.min(3.8, Math.round(touchStateRef.current.initialScale * scaleFactor * 100) / 100));

      const angleDelta = angle - touchStateRef.current.initialAngle;
      let newRot = Math.round((touchStateRef.current.initialRotation + angleDelta) % 360);
      if (newRot < 0) newRot += 360;

      setPlacedStickers((prev) =>
        prev.map((st) => (st.id === id ? { ...st, scale: newScale, rotation: newRot } : st))
      );
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current = null;
  };

  const handleSelectRatio = (ratio: GridAspectRatio | 'all') => {
    if (ratio === 'all') return;
    const adapted = LayoutBlueprintService.adaptTemplate(currentTemplate, ratio, currentTemplate.photoSlotsCount);
    setCurrentTemplate(adapted);
  };

  const handleSelectSlotsCount = (count: number | 'all') => {
    if (count === 'all') return;
    const adapted = LayoutBlueprintService.adaptTemplate(
      currentTemplate,
      currentTemplate.aspectRatio as GridAspectRatio,
      count
    );
    setCurrentTemplate(adapted);
  };

  const handleApply = async () => {
    setIsRendering(true);
    try {
      const canvas = document.createElement('canvas');
      const finalDataUrl = await CanvasEngine.renderFullCanvas(canvas, currentTemplate, capturedPhotos, {
        filter: selectedFilter,
        backgroundColor,
        backgroundTexture,
        customTexts,
        customBottomText,
        placedStickers,
        showWashiTape,
        showLiveStamp,
        showBarcode,
        washiTapeColor,
      });
      onApplyCustomization(finalDataUrl);
    } catch (e) {
      console.error('Error rendering final canvas:', e);
      if (livePreviewUrl) {
        onApplyCustomization(livePreviewUrl);
      }
    } finally {
      setIsRendering(false);
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
            <div
              style={{
                position: 'relative',
                height: '100%',
                maxHeight: '100%',
                aspectRatio: `${template.canvasWidth} / ${template.canvasHeight}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 0,
                minHeight: 0,
                margin: '0 auto',
              }}
            >
              <img
                src={livePreviewUrl}
                alt="Live Customized Preview"
                style={{
                  width: '100%',
                  height: '100%',
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
                      onTouchStart={(e) => handleTouchStart(e, st.id)}
                      onTouchMove={(e) => handleTouchMove(e, st.id)}
                      onTouchEnd={handleTouchEnd}
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
                      title="Geser stiker, gunakan tuas atas untuk putar bebas atau sudut bawah untuk zoom!"
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

                      {/* Interactive Transformer Bounding Box & Handles when Selected */}
                      {isSelected && (
                        <>
                          {/* Live Angle & Scale Badge */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-50px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              background: 'rgba(20, 20, 26, 0.92)',
                              backdropFilter: 'blur(8px)',
                              color: 'white',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '9999px',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              whiteSpace: 'nowrap',
                              pointerEvents: 'none',
                              zIndex: 80,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                              border: '1px solid rgba(255,255,255,0.2)',
                            }}
                          >
                            <span style={{ color: '#60A5FA' }}>📐 {Math.round(rotation)}°</span>
                            <span style={{ opacity: 0.5 }}>|</span>
                            <span style={{ color: '#34D399' }}>🔍 {Math.round(scale * 100)}%</span>
                          </div>

                          {/* Top Center Stem connecting to Rotation Handle */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-24px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '2px',
                              height: '24px',
                              background: 'var(--color-burgundy-deep)',
                              pointerEvents: 'none',
                              zIndex: 69,
                            }}
                          />

                          {/* Top Rotation Handle (Free Continuous 360° Rotate) */}
                          <div
                            onPointerDown={(e) => {
                              const parent = (e.currentTarget.parentElement as HTMLElement);
                              handlePointerDownRotate(e, st.id, parent);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-36px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: '#ffffff',
                              border: '2.5px solid var(--color-burgundy-deep)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'grab',
                              boxShadow: '0 3px 10px rgba(128, 0, 32, 0.35)',
                              zIndex: 75,
                              touchAction: 'none',
                            }}
                            title="Tarik untuk Putar Bebas (0° - 360°)"
                          >
                            <RotateCw size={13} color="var(--color-burgundy-deep)" />
                          </div>

                          {/* Bottom-Right: Corner Scale Handle (Continuous Zoom In/Out) */}
                          <div
                            onPointerDown={(e) => {
                              const parent = (e.currentTarget.parentElement as HTMLElement);
                              handlePointerDownScale(e, st.id, parent);
                            }}
                            style={{
                              position: 'absolute',
                              bottom: '-12px',
                              right: '-12px',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                              color: 'white',
                              border: '2px solid white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'nwse-resize',
                              boxShadow: '0 3px 10px rgba(37, 99, 235, 0.4)',
                              zIndex: 75,
                              touchAction: 'none',
                            }}
                            title="Tarik Sudut untuk Zoom In / Zoom Out"
                          >
                            <Maximize2 size={13} />
                          </div>

                          {/* Top-Left: Hapus (✕) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSticker(st.id);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '-12px',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: '#EF4444',
                              color: 'white',
                              border: '2px solid white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 3px 8px rgba(239, 68, 68, 0.4)',
                              zIndex: 75,
                            }}
                            title="Hapus Stiker"
                          >
                            <Trash2 size={12} />
                          </button>

                          {/* Bottom-Left: Duplikasi (📄) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateSticker(st.id);
                            }}
                            style={{
                              position: 'absolute',
                              bottom: '-12px',
                              left: '-12px',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: '#8B5CF6',
                              color: 'white',
                              border: '2px solid white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 3px 8px rgba(139, 92, 246, 0.4)',
                              zIndex: 75,
                            }}
                            title="Duplikasi Stiker"
                          >
                            <Copy size={12} />
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

            {/* Navigation Tabs (STICKERS, FRAME, BG, LAYOUT, TEXT, FILTER) */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-soft)', overflowX: 'auto' }}>
              {[
                { id: 'stickers', label: 'STICKERS' },
                { id: 'frame', label: 'FRAME' },
                { id: 'bg', label: 'TEKSTUR' },
                { id: 'layout', label: 'GRID' },
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    WARNA FRAME FOTO
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    {currentTemplate.colorPalettes.map((c, i) => (
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

                {/* Physical Photobooth Accents Toggle */}
                <div style={{ borderTop: '1px solid var(--color-border-soft)', paddingTop: '0.85rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                    AKSEN PHOTOBOOTH ASLI
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={showWashiTape}
                        onChange={(e) => setShowWashiTape(e.target.checked)}
                        style={{ accentColor: 'var(--color-burgundy-deep)', width: '16px', height: '16px' }}
                      />
                      <span>📌 Selotip Washi Tape Semi-Transparan</span>
                    </label>

                    {showWashiTape && (
                      <div style={{ display: 'flex', gap: '0.4rem', marginLeft: '1.6rem' }}>
                        {['rgba(255, 230, 205, 0.85)', 'rgba(255, 200, 215, 0.85)', 'rgba(215, 235, 215, 0.85)', 'rgba(210, 230, 255, 0.85)', 'rgba(255, 255, 255, 0.85)'].map((col, idx) => (
                          <button
                            key={idx}
                            onClick={() => setWashiTapeColor(col)}
                            style={{
                              width: '24px',
                              height: '14px',
                              borderRadius: '3px',
                              backgroundColor: col,
                              border: washiTapeColor === col ? '2px solid var(--color-burgundy-deep)' : '1px solid #ccc',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={showLiveStamp}
                        onChange={(e) => setShowLiveStamp(e.target.checked)}
                        style={{ accentColor: 'var(--color-burgundy-deep)', width: '16px', height: '16px' }}
                      />
                      <span>📮 Stempel Pos Tanggal Live ({new Date().toISOString().slice(0, 10)})</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={showBarcode}
                        onChange={(e) => setShowBarcode(e.target.checked)}
                        style={{ accentColor: 'var(--color-burgundy-deep)', width: '16px', height: '16px' }}
                      />
                      <span>🏷️ Barcode Photobox Korea (Serial Number)</span>
                    </label>
                  </div>
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
                    { id: 'matte', label: 'Matte Paper', icon: '📜' },
                    { id: 'polaroid-gloss', label: 'Polaroid Gloss', icon: '📸' },
                    { id: 'linen', label: 'Linen Fabric', icon: '🧵' },
                    { id: 'holographic', label: 'Holographic', icon: '🌈' },
                    { id: 'dots', label: 'Polka Dots', icon: '✨' },
                    { id: 'grid', label: 'Grid Lines', icon: '📐' },
                    { id: 'gingham', label: 'Kain Gingham', icon: '🧺' },
                    { id: 'paper', label: 'Vintage Paper', icon: '📰' },
                    { id: 'film-grain', label: 'Retro Grain', icon: '🎞️' },
                  ].map((pat) => {
                    const isSelected = backgroundTexture === pat.id;
                    return (
                      <button
                        key={pat.id}
                        onClick={() => setBackgroundTexture(pat.id as any)}
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

            {activeTab === 'layout' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <GridAspectSelector
                  selectedRatio={currentTemplate.aspectRatio as any}
                  selectedSlotsCount={currentTemplate.photoSlotsCount}
                  onSelectRatio={handleSelectRatio}
                  onSelectSlotsCount={handleSelectSlotsCount}
                />
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
