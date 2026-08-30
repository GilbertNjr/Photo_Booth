import React, { useState, useEffect, useRef } from 'react';
import type { TemplateData } from '../types/template';
import { CameraService } from '../services/camera/cameraService';
import { CaptureService } from '../services/capture/captureService';
import { GestureService } from '../services/ai/gestureService';
import type { AIGestureResult } from '../services/ai/gestureService';
import { FILM_PRESETS } from '../services/filters/colorShaderService';
import type { FilmGradeType } from '../services/filters/colorShaderService';
import { Button } from '../components/Common/Button';
import {
  Camera as CameraIcon,
  RefreshCw,
  Clock,
  Grid,
  Sparkles,
  Smile,
  Zap,
  Heart,
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
  const [shutterIconStyle, setShutterIconStyle] = useState<'sparkle' | 'camera' | 'heart' | 'smile'>('sparkle');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [mirror, setMirror] = useState(true);
  const [soundEnabled] = useState(true);
  const [isFlashActive, setIsFlashActive] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [showFaceGuide] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [selectedFilmPreset, setSelectedFilmPreset] = useState<FilmGradeType>('original');
  const [isAISmileEnabled] = useState(true);
  const [aiResult, setAiResult] = useState<AIGestureResult>({ gesture: 'none', confidence: 0, label: 'AI Smile Mode Aktif' });

  // Capture State
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  const activePreset = FILM_PRESETS.find((p) => p.id === selectedFilmPreset) || FILM_PRESETS[0];

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

  // AI Real-Time Smile & Pose Auto-Capture Loop
  useEffect(() => {
    if (!isAISmileEnabled || !isCameraReady || isCapturingSequence) return;

    const interval = setInterval(() => {
      if (videoRef.current && !isCapturingSequence) {
        const res = GestureService.detectGesture(videoRef.current);
        setAiResult(res);

        // Auto-trigger shutter when smile, wave or 2-finger pose detected from long distance (1-2.5m)
        if (res.confidence >= 0.65 && (res.gesture === 'smile' || res.gesture === 'peace' || res.gesture === 'wave')) {
          startCaptureSequence();
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isAISmileEnabled, isCameraReady, isCapturingSequence]);

  // Handle Capture Sequence (Failsafe & Robust for All Slots)
  const startCaptureSequence = async () => {
    if (isCapturingSequence || !videoRef.current) return;

    // Reset captured photos if starting from beginning when all were done
    if (capturedPhotos.filter(Boolean).length === template.photoSlotsCount) {
      setCapturedPhotos([]);
      setActiveSlotIndex(0);
    }

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

  const isAllPhotosDone = capturedPhotos.filter(Boolean).length === template.photoSlotsCount;

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

          {/* Screen 2: Smooth Clean Glassmorphism Countdown Overlay */}
          {currentCountdown !== null && (
            <div className="mockup-countdown-overlay">
              <div className="countdown-glass-card" style={{ flexDirection: 'column', padding: '1.25rem 2rem', gap: '0.75rem', borderRadius: '24px' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="6" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#FFD166"
                      strokeWidth="6"
                      strokeDasharray="264"
                      strokeDashoffset={(264 * (countdownSeconds - (currentCountdown || 0))) / countdownSeconds}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                  </svg>
                  <div className="countdown-number-box">
                    <span className="countdown-big-number" key={currentCountdown} style={{ fontSize: '3.2rem' }}>
                      {currentCountdown === 0 ? '✨' : currentCountdown}
                    </span>
                  </div>
                </div>
                <p className="countdown-subtitle" style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                  {currentCountdown === 0 ? 'CHEESE! 📸' : 'Bersiap & Tersenyum! ✨'}
                </p>
              </div>
            </div>
          )}

          {/* 📐 Screen 3: Live Mini Frame Layout Grid Blueprint Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '80px',
              height: template.aspectRatio === '2x6' ? '145px' : '110px',
              background: template.backgroundColor || 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '2px solid rgba(128, 0, 32, 0.35)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.4)',
              padding: '6px',
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

          {/* AI Real-time Smile & Pose HUD Pill (Hidden during Countdown) */}
          {isAISmileEnabled && isCameraReady && !isAllPhotosDone && currentCountdown === null && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: aiResult.confidence > 0.8 ? 'rgba(217, 4, 41, 0.92)' : 'rgba(26, 24, 23, 0.82)',
                color: '#ffffff',
                padding: '5px 14px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                zIndex: 20,
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.25s ease',
              }}
            >
              <Smile size={14} color="#FFD166" />
              <span>{aiResult.label}</span>
            </div>
          )}

          {/* Face Alignment Guide Overlay (Text hidden during countdown to prevent UI overlap) */}
          {showFaceGuide && !isAllPhotosDone && (
            <div className="face-alignment-guide">
              {currentCountdown === null && (
                <span className="face-alignment-guide-text">
                  Posisi Wajah Di Sini ✨
                </span>
              )}
            </div>
          )}

          {/* Rule of Thirds Grid Lines Overlay */}
          {showGridLines && (
            <div className="grid-lines-overlay">
              <div /><div /><div /><div /><div /><div /><div /><div /><div />
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

        {/* Feedback Subtitle (Screen 3: "Bagus! Lanjut ke pose berikutnya ✦") */}
        {capturedPhotos.filter(Boolean).length > 0 && currentCountdown === null && (
          <p className="mockup-feedback-subtitle">
            {isAllPhotosDone
              ? 'Semua foto selesai! Klik Lanjut ✦'
              : 'Bagus! Lanjut ke pose berikutnya ✦'}
          </p>
        )}

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

        {/* Quick Toolbar below Viewfinder (Kilatan, Pengatur waktu, Jaringan) */}
        <div className="camera-mockup-toolbar">
          {/* Kilatan / Flash Toggle */}
          <button
            type="button"
            className={`toolbar-toggle-btn ${isFlashActive ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsFlashActive((p) => !p);
            }}
            title={isFlashActive ? 'Matikan Flash' : 'Aktifkan Flash'}
          >
            <Zap size={22} color={isFlashActive ? '#EAB308' : '#71717A'} fill={isFlashActive ? '#EAB308' : 'none'} />
            <span className="btn-lbl">Kilatan</span>
          </button>

          {/* Pengatur Waktu / Timer Toggle */}
          <button
            type="button"
            className="toolbar-toggle-btn active"
            onClick={(e) => {
              e.preventDefault();
              setCountdownSeconds((sec) => (sec === 3 ? 5 : sec === 5 ? 10 : 3));
            }}
            title="Ubah Pengatur Waktu"
          >
            <Clock size={22} color="var(--color-neutral-dark)" />
            <span className="btn-lbl">Pengatur waktu ( {countdownSeconds} detik)</span>
          </button>

          {/* Jaringan / Grid Lines Toggle */}
          <button
            type="button"
            className={`toolbar-toggle-btn ${showGridLines ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setShowGridLines((p) => !p);
            }}
            title={showGridLines ? 'Sembunyikan Garis Grid' : 'Tampilkan Garis Grid'}
          >
            <Grid size={22} color={showGridLines ? 'var(--color-burgundy-deep)' : '#71717A'} />
            <span className="btn-lbl">Jaringan</span>
          </button>
        </div>

        {/* Shutter Button & Slot Progress Indicator */}
        <div className="camera-mockup-shutter-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          {/* Custom Shutter Icon Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.85)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-neutral-sub)', marginRight: '0.2rem' }}>Ikon Jepret:</span>
            <button
              type="button"
              onClick={() => setShutterIconStyle('sparkle')}
              style={{
                padding: '3px 8px',
                borderRadius: '9999px',
                border: 'none',
                background: shutterIconStyle === 'sparkle' ? '#800020' : 'transparent',
                color: shutterIconStyle === 'sparkle' ? '#FFF' : '#555',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
              title="Aesthetic Sparkle Shutter ✦"
            >
              <Sparkles size={12} color={shutterIconStyle === 'sparkle' ? '#FFD166' : '#71717A'} />
              <span>Magic ✦</span>
            </button>

            <button
              type="button"
              onClick={() => setShutterIconStyle('camera')}
              style={{
                padding: '3px 8px',
                borderRadius: '9999px',
                border: 'none',
                background: shutterIconStyle === 'camera' ? '#800020' : 'transparent',
                color: shutterIconStyle === 'camera' ? '#FFF' : '#555',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
              title="Classic Camera Icon 📸"
            >
              <CameraIcon size={12} />
              <span>Kamera</span>
            </button>

            <button
              type="button"
              onClick={() => setShutterIconStyle('heart')}
              style={{
                padding: '3px 8px',
                borderRadius: '9999px',
                border: 'none',
                background: shutterIconStyle === 'heart' ? '#800020' : 'transparent',
                color: shutterIconStyle === 'heart' ? '#FFF' : '#555',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
              title="Cute Heart Trigger 💖"
            >
              <Heart size={12} fill={shutterIconStyle === 'heart' ? '#FF85A1' : 'none'} color={shutterIconStyle === 'heart' ? '#FF85A1' : '#71717A'} />
              <span>Heart</span>
            </button>

            <button
              type="button"
              onClick={() => setShutterIconStyle('smile')}
              style={{
                padding: '3px 8px',
                borderRadius: '9999px',
                border: 'none',
                background: shutterIconStyle === 'smile' ? '#800020' : 'transparent',
                color: shutterIconStyle === 'smile' ? '#FFF' : '#555',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
              title="Pose & Smile Trigger ✌️"
            >
              <Smile size={12} color={shutterIconStyle === 'smile' ? '#FFD166' : '#71717A'} />
              <span>Pose ✌️</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div className="shutter-spacer" />

            {/* Main Round Crimson Shutter Button with Double Ring */}
            <button
              className="mockup-main-shutter-btn"
              onClick={startCaptureSequence}
              disabled={isCapturingSequence || !isCameraReady}
              title="Klik untuk Ambil Foto ✨"
            >
              <div className="shutter-inner-icon">
                {shutterIconStyle === 'sparkle' && <Sparkles size={28} color="#FFD166" />}
                {shutterIconStyle === 'camera' && <CameraIcon size={28} color="#FFFFFF" />}
                {shutterIconStyle === 'heart' && <Heart size={28} fill="#FF85A1" color="#FF85A1" />}
                {shutterIconStyle === 'smile' && <Smile size={28} color="#FFD166" />}
              </div>
            </button>

            {/* Bottom Right Slot Counter Badge */}
            <div className="shutter-slot-counter">
              {capturedPhotos.filter(Boolean).length > 0
                ? `${capturedPhotos.filter(Boolean).length}/${template.photoSlotsCount} Foto`
                : `1/${template.photoSlotsCount} Foto`}
            </div>
          </div>
        </div>

        {/* Proceed to Customize Button when all shots done */}
        {isAllPhotosDone && (
          <div style={{ marginTop: '1rem', width: '100%' }}>
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
          </div>
        )}
      </div>
    </div>
  );
};

