import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, X, Star, CheckCircle, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { FeedbackService, type FeedbackCategory } from '../../services/feedback/feedbackService';
import { APP_CONFIG } from '../../config/appConfig';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { id: FeedbackCategory; label: string; icon: string }[] = [
  { id: 'frame-request', label: 'Ide Bingkai', icon: '🎨' },
  { id: 'feature', label: 'Fitur Baru', icon: '✨' },
  { id: 'bug', label: 'Lapor Bug', icon: '🐞' },
  { id: 'compliment', label: 'Pujian / Kesan', icon: '💌' },
  { id: 'other', label: 'Lainnya', icon: '💬' },
];

const RATING_LABELS = [
  '',
  'Perlu Ditingkatkan 😕',
  'Cukup Baik 🙂',
  'Bagus! 😊',
  'Suka Banget! 😍',
  'Luar Biasa Sempurna! 🤩',
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<FeedbackCategory>('frame-request');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Check cooldown on mount/open
  useEffect(() => {
    if (isOpen) {
      const cd = FeedbackService.checkCooldown();
      if (!cd.isAllowed) {
        setErrorMessage(`Mohon tunggu ${cd.remainingSeconds} detik sebelum mengirim masukan lagi.`);
      } else {
        setErrorMessage(null);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage('Silakan tuliskan pesan atau saran Anda terlebih dahulu ya.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const response = await FeedbackService.submitFeedback({
      category,
      rating,
      message,
      name,
      email,
    });

    setIsSubmitting(false);

    if (response.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(response.message);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(APP_CONFIG.supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
    setName('');
    setEmail('');
    setCategory('frame-request');
    setRating(5);
    setErrorMessage(null);
    onClose();
  };

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
        className="feedback-modal-dialog"
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
          maxHeight: '92vh',
          overflowY: 'auto',
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

        {isSubmitted ? (
          /* SUCCESS CELEBRATION SCREEN */
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#1F2937',
                margin: 0,
              }}
            >
              Terima Kasih Banyak! ♡
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#4B5563', margin: '0.75rem 0 1.5rem', lineHeight: 1.5 }}>
              Masukan Anda telah berhasil dikirimkan ke email pengembang kami:{' '}
              <strong style={{ color: '#800020' }}>{APP_CONFIG.supportEmail}</strong>. Masukan ini sangat berharga untuk pengembangan PixBooth selanjutnya!
            </p>

            <button
              onClick={handleReset}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '14px',
                background: '#800020',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(128, 0, 32, 0.25)',
              }}
            >
              Kembali ke Studio
            </button>
          </div>
        ) : (
          /* FEEDBACK FORM */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Header with Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
                  border: '1px solid #FDA4AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E11D48',
                  flexShrink: 0,
                }}
              >
                <Mail size={22} color="#E11D48" />
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
                  Punya Saran atau Masukan?
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#716568', margin: '0.15rem 0 0 0', fontWeight: 600 }}>
                  Terhubung langsung ke: <strong style={{ color: '#800020' }}>{APP_CONFIG.supportEmail}</strong>
                </p>
              </div>
            </div>

            {/* Category Selector Pills */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '0.45rem' }}>
                Kategori Masukan:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      border: category === cat.id ? '1.5px solid #800020' : '1px solid #E5E7EB',
                      background: category === cat.id ? 'linear-gradient(135deg, #800020, #9F1239)' : '#FFFFFF',
                      color: category === cat.id ? '#FFFFFF' : '#4B5563',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive 5-Star Rating */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
                Bagaimana pengalamanmu memakai PixBooth?
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.15rem',
                          color: isFilled ? '#F59E0B' : '#D1D5DB',
                          transform: hoverRating === star ? 'scale(1.2)' : 'scale(1)',
                          transition: 'transform 0.15s ease',
                        }}
                      >
                        <Star size={24} fill={isFilled ? '#F59E0B' : 'none'} strokeWidth={1.75} />
                      </button>
                    );
                  })}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>
                  Pesan atau Ide Kamu: <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{message.length}/500</span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Tuliskan ide frame yang kamu inginkan, laporan bug, atau masukan untuk membuat PixBooth lebih baik..."
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '0.86rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  outline: 'none',
                  background: '#FAFAFA',
                  transition: 'border-color 0.2s ease',
                }}
              />
            </div>

            {/* Name & Email Fields (Optional) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.25rem' }}>
                  Nama Panggilan (Opsional):
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sarah"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #E5E7EB',
                    fontSize: '0.84rem',
                    boxSizing: 'border-box',
                    background: '#FAFAFA',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.25rem' }}>
                  Email Kamu (Opsional):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Jika ingin dibalas"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #E5E7EB',
                    fontSize: '0.84rem',
                    boxSizing: 'border-box',
                    background: '#FAFAFA',
                  }}
                />
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#DC2626',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '14px',
                background: isSubmitting || !message.trim() ? '#D1D5DB' : '#800020',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: isSubmitting || !message.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: isSubmitting || !message.trim() ? 'none' : '0 4px 14px rgba(128, 0, 32, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={16} />
              <span>{isSubmitting ? 'Sedang Mengirim ke Support...' : 'Kirim Masukan Sekarang ✨'}</span>
            </button>

            {/* Alternative Direct Actions Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.4rem',
                borderTop: '1px dashed #E5E7EB',
                fontSize: '0.78rem',
                color: '#6B7280',
              }}
            >
              <span>Ingin kirim via aplikasi email?</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#800020',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    padding: 0,
                  }}
                >
                  <Copy size={12} /> {copiedEmail ? 'Tersalin!' : 'Salin Email'}
                </button>
                <span>•</span>
                <a
                  href={FeedbackService.getMailtoUrl({ category, message, rating, name })}
                  style={{
                    color: '#800020',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                >
                  <ExternalLink size={12} /> Buka Mail
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
