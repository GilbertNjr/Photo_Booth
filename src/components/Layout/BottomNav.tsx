import React from 'react';
import { Home, Image as GalleryIcon, Info } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'gallery' | 'about';
  onChangeTab: (tab: 'home' | 'gallery' | 'about') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(255, 253, 250, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--color-border)',
        borderRadius: '9999px',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 12px 32px rgba(92, 6, 18, 0.12)',
        maxWidth: '380px',
        width: 'calc(100% - 32px)',
      }}
    >
      {/* Home Tab */}
      <button
        onClick={() => onChangeTab('home')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          padding: '8px 16px',
          borderRadius: '9999px',
          background: currentTab === 'home' ? 'var(--color-burgundy-deep)' : 'transparent',
          color: currentTab === 'home' ? '#ffffff' : 'var(--color-neutral-sub)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.72rem',
          fontWeight: 700,
        }}
      >
        <Home size={18} />
        <span>Home</span>
      </button>

      {/* Gallery Tab */}
      <button
        onClick={() => onChangeTab('gallery')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          padding: '8px 16px',
          borderRadius: '9999px',
          background: currentTab === 'gallery' ? 'var(--color-burgundy-deep)' : 'transparent',
          color: currentTab === 'gallery' ? '#ffffff' : 'var(--color-neutral-sub)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.72rem',
          fontWeight: 700,
        }}
      >
        <GalleryIcon size={18} />
        <span>Frame</span>
      </button>

      {/* About Tab */}
      <button
        onClick={() => onChangeTab('about')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          padding: '8px 16px',
          borderRadius: '9999px',
          background: currentTab === 'about' ? 'var(--color-burgundy-deep)' : 'transparent',
          color: currentTab === 'about' ? '#ffffff' : 'var(--color-neutral-sub)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.72rem',
          fontWeight: 700,
        }}
      >
        <Info size={18} />
        <span>About</span>
      </button>
    </div>
  );
};
