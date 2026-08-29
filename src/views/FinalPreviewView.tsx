import React, { useState, useEffect } from 'react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { PrintService } from '../services/printing/printService';
import { CloudStorageService } from '../services/cloud/cloudStorageService';
import type { CloudUploadResponse } from '../services/cloud/cloudStorageService';
import type { PrintLayoutType } from '../services/printing/printService';
import {
  Download,
  Printer,
  Edit3,
  RotateCcw,
  CheckCircle,
  QrCode,
  Share2,
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

  useEffect(() => {
    async function syncToCloud() {
      const resp = await CloudStorageService.uploadSessionData(finalImageDataUrl);
      setCloudData(resp);
    }
    syncToCloud();
  }, [finalImageDataUrl]);

  const handleDownload = () => {
    if (!finalImageDataUrl) return;

    try {
      // 1. Convert Data URL to Blob for seamless mobile & desktop downloading
      const parts = finalImageDataUrl.split(';');
      const contentType = parts[0].split(':')[1] || 'image/png';
      const raw = atob(parts[1].split(',')[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);
      const fileName = `pixbooth-strip-${Date.now()}.png`;

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
      link.href = finalImageDataUrl;
      link.download = `pixbooth-strip-${Date.now()}.png`;
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

  const handlePrint = () => {
    PrintService.printCanvas(finalImageDataUrl, selectedPrintLayout);
    setIsPrintModalOpen(false);
  };

  const handleCopyLink = () => {
    const url = cloudData?.qrCodeDataUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', width: '100%', maxWidth: '520px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header Subtitle matching "save your strip." */}
      <div style={{ textAlign: 'center', margin: '0.25rem 0' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            fontWeight: 500,
            color: 'var(--color-neutral-sub)',
            letterSpacing: '0.02em',
            margin: 0,
          }}
        >
          save your strip.
        </h2>
      </div>

      {/* Center Image Output Card */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            aspectRatio: '2/3',
            maxHeight: '65vh',
            maxWidth: '420px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 36px rgba(92, 6, 18, 0.12)',
            border: '1px solid var(--color-border-soft)',
          }}
        >
          <img
            src={finalImageDataUrl}
            alt="Final Photo Strip"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 'var(--radius-sm)',
            }}
          />
        </div>

        {/* Pink Star Decorative Badge at bottom left */}
        <span
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '12px',
            fontSize: '1.35rem',
            color: 'var(--color-pink-primary)',
          }}
        >
          ★
        </span>
      </div>

      {/* 4 Action Buttons Grid matching reference screenshot */}
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        {/* Row 1: Solid Red Buttons (Download & Print) */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              background: 'var(--color-pink-primary)',
              color: '#ffffff',
              padding: '0.85rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.96rem',
              fontWeight: 800,
              border: '1.5px dashed rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(211, 47, 47, 0.25)',
            }}
          >
            <Download size={18} />
            <span>Download</span>
          </button>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            style={{
              flex: 1,
              background: 'var(--color-pink-primary)',
              color: '#ffffff',
              padding: '0.85rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.96rem',
              fontWeight: 800,
              border: '1.5px dashed rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(211, 47, 47, 0.25)',
            }}
          >
            <Printer size={18} />
            <span>Print</span>
          </button>
        </div>

        {/* Row 2: Outlined Dashed Buttons (Edit Again & Retake) */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onEditCustomization}
            style={{
              flex: 1,
              background: '#ffffff',
              color: 'var(--color-burgundy-deep)',
              padding: '0.85rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.96rem',
              fontWeight: 800,
              border: '1.5px dashed var(--color-burgundy-deep)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Edit3 size={17} />
            <span>Edit Again</span>
          </button>

          <button
            onClick={onNewSession}
            style={{
              flex: 1,
              background: '#ffffff',
              color: 'var(--color-burgundy-deep)',
              padding: '0.85rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.96rem',
              fontWeight: 800,
              border: '1.5px dashed var(--color-burgundy-deep)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <RotateCcw size={17} />
            <span>Retake</span>
          </button>
        </div>

        {/* QR Code Action Option */}
        <button
          onClick={() => setIsQrModalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-neutral-sub)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <QrCode size={15} />
          <span>Simpan ke HP via QR Code 📱</span>
        </button>
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

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={handleCopyLink}>
              <Share2 size={16} />
              <span>{copiedLink ? 'Link Tersalin! ✓' : 'Salin Link Sesi'}</span>
            </Button>
            <Button variant="primary" onClick={() => setIsQrModalOpen(false)}>
              Selesai
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

