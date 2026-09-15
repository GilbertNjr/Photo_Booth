import React from 'react';
import type { GridAspectRatio } from '../../types/template';
import { Grid, Layers, Smartphone, Square, Image as ImageIcon } from 'lucide-react';

interface GridAspectSelectorProps {
  selectedRatio: GridAspectRatio | 'all';
  selectedSlotsCount?: number | 'all';
  onSelectRatio: (ratio: GridAspectRatio | 'all') => void;
  onSelectSlotsCount?: (count: number | 'all') => void;
}

interface RatioTabItem {
  id: GridAspectRatio | 'all';
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const GridAspectSelector: React.FC<GridAspectSelectorProps> = ({
  selectedRatio,
  selectedSlotsCount = 'all',
  onSelectRatio,
  onSelectSlotsCount,
}) => {
  const ratioTabs: RatioTabItem[] = [
    {
      id: 'all',
      label: 'Semua Format',
      sublabel: 'Tampilkan semua',
      icon: <Layers size={18} />,
    },
    {
      id: '2:6',
      label: 'Strip 2x6',
      sublabel: 'Life Four Cuts',
      icon: <Grid size={18} />,
    },
    {
      id: '4:6',
      label: 'Postcard 4x6',
      sublabel: 'Format Cetak 2x2',
      icon: <ImageIcon size={18} />,
    },
    {
      id: '1:1',
      label: 'Persegi 1:1',
      sublabel: 'Instagram Polaroid',
      icon: <Square size={18} />,
    },
    {
      id: '3:4',
      label: 'Portrait 3:4',
      sublabel: 'Classic Studio',
      icon: <ImageIcon size={18} />,
    },
    {
      id: '9:16',
      label: 'Story 9:16',
      sublabel: 'TikTok & Reels',
      icon: <Smartphone size={18} />,
    },
  ];

  const slotCountOptions = [
    { label: 'Semua Slot', value: 'all' as const },
    { label: '1 Foto', value: 1 },
    { label: '2 Foto', value: 2 },
    { label: '3 Foto', value: 3 },
    { label: '4 Foto', value: 4 },
    { label: '6 Foto', value: 6 },
  ];

  return (
    <div
      style={{
        background: 'var(--glass-bg, #ffffff)',
        backdropFilter: 'var(--glass-blur, blur(12px))',
        borderRadius: 'var(--radius-lg, 20px)',
        border: '1px solid var(--color-border, #eee7dd)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(0,0,0,0.03))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-neutral-dark, #212121)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Grid size={18} color="var(--color-pink-primary, #800020)" />
            Pilih Rasio & Format Grid Foto
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-muted, #78716c)', margin: '0.2rem 0 0 0' }}>
            Sesuaikan bentuk kanvas cetak atau digital sesuai keinginan Anda
          </p>
        </div>

        {/* Slot Count Pill Filter */}
        {onSelectSlotsCount && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', paddingBottom: '2px' }}>
            {slotCountOptions.map((opt) => {
              const isActive = selectedSlotsCount === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => onSelectSlotsCount(opt.value)}
                  type="button"
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: isActive ? '1px solid var(--color-pink-primary, #800020)' : '1px solid var(--color-border, #eee7dd)',
                    background: isActive ? 'var(--color-pink-primary, #800020)' : '#ffffff',
                    color: isActive ? '#ffffff' : 'var(--color-neutral-sub, #524b45)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Aspect Ratio Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {ratioTabs.map((tab) => {
          const isSelected = selectedRatio === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectRatio(tab.id)}
              type="button"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.75rem 0.9rem',
                borderRadius: 'var(--radius-md, 14px)',
                border: isSelected
                  ? '2px solid var(--color-pink-primary, #800020)'
                  : '1px solid var(--color-border, #eee7dd)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(244, 194, 194, 0.25) 0%, rgba(255, 255, 255, 0.9) 100%)'
                  : '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                boxShadow: isSelected
                  ? '0 6px 18px rgba(128, 0, 32, 0.12)'
                  : '0 2px 6px rgba(0,0,0,0.02)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isSelected ? 'var(--color-pink-primary, #800020)' : 'var(--color-cream-dark, #f5f0e6)',
                  color: isSelected ? '#ffffff' : 'var(--color-neutral-sub, #524b45)',
                  marginBottom: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.icon}
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: isSelected ? 'var(--color-pink-primary, #800020)' : 'var(--color-neutral-dark, #212121)',
                  marginBottom: '0.15rem',
                }}
              >
                {tab.label}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-neutral-muted, #9c9388)',
                }}
              >
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
