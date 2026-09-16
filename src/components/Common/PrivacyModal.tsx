import React from 'react';
import { ShieldCheck, Lock, HardDrive, Sparkles, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(20, 10, 15, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="privacy-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #FFFFFF, #FFFBF9)',
          borderRadius: '24px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(128, 0, 32, 0.25), 0 0 0 1px rgba(128, 0, 32, 0.1)',
          padding: '2rem',
          position: 'relative',
          border: '1px solid rgba(230, 210, 215, 0.8)',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(128, 0, 32, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#800020',
          }}
        >
          <X size={18} />
        </button>

        {/* Header with Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #800020, #B31B38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 18px rgba(128, 0, 32, 0.28)',
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#2A1B1E',
                margin: 0,
              }}
            >
              Jaminan Privasi 100% On-Device
            </h2>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#716568',
                margin: '0.15rem 0 0 0',
                fontWeight: 600,
              }}
            >
              Zero-Server Database Guarantee • PixBooth Studio
            </p>
          </div>
        </div>

        {/* Content Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
          {/* Item 1 */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '0.85rem',
              borderRadius: '14px',
              border: '1px solid rgba(230, 220, 225, 0.6)',
            }}
          >
            <div style={{ color: '#10B981', marginTop: '2px' }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1F2937' }}>
                Tidak Ada Foto yang Disimpan di Server
              </div>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '0.2rem', lineHeight: 1.45 }}>
                Foto dan video webcam diproses secara real-time langsung di memori (RAM) browser Anda melalui WebRTC &amp; HTML5 Canvas. Kami <strong>tidak mengunggah</strong> foto ke server atau database luar.
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '0.85rem',
              borderRadius: '14px',
              border: '1px solid rgba(230, 220, 225, 0.6)',
            }}
          >
            <div style={{ color: '#800020', marginTop: '2px' }}>
              <HardDrive size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1F2937' }}>
                Pembersihan Otomatis Saat Selesai
              </div>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '0.2rem', lineHeight: 1.45 }}>
                Begitu Anda mengunduh foto dan menutup atau me-refresh tab browser, seluruh jejak kamera dan canvas render akan terhapus otomatis dari memori lokal.
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '0.85rem',
              borderRadius: '14px',
              border: '1px solid rgba(230, 220, 225, 0.6)',
            }}
          >
            <div style={{ color: '#F59E0B', marginTop: '2px' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1F2937' }}>
                Hak Cipta &amp; Desain Eksklusif
              </div>
              <div style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '0.2rem', lineHeight: 1.45 }}>
                Desain bingkai scrapbook, tekstur rajut/ombak laut, dan aset stiker dikembangkan khusus untuk PixBooth Studio.
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.08), rgba(255, 117, 151, 0.12))',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#800020',
            fontWeight: 700,
            marginBottom: '1.25rem',
          }}
        >
          © 2026 GilbertNjr. PixBooth Studio. All Rights Reserved.
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '14px',
            background: '#800020',
            color: '#ffffff',
            border: 'none',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(128, 0, 32, 0.25)',
          }}
        >
          Saya Paham &amp; Lanjutkan Foto
        </button>
      </div>
    </div>
  );
};
