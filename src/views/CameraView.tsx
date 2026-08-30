import React, { useState, useEffect, useRef } from 'react';
import type { TemplateData } from '../types/template';
import { CameraService } from '../services/camera/cameraService';
import { CaptureService } from '../services/capture/captureService';
import { GestureService } from '../services/ai/gestureService';
import { FILM_PRESETS } from '../services/filters/colorShaderService';
import type { FilmGradeType } from '../services/filters/colorShaderService';
import { Button } from '../components/Common/Button';
import {
  Camera as CameraIcon,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CameraViewProps {
  template: TemplateData;
  onBackToFrames: () => void;
  onPhotosCaptured: (photos: string[]) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  template,
  onBackToFrames,
  onPhotosCaptured,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [mirror, setMirror] = useState(true);
  const [soundEnabled] = useState(true);
  const [isFlashActive] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [selectedFilmPreset, setSelectedFilmPreset] = useState<FilmGradeType>('original');
  const [isAISmileEnabled] = useState(true);

  // Capture State
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  const activePreset = FILM_PRESETS.find((p) => p.id === selectedFilmPreset) || FILM_PRESETS[0];
  const isAllPhotosDone = capturedPhotos.filter(Boolean).length === template.photoSlotsCount;

  // Initialize Camera
  useEffect(() => {
    let mounted = true;

    async function initCamera() {
      if (videoRef.current) {
        const success = await CameraService.startCamera(videoRef.current);
        if (mounted) {
          setIsCameraReady(success);
        }
      }
    }

    initCamera();

    return () => {
      mounted = false;
      CameraService.stopCamera();
    };
  }, []);

  // AI Real-Time Smile & Pose Auto-Capture Loop (STOPS completely when isAllPhotosDone is true)
  useEffect(() => {
    if (!isAISmileEnabled || !isCameraReady || isCapturingSequence || isAllPhotosDone) return;

    const interval = setInterval(() => {
      if (videoRef.current && !isCapturingSequence && !isAllPhotosDone) {
        const res = GestureService.detectGesture(videoRef.current);

        // Auto-trigger shutter when smile, wave or 2-finger pose detected from long distance (1-2.5m)
        if (res.confidence >= 0.65 && (res.gesture === 'smile' || res.gesture === 'peace' || res.gesture === 'wave')) {
          setIsSessionStarted(true);
          startCaptureSequence();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isAISmileEnabled, isCameraReady, isCapturingSequence, isAllPhotosDone]);

  // Handle Capture Sequence (Failsafe & Robust for All Slots)
  const startCaptureSequence = async () => {
    if (isCapturingSequence || !videoRef.current || isAllPhotosDone) return;

    setIsSessionStarted(true);
    setIsCapturingSequence(true);

    try {
      const totalSlots = template.photoSlotsCount;
      const startSlot = activeSlotIndex >= totalSlots ? 0 : activeSlotIndex;

      for (let slot = startSlot; slot < totalSlots; slot++) {
        setActiveSlotIndex(slot);

        // Countdown loop (e.g. 3, 2, 1)
        for (let count = countdownSeconds; count > 0; count--) {
          setCurrentCountdown(count);
          try {
            if (soundEnabled) {
              CaptureService.playCountdownBeep(false);
            }
          } catch {
            // Audio silent fallback
          }
          await new Promise((r) => setTimeout(r, 1000));
        }

        // Final capture trigger
        setCurrentCountdown(0);
        try {
          if (soundEnabled) {
            CaptureService.playCountdownBeep(true);
            CaptureService.playShutterSound();
          }
        } catch {
          // Audio silent fallback
        }

        // Flash effect
        if (isFlashActive) {
          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 250);
        }

        // Capture frame with failsafe & live cinematic filter
        if (videoRef.current) {
          const photoData = CaptureService.captureFrame(videoRef.current, mirror, activePreset.filterCss);
          setCapturedPhotos((prev) => {
            const updated = [...prev];
            updated[slot] = photoData;
            return updated;
          });
        }

        await new Promise((r) => setTimeout(r, 500));
        setCurrentCountdown(null);

        // Brief pause before next photo slot if more remain
        if (slot < totalSlots - 1) {
          await new Promise((r) => setTimeout(r, 1200));
        }
      }
    } catch (err) {
      console.error('Capture sequence error:', err);
    } finally {
      setIsCapturingSequence(false);
      setCurrentCountdown(null);
    }
  };

  return (
    <div className="camera-card-mockup-wrapper">
      {/* Fullscreen Flash Overlay */}
      {showFlash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#ffffff',
            opacity: 0.95,
            pointerEvents: 'none',
            animation: 'flashAnim 0.2s ease-out',
          }}
        />
      )}

      {/* Main Elegant Card Container */}
      <div className="camera-card-mockup">
        {/* Top Header Bar */}
        <div className="camera-mockup-header">
          <button
            className="mockup-header-btn"
            onClick={onBackToFrames}
            disabled={isCapturingSequence}
            title="Keluar / Ganti Frame"
          >
            ✕
          </button>

          <h2 className="mockup-header-title">
            {currentCountdown !== null
              ? 'Bersiap!'
              : capturedPhotos.filter(Boolean).length > 0
              ? `Foto ${capturedPhotos.filter(Boolean).length} / ${template.photoSlotsCount}`
              : 'Kamera'}
          </h2>

          <button
            className="mockup-header-btn"
            onClick={() => setMirror((p) => !p)}
            title="Pengaturan Kamera / Mirror"
          >
            ⚙️
          </button>
        </div>

        {/* Camera Viewport Area */}
        <div className="camera-mockup-viewport-wrapper">
          {/* Realtime Live Video Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="camera-mockup-video"
            style={{
              transform: mirror ? 'scaleX(-1)' : 'none',
              filter: FILM_PRESETS.find((p) => p.id === selectedFilmPreset)?.filterCss || 'brightness(1.08)',
            }}
          />

          {/* ⏱️ Clean Top Floating Countdown Overlay (Placed at Top Center to keep face area 100% clean) */}
          {currentCountdown !== null && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 40,
                pointerEvents: 'none',
                animation: 'countdownPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(26, 24, 23, 0.65)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 209, 102, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  key={currentCountdown}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 209, 102, 0.9)',
                    lineHeight: 1,
                  }}
                >
                  {currentCountdown === 0 ? '✨' : currentCountdown}
                </span>
              </div>
            </div>
          )}

          {/* 📐 Screen 3: Live Mini Frame Layout Grid Blueprint Overlay (Hidden during Countdown to prevent overlap) */}
          {currentCountdown === null && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '76px',
                height: template.aspectRatio === '2x6' ? '140px' : '105px',
                background: template.backgroundColor || 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '2px solid rgba(128, 0, 32, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.4)',
                padding: '5px',
                boxSizing: 'border-box',
                zIndex: 25,
                pointerEvents: 'none',
                overflow: 'hidden',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Grid Layout Container */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {template.photoSlots.map((slot, i) => {
                  const img = capturedPhotos[i];
                  const isActive = (i === activeSlotIndex && isCapturingSequence) || (currentCountdown !== null && i === activeSlotIndex);
                  return (
                    <div
                      key={slot.id || i}
                      style={{
                        position: 'absolute',
                        left: `${slot.x}%`,
                        top: `${slot.y}%`,
                        width: `${slot.width}%`,
                        height: `${slot.height}%`,
                        transform: slot.rotation ? `rotate(${slot.rotation}deg)` : 'none',
                        borderRadius: '4px',
                        border: isActive
                          ? '2px solid #D90429'
                          : img
                          ? '1px solid #10B981'
                          : '1px dashed rgba(128, 0, 32, 0.4)',
                        background: img
                          ? '#000000'
                          : isActive
                          ? 'rgba(217, 4, 41, 0.25)'
                          : 'rgba(255, 255, 255, 0.75)',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isActive ? '0 0 10px rgba(217, 4, 41, 0.9)' : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {img ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <img
                            src={img}
                            alt={`Slot ${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: '#10B981',
                              color: '#ffffff',
                              fontSize: '0.5rem',
                              fontWeight: 900,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            ✓
                          </div>
                        </div>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            color: isActive ? '#D90429' : 'rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          {isActive ? '📸' : i + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Camera Loading Screen */}
          {!isCameraReady && (
            <div className="mockup-camera-loading">
              <RefreshCw size={36} className="animate-pulse" color="#800020" />
              <p style={{ fontWeight: 700, fontSize: '1rem', margin: '0.5rem 0' }}>Menghubungkan Kamera...</p>
              <span style={{ fontSize: '0.82rem', opacity: 0.8 }}>Pastikan Anda memberikan izin akses kamera.</span>
            </div>
          )}
        </div>

        {/* Clean Feedback Subtitle (Outside Viewfinder) */}
        <p className="mockup-feedback-subtitle" style={{ textAlign: 'center', margin: '0.4rem 0 0.1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-burgundy-deep)' }}>
          {currentCountdown !== null
            ? 'Bersiap & Tersenyum! ✨'
            : isAllPhotosDone
            ? 'Semua foto selesai! Klik Lanjut ✦'
            : !isSessionStarted
            ? 'Klik tombol kamera 📸 atau berikan pose ✌️ untuk mulai'
            : `Foto ${activeSlotIndex + 1} dari ${template.photoSlotsCount} • Bersiap!`}
        </p>

        {/* 🎨 Live Pre-Capture Film Filter Selector Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', margin: '0.5rem 0 0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.25rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={14} color="#D90429" />
              <span>Filter Foto Sebelum Capture:</span>
            </span>
            <span style={{ fontSize: '0.74rem', color: '#888', fontWeight: 600 }}>
              {activePreset.name}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.35rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-x',
            }}
          >
            {FILM_PRESETS.map((preset) => {
              const isSelected = selectedFilmPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedFilmPreset(preset.id)}
                  style={{
                    flexShrink: 0,
                    padding: '0.4rem 0.75rem',
                    borderRadius: '9999px',
                    border: isSelected ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
                    background: isSelected ? 'var(--color-burgundy-deep)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--color-neutral-dark)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: isSelected ? '0 4px 12px rgba(128, 0, 32, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                  }}
                  title={preset.subtitle}
                >
                  <span
                    style={{
                      background: isSelected ? 'rgba(255,255,255,0.25)' : '#FFF1F2',
                      color: isSelected ? '#ffffff' : '#D90429',
                      padding: '0.15rem 0.35rem',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                    }}
                  >
                    {preset.badge}
                  </span>
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Quick Toolbar below Viewfinder (Pengatur Waktu Only) */}
        <div className="camera-mockup-toolbar" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="toolbar-toggle-btn active"
            onClick={(e) => {
              e.preventDefault();
              setCountdownSeconds((sec) => (sec === 3 ? 5 : sec === 5 ? 10 : 3));
            }}
            title="Ubah Pengatur Waktu"
            style={{ width: 'auto', padding: '0.5rem 1.25rem', borderRadius: '9999px' }}
          >
            <Clock size={20} color="var(--color-neutral-dark)" />
            <span className="btn-lbl">Pengatur waktu ({countdownSeconds} detik)</span>
          </button>
        </div>

        {/* Clean Shutter Button & Slot Progress Indicator */}
        <div className="camera-mockup-shutter-row">
          <div className="shutter-spacer" />

          {/* Clean Main Camera Shutter Button */}
          <button
            className="mockup-main-shutter-btn"
            onClick={startCaptureSequence}
            disabled={isCapturingSequence || !isCameraReady || isAllPhotosDone}
            title="Klik untuk Ambil Foto 📸"
          >
            <div className="shutter-inner-icon">
              <CameraIcon size={28} color="#FFFFFF" />
            </div>
          </button>

          {/* Bottom Right Slot Counter Badge */}
          <div className="shutter-slot-counter">
            {capturedPhotos.filter(Boolean).length > 0
              ? `${capturedPhotos.filter(Boolean).length}/${template.photoSlotsCount} Foto`
              : `1/${template.photoSlotsCount} Foto`}
          </div>
        </div>

        {/* Proceed to Customize / Retake Buttons when all shots done */}
        {isAllPhotosDone && (
          <div style={{ marginTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Button
              variant="primary"
              onClick={() => onPhotosCaptured(capturedPhotos)}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '9999px',
                background: 'var(--color-burgundy-deep)',
                fontSize: '1rem',
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(128, 0, 32, 0.35)',
              }}
            >
              <Sparkles size={18} />
              <span>Lihat Hasil & Edit Bingkai ✨</span>
            </Button>

            <button
              type="button"
              onClick={() => {
                setCapturedPhotos([]);
                setActiveSlotIndex(0);
                setIsSessionStarted(false);
              }}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-neutral-dark)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🔄 Foto Ulang Dari Awal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

