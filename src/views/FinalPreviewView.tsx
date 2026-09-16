import React, { useState, useEffect } from 'react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { PrintService } from '../services/printing/printService';
import { CloudStorageService } from '../services/cloud/cloudStorageService';
import { CanvasEngine } from '../services/canvas/canvasEngine';
import { GifRecorderService } from '../services/gif/gifRecorderService';
import { SessionMetricsService } from '../services/analytics/sessionMetricsService';
import type { CloudUploadResponse } from '../services/cloud/cloudStorageService';
import type { PrintLayoutType } from '../services/printing/printService';
import {
  Download,
  Printer,
  Edit3,
  CheckCircle,
  Share2,
  Scissors,
  Film,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface FinalPreviewViewProps {
  finalImageDataUrl: string;
  onEditCustomization: () => void;
  onNewSession: () => void;
}

export const FinalPreviewView: React.FC<FinalPreviewViewProps> = ({
  finalImageDataUrl,
  onEditCustomization,
  onNewSession,
}) => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPrintLayout, setSelectedPrintLayout] = useState<PrintLayoutType>('4x6');
  const [copiedLink, setCopiedLink] = useState(false);
  const [cloudData, setCloudData] = useState<CloudUploadResponse | null>(null);

  // View Mode: Static Print Photo Strip vs Animated Live Motion Boomerang
  const [previewMode, setPreviewMode] = useState<'photo' | 'gif'>('photo');
  const [boomerangFrames, setBoomerangFrames] = useState<string[]>([]);
  const [activeBoomerangIdx, setActiveBoomerangIdx] = useState<number>(0);
  const [isGeneratingGif, setIsGeneratingGif] = useState<boolean>(false);

  // Export Format State: Single Strip (2x6) or Double Strip Pair (4x6)
  const [exportFormat, setExportFormat] = useState<'single' | 'double'>('single');
  const [doubleStripUrl, setDoubleStripUrl] = useState<string>('');
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);

  useEffect(() => {
    const loop = GifRecorderService.generateBoomerangLoop();
    setBoomerangFrames(loop);
  }, []);

  // Animate boomerang loop when previewMode === 'gif'
  useEffect(() => {
    if (previewMode !== 'gif' || boomerangFrames.length === 0) return;
    const interval = setInterval(() => {
      setActiveBoomerangIdx((prev) => (prev + 1) % boomerangFrames.length);
    }, 110);
    return () => clearInterval(interval);
  }, [previewMode, boomerangFrames]);

  useEffect(() => {
    async function syncToCloud() {
      const resp = await CloudStorageService.uploadSessionData(finalImageDataUrl);
      setCloudData(resp);
    }
    syncToCloud();

    async function generateDoubleStrip() {
      if (!finalImageDataUrl) return;
      try {
        const canvas = document.createElement('canvas');
        const doubleUrl = await CanvasEngine.renderDoubleStripCanvas(canvas, finalImageDataUrl, 1200, 1800);
        setDoubleStripUrl(doubleUrl);
      } catch (err) {
        console.warn('Double strip generation fallback:', err);
      }
    }
    generateDoubleStrip();
  }, [finalImageDataUrl]);

  const handleDownload = () => {
    const targetUrl = (exportFormat === 'double' && doubleStripUrl) ? doubleStripUrl : finalImageDataUrl;
    if (!targetUrl) return;

    SessionMetricsService.incrementSessionCount();

    try {
      // 1. Convert Data URL to Blob for seamless mobile & desktop PNG download
      const parts = targetUrl.split(';');
      const raw = atob(parts[1].split(',')[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      const blob = new Blob([uInt8Array], { type: 'image/png' });
      const blobUrl = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const suffix = exportFormat === 'double' ? '_DoubleStrip' : '_SingleStrip';
      const fileName = `PixBooth_${timestamp}${suffix}.png`;

      // 2. Trigger anchor download safely
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(blobUrl);
      }, 500);
    } catch (err) {
      console.warn('Blob conversion fallback to direct link download:', err);
      const link = document.createElement('a');
      link.href = targetUrl;
      link.download = `PixBooth_${Date.now()}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 500);
    }
  };

  const handleDownloadGif = async () => {
    if (boomerangFrames.length === 0) return;
    setIsGeneratingGif(true);
    SessionMetricsService.incrementSessionCount();
    try {
      const blob = await GifRecorderService.createAnimatedGifBlob(boomerangFrames, 300, 450, 9);
      const blobUrl = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const fileName = `PixBooth_Motion_${timestamp}.gif`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (err) {
      console.error('Failed to generate GIF:', err);
    } finally {
      setIsGeneratingGif(false);
    }
  };

  const handlePrint = () => {
    const targetUrl = (exportFormat === 'double' && doubleStripUrl) ? doubleStripUrl : finalImageDataUrl;
    PrintService.printCanvas(targetUrl, selectedPrintLayout);
    setIsPrintModalOpen(false);
  };

  const handleCopyLink = () => {
    const url = cloudData?.qrCodeDataUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="camera-card-mockup-wrapper">
      {/* Screen 4: Main Elegant Card Container ("Hasil Akhir") */}
      <div className="camera-card-mockup">
        {/* Top Header Bar */}
        <div className="camera-mockup-header">
          <button className="mockup-header-btn" onClick={onNewSession} title="Keluar">
            ✕
          </button>
          <h2 className="mockup-header-title">Hasil Akhir Studio</h2>
          <button className="mockup-header-btn" onClick={() => setIsPrintModalOpen(true)} title="Format Cetak">
            ⚙️
          </button>
        </div>

        {/* Dual Mode Switcher: Static Print vs Boomerang GIF */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.4rem 0 0.5rem' }}>
          <button
            type="button"
            onClick={() => setPreviewMode('photo')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: previewMode === 'photo' ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
              background: previewMode === 'photo' ? 'var(--color-burgundy-deep)' : '#ffffff',
              color: previewMode === 'photo' ? '#ffffff' : 'var(--color-neutral-dark)',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: previewMode === 'photo' ? '0 4px 12px rgba(128, 0, 32, 0.25)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <ImageIcon size={14} />
            <span>Foto Cetak (PNG)</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode('gif')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: previewMode === 'gif' ? '2px solid #8B5CF6' : '1px solid var(--color-border)',
              background: previewMode === 'gif' ? '#8B5CF6' : '#ffffff',
              color: previewMode === 'gif' ? '#ffffff' : 'var(--color-neutral-dark)',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: previewMode === 'gif' ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Film size={14} />
            <span>Live Motion (GIF) 🎬</span>
            <span style={{ fontSize: '0.62rem', background: '#FF7597', color: '#fff', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>NEW</span>
          </button>
        </div>

        {/* Format Selector Pill Switcher for Print Photo */}
        {previewMode === 'photo' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', margin: '0.2rem 0 0.6rem' }}>
            <button
              type="button"
              onClick={() => setExportFormat('single')}
              style={{
                padding: '0.28rem 0.75rem',
                borderRadius: '9999px',
                border: exportFormat === 'single' ? '1.5px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
                background: exportFormat === 'single' ? 'rgba(128, 0, 32, 0.1)' : '#ffffff',
                color: exportFormat === 'single' ? 'var(--color-burgundy-deep)' : 'var(--color-neutral-sub)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Strip Tunggal (1x)
            </button>

            {doubleStripUrl && (
              <button
                type="button"
                onClick={() => setExportFormat('double')}
                style={{
                  padding: '0.28rem 0.75rem',
                  borderRadius: '9999px',
                  border: exportFormat === 'double' ? '1.5px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
                  background: exportFormat === 'double' ? 'rgba(128, 0, 32, 0.1)' : '#ffffff',
                  color: exportFormat === 'double' ? 'var(--color-burgundy-deep)' : 'var(--color-neutral-sub)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <Scissors size={12} />
                <span>Strip Kembar (2x 4x6)</span>
              </button>
            )}
          </div>
        )}

        {previewMode === 'gif' && (
          <div style={{ textAlign: 'center', fontSize: '0.76rem', color: '#8B5CF6', fontWeight: 600, margin: '0.2rem 0 0.6rem' }}>
            ✨ Animasi Boomerang Loop 3–5 Detik Siap Dibagikan ke TikTok & IG Story!
          </div>
        )}

        {/* Center Viewport Container */}
        <div className="camera-mockup-viewport-wrapper" style={{ position: 'relative', aspectRatio: 'auto', height: 'clamp(300px, 46vh, 460px)', padding: '0.25rem', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minWidth: 0, minHeight: 0, touchAction: 'pan-y', margin: '0 auto' }}>
          {previewMode === 'photo' ? (
            <img
              src={exportFormat === 'double' && doubleStripUrl ? doubleStripUrl : finalImageDataUrl}
              alt="Hasil Akhir Frame PNG"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                borderRadius: '16px',
                boxShadow: '0 16px 40px rgba(122, 28, 40, 0.18), 0 4px 12px rgba(0,0,0,0.06)',
              }}
            />
          ) : (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {boomerangFrames.length > 0 ? (
                <>
                  <img
                    src={boomerangFrames[activeBoomerangIdx]}
                    alt="Live Motion Boomerang"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: '16px',
                      boxShadow: '0 16px 40px rgba(139, 92, 246, 0.25), 0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(20, 20, 30, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
                    <span>BOOMERANG LIVE ({activeBoomerangIdx + 1}/{boomerangFrames.length})</span>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: '1px dashed #8B5CF6', maxWidth: '300px' }}>
                  <Film size={36} color="#8B5CF6" style={{ margin: '0 auto 0.5rem' }} />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-neutral-dark)' }}>Belum Ada Rekaman GIF</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-neutral-sub)', marginTop: '0.3rem' }}>
                    Rekaman gerak boomerang otomatis direkam saat hitung mundur kamera aktif.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginTop: '1rem' }}>
          {previewMode === 'photo' ? (
            /* Main Download Button (PNG) */
            <button
              onClick={handleDownload}
              style={{
                width: '100%',
                background: 'var(--color-burgundy-deep)',
                color: '#ffffff',
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                fontSize: '1.02rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(122, 28, 40, 0.32)',
                transition: 'all 0.2s ease',
              }}
            >
              <Download size={20} />
              <span>{exportFormat === 'double' ? 'Unduh Strip Kembar (4x6) ✂️' : 'Unduh Foto PNG (300 DPI) 📸'}</span>
            </button>
          ) : (
            /* Main Download Button (Animated GIF) */
            <button
              onClick={handleDownloadGif}
              disabled={isGeneratingGif || boomerangFrames.length === 0}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                color: '#ffffff',
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                fontSize: '1.02rem',
                fontWeight: 800,
                border: 'none',
                cursor: (isGeneratingGif || boomerangFrames.length === 0) ? 'not-allowed' : 'pointer',
                opacity: (isGeneratingGif || boomerangFrames.length === 0) ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={20} />
              <span>{isGeneratingGif ? 'Memproses GIF Animasi...' : 'Unduh Animasi (GIF Boomerang) 🎬'}</span>
            </button>
          )}

          {/* Secondary Row 1: Kirim ke HP (QR) & Cetak */}
          <div style={{ display: 'flex', gap: '0.65rem', width: '100%' }}>
            <button
              onClick={() => setIsQrModalOpen(true)}
              style={{
                flex: 1,
                background: '#F5F3FF',
                color: '#7C3AED',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1.5px solid #DDD6FE',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Share2 size={16} />
              <span>Kirim ke HP (QR) 📱</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              style={{
                flex: 1,
                background: '#ffffff',
                color: 'var(--color-neutral-dark)',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1.5px solid var(--color-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Printer size={16} />
              <span>Cetak Foto 🖨️</span>
            </button>
          </div>

          {/* Secondary Row 2: Edit Bingkai & Sesi Baru */}
          <div style={{ display: 'flex', gap: '0.65rem', width: '100%' }}>
            <button
              onClick={onEditCustomization}
              style={{
                flex: 1,
                background: '#ffffff',
                color: 'var(--color-neutral-dark)',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1.5px solid var(--color-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Edit3 size={16} />
              <span>Edit Bingkai</span>
            </button>

            <button
              onClick={onNewSession}
              style={{
                flex: 1,
                background: '#ffffff',
                color: 'var(--color-burgundy-deep)',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1.5px solid var(--color-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Foto Lagi</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Scan Modal */}
      <Modal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} title="Scan QR untuk Simpan di HP 📱">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center', padding: '0.5rem 0' }}>
          <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.92rem' }}>
            Arahkan kamera HP Anda ke QR Code di bawah untuk mengunduh foto strip ini langsung ke galeri HP!
          </p>

          <div
            style={{
              background: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--color-pink-primary)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            {/* SVG QR Code Illustration */}
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="180" height="180" rx="12" fill="white" />
              {/* Outer Position Detection Patterns */}
              <rect x="15" y="15" width="45" height="45" rx="8" fill="#1E1E24" />
              <rect x="23" y="23" width="29" height="29" rx="4" fill="white" />
              <rect x="29" y="29" width="17" height="17" rx="2" fill="#FF7597" />

              <rect x="120" y="15" width="45" height="45" rx="8" fill="#1E1E24" />
              <rect x="128" y="23" width="29" height="29" rx="4" fill="white" />
              <rect x="134" y="29" width="17" height="17" rx="2" fill="#FF7597" />

              <rect x="15" y="120" width="45" height="45" rx="8" fill="#1E1E24" />
              <rect x="23" y="128" width="29" height="29" rx="4" fill="white" />
              <rect x="29" y="134" width="17" height="17" rx="2" fill="#FF7597" />

              {/* Random QR Matrix Data Modules */}
              <rect x="70" y="20" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="90" y="20" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="70" y="40" width="12" height="12" rx="2" fill="#8B5CF6" />
              <rect x="90" y="40" width="12" height="12" rx="2" fill="#1E1E24" />

              <rect x="20" y="70" width="12" height="12" rx="2" fill="#8B5CF6" />
              <rect x="40" y="70" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="60" y="70" width="12" height="12" rx="2" fill="#FF7597" />
              <rect x="80" y="70" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="100" y="70" width="12" height="12" rx="2" fill="#8B5CF6" />
              <rect x="120" y="70" width="12" height="12" rx="2" fill="#1E1E24" />

              <rect x="70" y="90" width="12" height="12" rx="2" fill="#FF7597" />
              <rect x="90" y="90" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="110" y="90" width="12" height="12" rx="2" fill="#8B5CF6" />

              <rect x="70" y="120" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="90" y="120" width="12" height="12" rx="2" fill="#FF7597" />
              <rect x="110" y="120" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="130" y="120" width="12" height="12" rx="2" fill="#8B5CF6" />

              <rect x="70" y="140" width="12" height="12" rx="2" fill="#8B5CF6" />
              <rect x="100" y="140" width="12" height="12" rx="2" fill="#1E1E24" />
              <rect x="120" y="140" width="12" height="12" rx="2" fill="#FF7597" />
            </svg>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-pink-primary)' }}>
              SCAN ME WITH CAMERA 📸
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginTop: '0.5rem' }}>
            <button
              onClick={() => {
                setIsQrModalOpen(false);
                setIsMobileSimulatorOpen(true);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.86rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
              }}
            >
              <span>📲 Simulasi Buka di HP (Mobile Receiver)</span>
            </button>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
              <Button variant="secondary" onClick={handleCopyLink} style={{ flex: 1 }}>
                <Share2 size={16} />
                <span>{copiedLink ? 'Link Tersalin! ✓' : 'Salin Link'}</span>
              </Button>
              <Button variant="primary" onClick={() => setIsQrModalOpen(false)} style={{ flex: 1 }}>
                Selesai
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Smartphone Cloud Sync Receiver Simulator Modal */}
      <Modal isOpen={isMobileSimulatorOpen} onClose={() => setIsMobileSimulatorOpen(false)} title="📱 PixBooth Mobile Cloud Receiver">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', padding: '0.25rem 0' }}>
          {/* Mock Mobile Status Header */}
          <div
            style={{
              width: '100%',
              background: '#F3F4F6',
              borderRadius: '12px',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.76rem',
              color: 'var(--color-neutral-sub)',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span>Tersambung ke Booth #01</span>
            </span>
            <span>ID: {cloudData?.sessionId || 'PB-LIVE'}</span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--color-neutral-sub)', margin: 0 }}>
            Simulasi halaman unduhan yang dilihat pengguna setelah memindai QR Code menggunakan smartphone mereka:
          </p>

          {/* Phone Screen Mockup Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '320px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '2px solid var(--color-border)',
              padding: '1rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.85rem',
            }}
          >
            {/* Image Preview */}
            <div style={{ width: '100%', maxHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', background: '#FAFAFA' }}>
              <img
                src={previewMode === 'gif' && boomerangFrames.length > 0 ? boomerangFrames[activeBoomerangIdx] : finalImageDataUrl}
                alt="Mobile Preview"
                style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>

            {/* Mobile Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
              <button
                onClick={handleDownload}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'var(--color-burgundy-deep)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <Download size={16} />
                <span>Simpan Foto Cetak (PNG)</span>
              </button>

              {boomerangFrames.length > 0 && (
                <button
                  onClick={handleDownloadGif}
                  disabled={isGeneratingGif}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    border: 'none',
                    cursor: isGeneratingGif ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Film size={16} />
                  <span>{isGeneratingGif ? 'Menyiapkan GIF...' : 'Simpan Live Motion (GIF)'}</span>
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '0.5rem' }}>
            <Button variant="primary" onClick={() => setIsMobileSimulatorOpen(false)}>
              Tutup Simulasi
            </Button>
          </div>
        </div>
      </Modal>

      {/* Print Layout Selection Modal */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title="Pilih Format Cetak 🖨️">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.9rem' }}>
            Pilih dimensi tata letak cetak Anda. Pastikan kertas printer Anda sesuai dengan format yang dipilih.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { id: '2x6', name: '2 × 6 inch Photo Strip', desc: 'Format strip foto vertikal klasik khas photobooth' },
              { id: '4x6', name: '4 × 6 inch Postcard', desc: 'Ukuran kertas foto standar kartu pos' },
              { id: 'a4', name: 'A4 Multi-Cut Page', desc: 'Muat 2 salinan cetak berdampingan pada lembar A4' },
            ].map((fmt) => (
              <div
                key={fmt.id}
                onClick={() => setSelectedPrintLayout(fmt.id as PrintLayoutType)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedPrintLayout === fmt.id ? '2px solid var(--color-pink-primary)' : '1px solid var(--color-border)',
                  background: selectedPrintLayout === fmt.id ? 'var(--color-pink-soft)' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{fmt.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-neutral-sub)' }}>{fmt.desc}</p>
                </div>
                {selectedPrintLayout === fmt.id && <CheckCircle size={20} color="#ff7597" />}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsPrintModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handlePrint}>
              <Printer size={18} />
              <span>Cetak Sekarang</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

