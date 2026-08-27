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
  CheckCircle,
  Clock,
  RotateCcw,
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
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3); // 3s default countdown

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
      setCurrentCountdown(0); // Displays 📸 icon
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
        await new Promise((r) => setTimeout(r, 1500));
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

      {/* Hidden Live Video Element for Stream Processing */}
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '640px',
          height: '480px',
          transform: mirror ? 'scaleX(-1)' : 'none',
        }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onBackToFrames} disabled={isCapturingSequence}>
          <ArrowLeft size={18} />
          <span>Change Frame</span>
        </button>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
            {template.name}
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-neutral-sub)' }}>
            Captured {capturedPhotos.filter(Boolean).length} of {template.photoSlotsCount} Photos
          </span>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="category-pill"
            onClick={() => setMirror((p) => !p)}
            title="Flip Mirror"
            style={{ padding: '0.5rem 0.85rem' }}
          >
            <FlipHorizontal size={16} />
            <span>Mirror</span>
          </button>

          <button
            className="category-pill"
            onClick={() => setSoundEnabled((p) => !p)}
            title="Toggle Sound"
            style={{ padding: '0.5rem 0.85rem' }}
          >
            {soundEnabled ? <Volume2 size={16} color="#ff7597" /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Main Camera Workspace */}
      <div className="camera-workspace-grid">
        {/* Left Column: Live Frame Overlay & Countdown Display */}
        <div
          style={{
            position: 'relative',
            background: 'var(--color-cream-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            aspectRatio: '2/3',
            maxHeight: '75vh',
            margin: '0 auto',
            width: '100%',
            maxWidth: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          {/* Live Camera Stream Feed Overlaid into Selected Frame */}
          <CameraFrameOverlay
            template={template}
            capturedPhotos={capturedPhotos}
            activeSlotIndex={activeSlotIndex}
            isCameraActive={isCameraReady}
          />

          {/* Large Countdown Overlay */}
          {currentCountdown !== null && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 100,
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.15s ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bubbly)',
                  fontSize: currentCountdown === 0 ? '6rem' : '8rem',
                  fontWeight: 900,
                  color: 'white',
                  textShadow: '0 8px 30px rgba(255, 117, 151, 0.8)',
                  animation: 'pulse 0.9s infinite',
                }}
              >
                {currentCountdown === 0 ? '📸' : currentCountdown}
              </div>
            </div>
          )}

          {!isCameraReady && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                zIndex: 50,
              }}
            >
              <RefreshCw size={36} className="animate-pulse" color="#ff7597" />
              <p style={{ fontWeight: 600, color: 'var(--color-neutral-dark)' }}>Connecting to Camera...</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-sub)' }}>
                Please allow camera access in your browser prompt.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Sequence Control Panel & Captures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Settings Box */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              Camera Settings
            </h3>

            {/* Countdown Speed Selector */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem' }}>
                <Clock size={14} /> COUNTDOWN SPEED
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[3, 5, 10].map((sec) => (
                  <button
                    key={sec}
                    className={`category-pill ${countdownSeconds === sec ? 'active' : ''}`}
                    onClick={() => setCountdownSeconds(sec)}
                    disabled={isCapturingSequence}
                    style={{ flex: 1, padding: '0.4rem', justifyContent: 'center' }}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Device selector if multiple cameras exist */}
            {cameraDevices.length > 1 && (
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-neutral-sub)', marginBottom: '0.4rem', display: 'block' }}>
                  SELECT CAMERA
                </label>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {cameraDevices.map((d, i) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Camera ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Captured Photos List */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Captured Photos</span>
              {capturedPhotos.length > 0 && (
                <button
                  onClick={handleRetakeAll}
                  disabled={isCapturingSequence}
                  style={{ fontSize: '0.78rem', color: 'var(--color-favorite)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <RotateCcw size={12} /> Retake All
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {Array.from({ length: template.photoSlotsCount }).map((_, i) => {
                const img = capturedPhotos[i];
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-cream-dark)',
                      overflow: 'hidden',
                      border: i === activeSlotIndex && !isAllPhotosDone ? '2px solid var(--color-pink-primary)' : '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--color-neutral-sub)',
                      fontWeight: 700,
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

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {!isAllPhotosDone ? (
              <Button
                variant="primary"
                onClick={startCaptureSequence}
                disabled={isCapturingSequence || !isCameraReady}
                style={{ padding: '1rem', fontSize: '1.05rem', width: '100%' }}
              >
                <CameraIcon size={20} />
                <span>
                  {isCapturingSequence ? 'Capturing Photos...' : 'Take Photos 📸'}
                </span>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => onPhotosCaptured(capturedPhotos)}
                style={{
                  padding: '1rem',
                  fontSize: '1.05rem',
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
                }}
              >
                <CheckCircle size={20} />
                <span>Proceed to Customize ✨</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
