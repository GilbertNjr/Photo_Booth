import React, { useState, useEffect, useRef } from 'react';
import type { TemplateData } from '../types/template';
import { CameraService } from '../services/camera/cameraService';
import { CaptureService } from '../services/capture/captureService';
import { GestureService } from '../services/ai/gestureService';
import { ARFilterService } from '../services/ai/arFilterService';
import type { ARFilterType } from '../services/ai/arFilterService';
import { ARFilterBar } from '../components/Camera/ARFilterBar';
import { GifRecorderService } from '../services/gif/gifRecorderService';
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
  const arCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [mirror, setMirror] = useState(true);
  const [soundEnabled] = useState(true);
  const [isFlashActive] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [selectedFilmPreset, setSelectedFilmPreset] = useState<FilmGradeType>('original');
  const [activeARFilter, setActiveARFilter] = useState<ARFilterType>('none');
  const [isAISmileEnabled] = useState(true);
  const [isRingLightOn, setIsRingLightOn] = useState<boolean>(false);
  const [ringLightTone, setRingLightTone] = useState<'studio' | 'warm' | 'soft-pink'>('studio');

  // Capture State
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isStandbyStage, setIsStandbyStage] = useState(true);
  const [poseTransitionCountdown, setPoseTransitionCountdown] = useState<number | null>(null);
  const [currentCountdown, setCurrentCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  const activePreset = FILM_PRESETS.find((p) => p.id === selectedFilmPreset) || FILM_PRESETS[0];
  const isAllPhotosDone = capturedPhotos.filter(Boolean).length === template.photoSlotsCount;

  // Auto-scroll to top smoothly when entering camera view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  // AR Filter Overlay Real-Time Render Loop (60 FPS)
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      if (
        isCameraReady &&
        videoRef.current &&
        arCanvasRef.current &&
        activeARFilter !== 'none'
      ) {
        const vW = videoRef.current.videoWidth || 640;
        const vH = videoRef.current.videoHeight || 480;
        if (arCanvasRef.current.width !== vW || arCanvasRef.current.height !== vH) {
          arCanvasRef.current.width = vW;
          arCanvasRef.current.height = vH;
        }

        ARFilterService.renderAROverlay(
          videoRef.current,
          arCanvasRef.current,
          activeARFilter,
          mirror
        );
      } else if (arCanvasRef.current) {
        const ctx = arCanvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, arCanvasRef.current.width, arCanvasRef.current.height);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isCameraReady, activeARFilter, mirror]);

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

  const currentSlot = template.photoSlots[activeSlotIndex] || template.photoSlots[0];
  const currentSlotRatio = currentSlot
    ? (currentSlot.width * template.canvasWidth) / (currentSlot.height * template.canvasHeight)
    : 4 / 3;

  // Single Slot Capture / Retake Handler
  const captureSingleSlot = async (slot: number) => {
    if (isCapturingSequence || !videoRef.current) return;

    setIsSessionStarted(true);
    setIsCapturingSequence(true);
    setActiveSlotIndex(slot);
    GifRecorderService.startSlotRecording(slot);

    try {
      for (let count = countdownSeconds; count > 0; count--) {
        setCurrentCountdown(count);
        try {
          if (soundEnabled) CaptureService.playCountdownBeep(false);
        } catch {}

        // Grab burst frames for Live Photo Boomerang during countdown
        if (count <= 2 && videoRef.current) {
          for (let b = 0; b < 3; b++) {
            const burstData = activeARFilter !== 'none'
              ? ARFilterService.compositeARWithFrame(videoRef.current, mirror, activePreset.filterCss, currentSlotRatio, activeARFilter)
              : CaptureService.captureFrame(videoRef.current, mirror, activePreset.filterCss, currentSlotRatio);
            if (burstData) GifRecorderService.addFrame(burstData, slot);
            await new Promise((r) => setTimeout(r, 160));
          }
        } else {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      setCurrentCountdown(0);
      try {
        if (soundEnabled) {
          CaptureService.playCountdownBeep(true);
          CaptureService.playShutterSound();
        }
      } catch {}

      if (isFlashActive) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 250);
      }

      if (videoRef.current) {
        const slotObj = template.photoSlots[slot] || template.photoSlots[0];
        const ratio = slotObj
          ? (slotObj.width * template.canvasWidth) / (slotObj.height * template.canvasHeight)
          : 4 / 3;

        const photoData = activeARFilter !== 'none'
          ? ARFilterService.compositeARWithFrame(videoRef.current, mirror, activePreset.filterCss, ratio, activeARFilter)
          : CaptureService.captureFrame(videoRef.current, mirror, activePreset.filterCss, ratio);

        setCapturedPhotos((prev) => {
          const updated = [...prev];
          updated[slot] = photoData;
          return updated;
        });
      }

      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error('Single slot capture error:', err);
    } finally {
      setIsCapturingSequence(false);
      setCurrentCountdown(null);
    }
  };

  // Handle Capture Sequence (Failsafe & Robust for All Slots)
  async function startCaptureSequence() {
    if (isCapturingSequence || !videoRef.current || isAllPhotosDone) return;

    setIsSessionStarted(true);
    setIsCapturingSequence(true);

    try {
      const totalSlots = template.photoSlotsCount;
      const startSlot = activeSlotIndex >= totalSlots ? 0 : activeSlotIndex;

      for (let slot = startSlot; slot < totalSlots; slot++) {
        setActiveSlotIndex(slot);
        GifRecorderService.startSlotRecording(slot);

        const slotObj = template.photoSlots[slot] || template.photoSlots[0];
        const ratio = slotObj
          ? (slotObj.width * template.canvasWidth) / (slotObj.height * template.canvasHeight)
          : 4 / 3;

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

          // Record burst frames for Boomerang GIF during last 2 counts
          if (count <= 2 && videoRef.current) {
            for (let b = 0; b < 3; b++) {
              const burstData = activeARFilter !== 'none'
                ? ARFilterService.compositeARWithFrame(videoRef.current, mirror, activePreset.filterCss, ratio, activeARFilter)
                : CaptureService.captureFrame(videoRef.current, mirror, activePreset.filterCss, ratio);
              if (burstData) GifRecorderService.addFrame(burstData, slot);
              await new Promise((r) => setTimeout(r, 160));
            }
          } else {
            await new Promise((r) => setTimeout(r, 1000));
          }
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

        // Capture frame with failsafe, live cinematic filter, AR compositing & exact slot aspect ratio
        if (videoRef.current) {
          const photoData = activeARFilter !== 'none'
            ? ARFilterService.compositeARWithFrame(videoRef.current, mirror, activePreset.filterCss, ratio, activeARFilter)
            : CaptureService.captureFrame(videoRef.current, mirror, activePreset.filterCss, ratio);

          setCapturedPhotos((prev) => {
            const updated = [...prev];
            updated[slot] = photoData;
            return updated;
          });
        }

        await new Promise((r) => setTimeout(r, 500));
        setCurrentCountdown(null);

        // Comfortable 3-second pose change transition before next photo slot
        if (slot < totalSlots - 1) {
          for (let p = 3; p > 0; p--) {
            setPoseTransitionCountdown(p);
            try {
              if (soundEnabled) CaptureService.playCountdownBeep(false);
            } catch {}
            await new Promise((r) => setTimeout(r, 1000));
          }
          setPoseTransitionCountdown(null);
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

        {/* Standby "Get Ready & Bercermin" Banner */}
        {isStandbyStage && !isCapturingSequence && capturedPhotos.filter(Boolean).length === 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #800020, #A61B34)',
              color: '#FFFFFF',
              padding: '0.75rem 1.25rem',
              borderRadius: '16px',
              margin: '0.25rem 0.85rem 0.85rem',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(128, 0, 32, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>✨</span> Bercermin &amp; Atur Posisi Wajahmu
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.92 }}>
              Kamera aktif dalam mode cermin. Silakan pilih filter warna atau AR di bawah, lalu tekan tombol siap untuk mulai!
            </div>
          </div>
        )}

        {/* 💡 Digital Ring Light Beauty Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.35rem 0.85rem',
            margin: '0 0.85rem 0.65rem',
            background: isRingLightOn ? '#FFFBEB' : '#FFFFFF',
            border: isRingLightOn ? '1.5px solid #F59E0B' : '1px solid var(--color-border-soft)',
            borderRadius: '9999px',
            boxShadow: isRingLightOn ? '0 0 16px rgba(245, 158, 11, 0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.25s ease',
          }}
        >
          <button
            type="button"
            onClick={() => setIsRingLightOn((prev) => !prev)}
            style={{
              background: isRingLightOn ? '#D97706' : '#F3F4F6',
              color: isRingLightOn ? '#FFFFFF' : '#374151',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.28rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>💡 Ring Light Layar:</span>
            <span style={{ color: isRingLightOn ? '#FEF08A' : '#9CA3AF' }}>
              {isRingLightOn ? 'ON' : 'OFF'}
            </span>
          </button>

          {isRingLightOn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {[
                { id: 'studio', label: 'Studio White', color: '#FFFFFF', border: '#9CA3AF' },
                { id: 'warm', label: 'Warm Glow', color: '#FEF08A', border: '#F59E0B' },
                { id: 'soft-pink', label: 'Soft Pink', color: '#FCE7F3', border: '#EC4899' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRingLightTone(t.id as any)}
                  style={{
                    border: ringLightTone === t.id ? `2px solid ${t.border}` : '1px solid #E5E7EB',
                    background: t.color,
                    color: '#1F2937',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: ringLightTone === t.id ? 800 : 600,
                    cursor: 'pointer',
                    boxShadow: ringLightTone === t.id ? '0 0 8px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Camera Viewport Area */}
        <div className="camera-mockup-viewport-wrapper" style={{ position: 'relative' }}>
          {/* 💡 Digital Ring Light Virtual Softbox Glow Frame */}
          {isRingLightOn && (
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '24px',
                pointerEvents: 'none',
                zIndex: 25,
                boxShadow: ringLightTone === 'studio'
                  ? '0 0 80px 30px rgba(255, 255, 255, 0.98), inset 0 0 50px 15px rgba(255, 255, 255, 0.9)'
                  : ringLightTone === 'warm'
                  ? '0 0 80px 30px rgba(255, 230, 160, 0.98), inset 0 0 50px 15px rgba(255, 230, 160, 0.9)'
                  : '0 0 80px 30px rgba(255, 200, 220, 0.98), inset 0 0 50px 15px rgba(255, 200, 220, 0.9)',
                border: ringLightTone === 'studio'
                  ? '10px solid rgba(255, 255, 255, 0.98)'
                  : ringLightTone === 'warm'
                  ? '10px solid rgba(255, 240, 190, 0.98)'
                  : '10px solid rgba(255, 220, 235, 0.98)',
                transition: 'all 0.3s ease',
              }}
            />
          )}
          {/* Pose Transition 3-Second Countdown Overlay */}
          {poseTransitionCountdown !== null && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 60,
                background: 'rgba(20, 10, 15, 0.78)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: '1.5rem',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FECDD3', letterSpacing: '0.02em', marginBottom: '0.5rem' }}>
                💃 Ganti Gaya Berikutnya! ✨
              </div>
              <div
                style={{
                  fontSize: '5rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  textShadow: '0 4px 24px rgba(255, 117, 151, 0.7)',
                  lineHeight: 1,
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease',
                }}
              >
                {poseTransitionCountdown}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#F3F4F6', opacity: 0.9, marginTop: '0.75rem', fontWeight: 600 }}>
                Siapkan pose terbaikmu untuk Foto #{activeSlotIndex + 1}
              </div>
            </div>
          )}

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

          {/* 🌟 AR Face Filter Overlay Canvas */}
          <canvas
            ref={arCanvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 12,
            }}
          />

          {/* 🎯 WYSIWYG Live Framing Guide Overlay (Shows precise active slot aspect ratio & boundary) */}
          {isCameraReady && currentCountdown === null && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  width: currentSlotRatio > 1.33 ? '92%' : `${Math.min(92, Math.round(92 * (currentSlotRatio / 1.33)))}%`,
                  aspectRatio: `${currentSlotRatio}`,
                  maxHeight: '94%',
                  borderRadius: currentSlot?.shape === 'arch' ? '40% 40% 10px 10px' : '14px',
                  boxShadow: '0 0 0 9999px rgba(10, 10, 14, 0.46)',
                  border: '2px dashed rgba(255, 255, 255, 0.88)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                }}
              >
                {/* 4 Corner Crop Marks */}
                <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '14px', height: '14px', borderTop: '3px solid #D90429', borderLeft: '3px solid #D90429' }} />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '14px', height: '14px', borderTop: '3px solid #D90429', borderRight: '3px solid #D90429' }} />
                <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '14px', height: '14px', borderBottom: '3px solid #D90429', borderLeft: '3px solid #D90429' }} />
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '14px', height: '14px', borderBottom: '3px solid #D90429', borderRight: '3px solid #D90429' }} />

                {/* Badge Tag */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(26, 24, 23, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  Area Foto #{activeSlotIndex + 1}
                </div>
              </div>
            </div>
          )}

          {/* ⏱️ Clean Top Floating Countdown Overlay */}
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

          {/* 📐 Screen 3: Live Mini Frame Layout Grid Blueprint Overlay (Clickable Slots for Retake) */}
          {currentCountdown === null && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '76px',
                height: template.aspectRatio === '2x6' || template.aspectRatio === '2:6' ? '140px' : '105px',
                background: template.backgroundColor || 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '2px solid rgba(128, 0, 32, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.4)',
                padding: '5px',
                boxSizing: 'border-box',
                zIndex: 25,
                pointerEvents: 'auto',
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
                  const isActive = (i === activeSlotIndex && isCapturingSequence) || (currentCountdown !== null && i === activeSlotIndex) || (i === activeSlotIndex);
                  return (
                    <div
                      key={slot.id || i}
                      onClick={() => {
                        if (!isCapturingSequence) {
                          setActiveSlotIndex(i);
                        }
                      }}
                      title={`Klik untuk memilih / foto ulang slot #${i + 1}`}
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
                        cursor: isCapturingSequence ? 'default' : 'pointer',
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
            ? 'Semua foto selesai! Klik Lanjut'
            : !isSessionStarted
            ? 'Klik tombol kamera 📸 atau berikan pose ✌️ untuk mulai'
            : `Foto ${activeSlotIndex + 1} dari ${template.photoSlotsCount} • Bersiap!`}
        </p>

        {/* 🌟 Real-Time TikTok-Style AR Face Filter Bar */}
        <div style={{ width: '100%', margin: '0.35rem 0 0.15rem' }}>
          <ARFilterBar activeFilter={activeARFilter} onSelectFilter={setActiveARFilter} />
        </div>

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

        {/* Standby Start Button (Big Friendly Button) */}
        {isStandbyStage && capturedPhotos.filter(Boolean).length === 0 && (
          <div style={{ padding: '0 0.85rem', marginBottom: '0.85rem' }}>
            <button
              type="button"
              className="standby-start-btn"
              onClick={() => {
                setIsStandbyStage(false);
                startCaptureSequence();
              }}
              disabled={!isCameraReady || isCapturingSequence}
              style={{
                width: '100%',
                padding: '0.9rem 1.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #800020, #B31B38)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: !isCameraReady || isCapturingSequence ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(128, 0, 32, 0.35)',
                transition: 'transform 0.15s ease, background 0.15s ease',
              }}
            >
              <CameraIcon size={20} />
              <span>Saya Sudah Siap! Mulai Ambil Foto 📸</span>
            </button>
          </div>
        )}

        {/* Clean Shutter Button & Slot Progress Indicator */}
        <div className="camera-mockup-shutter-row">
          <div className="shutter-spacer" />

          {/* Clean Main Camera Shutter Button */}
          <button
            className="mockup-main-shutter-btn"
            onClick={() => {
              setIsStandbyStage(false);
              if (capturedPhotos[activeSlotIndex]) {
                captureSingleSlot(activeSlotIndex);
              } else {
                startCaptureSequence();
              }
            }}
            disabled={isCapturingSequence || !isCameraReady}
            title={
              capturedPhotos[activeSlotIndex]
                ? `Foto ulang slot #${activeSlotIndex + 1} 📸`
                : "Klik untuk Ambil Foto 📸"
            }
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

        {/* 🌟 Interactive Slot-by-Slot Retake Gallery (Pilih Slot Mana Saja untuk Diulang) */}
        {capturedPhotos.filter(Boolean).length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              width: '100%',
              background: '#FFFBF9',
              border: '1.5px solid #F3E8E2',
              borderRadius: '18px',
              padding: '0.85rem',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.65rem',
                flexWrap: 'wrap',
                gap: '0.35rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-neutral-dark)' }}>
                Galeri Hasil Foto ({capturedPhotos.filter(Boolean).length}/{template.photoSlotsCount})
              </span>
              <span style={{ fontSize: '0.74rem', color: '#800020', fontWeight: 700 }}>
                💡 Klik "Ulang" pada foto yang ingin diganti
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(template.photoSlotsCount, 4)}, 1fr)`,
                gap: '0.5rem',
                width: '100%',
              }}
            >
              {Array.from({ length: template.photoSlotsCount }).map((_, idx) => {
                const photo = capturedPhotos[idx];
                const isCurrent = activeSlotIndex === idx && isCapturingSequence;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                      alignItems: 'center',
                      background: '#FFFFFF',
                      border: isCurrent ? '2px solid #800020' : '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '0.4rem',
                      boxShadow: isCurrent ? '0 4px 12px rgba(128, 0, 32, 0.18)' : '0 2px 6px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#F3F4F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {photo ? (
                        <img src={photo} alt={`Foto Slot ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF' }}>Slot #{idx + 1}</span>
                      )}
                      <span
                        style={{
                          position: 'absolute',
                          top: '3px',
                          left: '3px',
                          background: 'rgba(0,0,0,0.65)',
                          color: '#FFFFFF',
                          fontSize: '0.6rem',
                          fontWeight: 800,
                          padding: '0.05rem 0.3rem',
                          borderRadius: '4px',
                        }}
                      >
                        #{idx + 1}
                      </span>
                    </div>

                    {photo ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsStandbyStage(false);
                          captureSingleSlot(idx);
                        }}
                        disabled={isCapturingSequence}
                        style={{
                          width: '100%',
                          padding: '0.35rem 0.15rem',
                          borderRadius: '8px',
                          background: '#800020',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: isCapturingSequence ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.2rem',
                          boxShadow: '0 2px 6px rgba(128, 0, 32, 0.2)',
                        }}
                        title={`Ulangi hanya foto #${idx + 1}`}
                      >
                        <RefreshCw size={10} />
                        <span>Ulang #{idx + 1}</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600 }}>Menunggu</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Proceed to Customize / Reset Buttons when all shots done */}
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
              <span>Lihat Hasil &amp; Edit Bingkai ✨</span>
            </Button>

            <button
              type="button"
              onClick={() => {
                setCapturedPhotos([]);
                setActiveSlotIndex(0);
                setIsSessionStarted(false);
                setIsStandbyStage(true);
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

