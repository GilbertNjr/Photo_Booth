import React, { useState, useEffect, useRef } from 'react';
import type { TemplateData } from '../types/template';
import { CameraService } from '../services/camera/cameraService';
import { CaptureService } from '../services/capture/captureService';
import { CameraFrameOverlay } from '../components/Camera/CameraFrameOverlay';
import { Button } from '../components/Common/Button';
import {
  Camera as CameraIcon,
  RefreshCw,
  ArrowLeft,
  Volume2,
  VolumeX,
  FlipHorizontal,
  Clock,
  RotateCcw,
  Grid,
  Focus,
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
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [mirror, setMirror] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [showFaceGuide, setShowFaceGuide] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);

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
        const success = await CameraService.startCamera(videoRef.current, selectedDeviceId);
        if (mounted) {
          setIsCameraReady(success);
          const devices = await CameraService.getCameraDevices();
          setCameraDevices(devices);
        }
      }
    }

    initCamera();

    return () => {
      mounted = false;
      CameraService.stopCamera();
    };
  }, [selectedDeviceId]);

  // Handle Capture Sequence
  const startCaptureSequence = async () => {
    if (isCapturingSequence || !videoRef.current || activeSlotIndex >= template.photoSlotsCount) return;

    setIsCapturingSequence(true);

    for (let slot = activeSlotIndex; slot < template.photoSlotsCount; slot++) {
      setActiveSlotIndex(slot);

      // Countdown loop (3, 2, 1)
      for (let count = countdownSeconds; count > 0; count--) {
        setCurrentCountdown(count);
        if (soundEnabled) {
          CaptureService.playCountdownBeep(false);
        }
        await new Promise((r) => setTimeout(r, 1000));
      }

      // Final capture trigger
      setCurrentCountdown(0);
      if (soundEnabled) {
        CaptureService.playCountdownBeep(true);
        CaptureService.playShutterSound();
      }

      // Flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 200);

      // Capture frame
      if (videoRef.current) {
        const photoData = CaptureService.captureFrame(videoRef.current, mirror);
        setCapturedPhotos((prev) => {
          const updated = [...prev];
          updated[slot] = photoData;
          return updated;
        });
      }

      await new Promise((r) => setTimeout(r, 600));
      setCurrentCountdown(null);

      // Pause before next photo if more remaining
      if (slot < template.photoSlotsCount - 1) {
        await new Promise((r) => setTimeout(r, 1400));
      }
    }

    setIsCapturingSequence(false);
  };

  const handleRetakeAll = () => {
    setCapturedPhotos([]);
    setActiveSlotIndex(0);
  };

  const isAllPhotosDone = capturedPhotos.filter(Boolean).length === template.photoSlotsCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {/* Fullscreen Flash Overlay */}
      {showFlash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: '#ffffff',
            opacity: 0.95,
            pointerEvents: 'none',
            animation: 'flashAnim 0.2s ease-out',
          }}
        />
      )}

      {/* View Header Bar */}
      <div className="view-header-bar">
        <button className="btn-secondary" onClick={onBackToFrames} disabled={isCapturingSequence}>
          <ArrowLeft size={18} />
          <span>Ganti Frame</span>
        </button>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>
            {template.name}
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-neutral-sub)', fontWeight: 600 }}>
            Terganti {capturedPhotos.filter(Boolean).length} dari {template.photoSlotsCount} Foto
          </span>
        </div>

        {/* Quick Toolbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Timer Selector Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: 'var(--radius-full)',
              padding: '0.2rem',
              border: '1px solid var(--color-border-soft)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Clock size={14} style={{ marginLeft: '0.5rem', color: 'var(--color-pink-primary)' }} />
            {[3, 5, 10].map((sec) => (
              <button
                key={sec}
                onClick={() => setCountdownSeconds(sec)}
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: countdownSeconds === sec ? 'var(--color-pink-primary)' : 'transparent',
                  color: countdownSeconds === sec ? '#fff' : 'var(--color-neutral-dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {sec}s
              </button>
            ))}
          </div>

          <button
            className={`category-pill ${mirror ? 'active' : ''}`}
            onClick={() => setMirror((p) => !p)}
            title="Cermin / Mirror Kamera"
            style={{ padding: '0.45rem 0.8rem' }}
          >
            <FlipHorizontal size={16} />
            <span>Cermin</span>
          </button>

          <button
            className={`category-pill ${showFaceGuide ? 'active' : ''}`}
            onClick={() => setShowFaceGuide((p) => !p)}
            title="Panduan Wajah"
            style={{ padding: '0.45rem 0.8rem' }}
          >
            <Focus size={16} />
            <span>Panduan</span>
          </button>

          <button
            className={`category-pill ${showGridLines ? 'active' : ''}`}
            onClick={() => setShowGridLines((p) => !p)}
            title="Garis Kisi"
            style={{ padding: '0.45rem 0.6rem' }}
          >
            <Grid size={16} />
          </button>

          <button
            className="category-pill"
            onClick={() => setSoundEnabled((p) => !p)}
            title="Toggle Sound"
            style={{ padding: '0.45rem 0.6rem' }}
          >
            {soundEnabled ? <Volume2 size={16} color="#ff7597" /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Left: Live Camera View, Right: Card Panel Sidebar) */}
      <div className="camera-workspace-grid">
        {/* LEFT COLUMN: Main Live Camera Viewport (Tampilan Kamera Utama) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div className="camera-live-viewport">
            {/* Realtime Live Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="camera-live-video"
              style={{
                transform: mirror ? 'scaleX(-1)' : 'none',
                filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
              }}
            />

            {/* Top HUD Badges */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  color: 'white',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isCapturingSequence ? '#ff3b30' : '#10b981',
                    boxShadow: isCapturingSequence ? '0 0 8px #ff3b30' : '0 0 8px #10b981',
                  }}
                />
                <span>
                  {isAllPhotosDone
                    ? 'SELESAI'
                    : `LIVE - FOTO ${activeSlotIndex + 1} / ${template.photoSlotsCount}`}
                </span>
              </div>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(6px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                HD 1080P
              </div>
            </div>

            {/* Face Alignment Guide Overlay */}
            {showFaceGuide && !isAllPhotosDone && (
              <div className="face-alignment-guide">
                <span className="face-alignment-guide-text">Posisi Wajah Di Sini ✨</span>
              </div>
            )}

            {/* Rule of Thirds Grid Lines Overlay */}
            {showGridLines && (
              <div className="grid-lines-overlay">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            )}

            {/* Countdown Overlay */}
            {currentCountdown !== null && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 100,
                  background: 'rgba(0, 0, 0, 0.45)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-bubbly)',
                    fontSize: currentCountdown === 0 ? '6.5rem' : '8.5rem',
                    fontWeight: 900,
                    color: 'white',
                    textShadow: '0 8px 32px rgba(255, 117, 151, 0.9)',
                    animation: 'pulse 0.9s infinite',
                  }}
                >
                  {currentCountdown === 0 ? '📸' : currentCountdown}
                </div>
              </div>
            )}

            {/* Camera Connecting Loading Screen */}
            {!isCameraReady && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(15, 23, 42, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  zIndex: 50,
                  color: 'white',
                }}
              >
                <RefreshCw size={38} className="animate-pulse" color="#ff7597" />
                <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>Menghubungkan Kamera...</p>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  Izinkan akses kamera di peramban browser Anda.
                </span>
              </div>
            )}
          </div>

          {/* Shutter Action Button below Camera Viewport */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {!isAllPhotosDone ? (
              <Button
                variant="primary"
                onClick={startCaptureSequence}
                disabled={isCapturingSequence || !isCameraReady}
                style={{
                  flex: 1,
                  padding: '1.1rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 25px rgba(255, 117, 151, 0.4)',
                }}
              >
                <CameraIcon size={22} />
                <span>
                  {isCapturingSequence
                    ? `Mengambil Foto ${activeSlotIndex + 1}...`
                    : 'Ambil Foto Sekarang 📸'}
                </span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={handleRetakeAll}
                disabled={isCapturingSequence}
                style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}
              >
                <RotateCcw size={18} />
                <span>Foto Ulang Semua</span>
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Sidebar Panel (Card Frame Preview & Controls) */}
        <div className="camera-sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-pink-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PRATINJAU CARD
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', margin: 0 }}>
                Frame Strip
              </h3>
            </div>

            {capturedPhotos.length > 0 && (
              <button
                onClick={handleRetakeAll}
                disabled={isCapturingSequence}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-favorite)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          {/* Clean Frame Card Preview Container */}
          <div
            style={{
              position: 'relative',
              background: 'var(--color-cream-dark)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              aspectRatio: '2 / 3',
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 12px rgba(0,0,0,0.06)',
            }}
          >
            <CameraFrameOverlay
              template={template}
              capturedPhotos={capturedPhotos}
              activeSlotIndex={activeSlotIndex}
              isCameraActive={isCameraReady}
              mirror={mirror}
            />
          </div>

          {/* Captured Photos Thumbnails Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-neutral-sub)' }}>
              Hasil Slot Foto:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(template.photoSlotsCount, 4)}, 1fr)`, gap: '0.4rem' }}>
              {Array.from({ length: template.photoSlotsCount }).map((_, i) => {
                const img = capturedPhotos[i];
                const isActiveSlot = i === activeSlotIndex && !isAllPhotosDone;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-cream-dark)',
                      overflow: 'hidden',
                      border: isActiveSlot ? '2.5px solid var(--color-pink-primary)' : '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--color-neutral-sub)',
                      fontWeight: 700,
                      boxShadow: isActiveSlot ? '0 0 8px rgba(255,117,151,0.5)' : 'none',
                    }}
                  >
                    {img ? (
                      <img src={img} alt={`Slot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>#{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Camera Controls & Settings */}
          <div
            style={{
              background: 'var(--color-cream-bg)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              border: '1px solid var(--color-border-soft)',
            }}
          >
            {/* Countdown Speed Selection */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
                <Clock size={13} /> WAKTU HITUNG MUNDUR
              </label>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {[3, 5, 10].map((sec) => (
                  <button
                    key={sec}
                    className={`category-pill ${countdownSeconds === sec ? 'active' : ''}`}
                    onClick={() => setCountdownSeconds(sec)}
                    disabled={isCapturingSequence}
                    style={{ flex: 1, padding: '0.35rem', justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    {sec} detik
                  </button>
                ))}
              </div>
            </div>

            {/* Select Camera Dropdown (if multiple) */}
            {cameraDevices.length > 1 && (
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-sub)', marginBottom: '0.35rem', display: 'block' }}>
                  PILIH KAMERA
                </label>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.82rem',
                    background: 'white',
                  }}
                >
                  {cameraDevices.map((d, i) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Kamera ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Action Button: Proceed to Customize */}
          {isAllPhotosDone && (
            <Button
              variant="primary"
              onClick={() => onPhotosCaptured(capturedPhotos)}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                width: '100%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
              }}
            >
              <Sparkles size={18} />
              <span>Lanjut Edit Card ✨</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

