import React, { useState } from 'react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { PrintService } from '../services/printing/printService';
import type { PrintLayoutType } from '../services/printing/printService';
import {
  Download,
  Printer,
  Edit3,
  RotateCcw,
  Sparkles,
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `photo-booth-memory-${Date.now()}.png`;
    link.href = finalImageDataUrl;
    link.click();
  };

  const handlePrint = () => {
    PrintService.printCanvas(finalImageDataUrl, selectedPrintLayout);
    setIsPrintModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Hero Title */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--color-pink-soft)',
            color: 'var(--color-pink-primary)',
            padding: '0.3rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}
        >
          <Sparkles size={14} />
          <span>HASIL CROP & CETAK SIAP</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-neutral-dark)',
          }}
        >
          Kenangan Anda Siap Disimpan ✨
        </h1>
        <p style={{ color: 'var(--color-neutral-sub)', fontSize: '1rem', marginTop: '0.25rem' }}>
          Unduh foto resolusi tinggi PNG, cetak langsung dalam ukuran photobooth strip, atau simpan ke HP via QR Code!
        </p>
      </div>

      {/* Main Container */}
      <div
        className="final-preview-grid"
        style={{
          maxWidth: '920px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left: Large High-Res Image Preview */}
        <div
          style={{
            background: 'var(--color-cream-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            aspectRatio: '2/3',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-hover)',
          }}
        >
          <img
            src={finalImageDataUrl}
            alt="Final Photo Booth Output"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-polaroid)',
            }}
          />
        </div>

        {/* Right: Actions Panel */}
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--color-border-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
            Simpan & Cetak Foto 📸
          </h3>

          <Button
            variant="primary"
            onClick={handleDownload}
            style={{ padding: '0.95rem', fontSize: '0.95rem', width: '100%' }}
          >
            <Download size={18} />
            <span>Unduh Gambar PNG (High DPI)</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setIsQrModalOpen(true)}
            style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%', borderColor: 'var(--color-pink-primary)', color: 'var(--color-pink-primary)' }}
          >
            <QrCode size={18} />
            <span>Scan QR Code via HP 📱</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setIsPrintModalOpen(true)}
            style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}
          >
            <Printer size={18} color="#7b61ff" />
            <span>Cetak Photo Strip 🖨️</span>
          </Button>

          <Button
            variant="secondary"
            onClick={onEditCustomization}
            style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}
          >
            <Edit3 size={18} />
            <span>Edit Hiasan & Filter</span>
          </Button>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-soft)', margin: '0.3rem 0' }} />

          <button
            onClick={onNewSession}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: 'var(--color-neutral-sub)',
              fontSize: '0.9rem',
              fontWeight: 600,
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={16} />
            <span>Mulai Sesi Foto Baru ✨</span>
          </button>
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

