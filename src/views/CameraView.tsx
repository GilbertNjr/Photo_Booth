import React, { useState, useEffect, useRef } from 'react';
import type { TemplateData } from '../types/template';
import { CameraService } from '../services/camera/cameraService';
import { CaptureService } from '../services/capture/captureService';
import { FILM_PRESETS } from '../services/filters/colorShaderService';
import type { FilmGradeType } from '../services/filters/colorShaderService';
import { Button } from '../components/Common/Button';
import {
  Camera as CameraIcon,
  RefreshCw,
  Clock,
  Grid,
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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [showFaceGuide] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [selectedFilmPreset] = useState<FilmGradeType>('original');

  // Capture State
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);

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
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 200);

        // Capture frame with failsafe
        if (videoRef.current) {
          const photoData = CaptureService.captureFrame(videoRef.current, mirror);
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

          {/* Screen 2: Countdown Screen Overlay ("Bersiap!") */}
          {currentCountdown !== null && (
            <div className="mockup-countdown-overlay">
              <div className="countdown-glass-card">
                <div className="countdown-number-box">
                  <span className="sparkle-left">✨</span>
                  <span className="countdown-big-number" key={currentCountdown}>
                    {currentCountdown === 0 ? '📸' : currentCountdown}
                  </span>
                  <span className="sparkle-right">✨</span>
                </div>
                <p className="countdown-subtitle">Bersiap untuk foto!</p>
              </div>
            </div>
          )}

          {/* Screen 3: Post Capture Overlay (Thumbnail Stack) */}
          {capturedPhotos.filter(Boolean).length > 0 && currentCountdown === null && (
            <div className="mockup-captured-overlay">
              {/* Right Thumbnail Sidebar Stack with checkmark ✓ */}
              <div className="captured-thumbs-sidebar">
                {Array.from({ length: template.photoSlotsCount }).map((_, i) => {
                  const img = capturedPhotos[i];
                  return (
                    <div key={i} className={`thumb-slot-box ${img ? 'completed' : ''}`}>
                      {img ? (
                        <>
                          <img src={img} alt={`Slot ${i + 1}`} />
                          <div className="slot-check-badge">✓</div>
                        </>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Face Alignment Guide Overlay */}
          {showFaceGuide && !isAllPhotosDone && (
            <div className="face-alignment-guide">
              <span className="face-alignment-guide-text">
                {currentCountdown !== null ? 'Tersenyum! 📸' : 'Posisi Wajah Di Sini ✨'}
              </span>
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

        {/* Quick Toolbar below Viewfinder (⚡ Flash, ⏱️ Timer, 🔲 Grid) */}
        <div className="camera-mockup-toolbar">
          <button
            className={`toolbar-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled((p) => !p)}
            title="Flash / Audio"
          >
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span className="btn-lbl">Flash</span>
          </button>

          <button
            className="toolbar-toggle-btn active"
            onClick={() => setCountdownSeconds((sec) => (sec === 3 ? 5 : sec === 5 ? 10 : 3))}
            title="Waktu Hitung Mundur"
          >
            <Clock size={18} />
            <span className="btn-lbl">Timer ({countdownSeconds}s)</span>
          </button>

          <button
            className={`toolbar-toggle-btn ${showGridLines ? 'active' : ''}`}
            onClick={() => setShowGridLines((p) => !p)}
            title="Garis Kisi Grid"
          >
            <Grid size={18} />
            <span className="btn-lbl">Grid</span>
          </button>
        </div>

        {/* Shutter Button & Slot Progress Indicator */}
        <div className="camera-mockup-shutter-row">
          <div className="shutter-spacer" />

          {/* Main Round Crimson Shutter Button with Double Ring */}
          <button
            className="mockup-main-shutter-btn"
            onClick={startCaptureSequence}
            disabled={isCapturingSequence || !isCameraReady}
          >
            <div className="shutter-inner-icon">
              <CameraIcon size={28} />
            </div>
          </button>

          {/* Bottom Right Slot Counter Badge */}
          <div className="shutter-slot-counter">
            {capturedPhotos.filter(Boolean).length > 0
              ? `${capturedPhotos.filter(Boolean).length}/${template.photoSlotsCount} Foto`
              : `1/${template.photoSlotsCount} Foto`}
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

