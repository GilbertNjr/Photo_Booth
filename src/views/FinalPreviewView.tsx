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
  const [selectedPrintLayout, setSelectedPrintLayout] = useState<PrintLayoutType>('4x6');

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
          <span>READY TO SAVE & PRINT</span>
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
          Your Memories Are Ready ✨
        </h1>
        <p style={{ color: 'var(--color-neutral-sub)', fontSize: '1rem', marginTop: '0.25rem' }}>
          Download your high-resolution PNG image or print directly in classic photo strip sizes!
        </p>
      </div>

      {/* Main Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '2.5rem',
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
            gap: '1.2rem',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
            Export & Share
          </h3>

          <Button
            variant="primary"
            onClick={handleDownload}
            style={{ padding: '1rem', fontSize: '1rem', width: '100%' }}
          >
            <Download size={20} />
            <span>Download PNG Image</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setIsPrintModalOpen(true)}
            style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}
          >
            <Printer size={18} color="#7b61ff" />
            <span>Print Photo Strip</span>
          </Button>

          <Button
            variant="secondary"
            onClick={onEditCustomization}
            style={{ padding: '0.9rem', fontSize: '0.95rem', width: '100%' }}
          >
            <Edit3 size={18} />
            <span>Edit Customization</span>
          </Button>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-soft)', margin: '0.5rem 0' }} />

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
            }}
          >
            <RotateCcw size={16} />
            <span>Start New Session</span>
          </button>
        </div>
      </div>

      {/* Print Layout Selection Modal */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title="Select Print Format 🖨️">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.9rem' }}>
            Choose your print layout dimensions. Make sure your printer paper matches the chosen format.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { id: '2x6', name: '2 × 6 inch Photo Strip', desc: 'Classic vertical photo booth strip layout' },
              { id: '4x6', name: '4 × 6 inch Postcard', desc: 'Standard photo paper card format' },
              { id: 'a4', name: 'A4 Multi-Cut Page', desc: 'Fits 2 copies side-by-side on A4 sheet' },
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
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePrint}>
              <Printer size={18} />
              <span>Print Now</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
