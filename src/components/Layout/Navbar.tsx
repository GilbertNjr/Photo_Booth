import React from 'react';
import { Camera, Heart, Sparkles, Monitor } from 'lucide-react';

interface NavbarProps {
  favoritesCount?: number;
  onFilterFavorites?: () => void;
  onGoToStudio?: () => void;
  isShowingFavoritesOnly?: boolean;
  onToggleKiosk?: () => void;
  isKioskMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount = 0,
  onFilterFavorites,
  onGoToStudio,
  isShowingFavoritesOnly = false,
  onToggleKiosk,
  isKioskMode,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-brand" onClick={onGoToStudio} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1.4rem', color: 'var(--color-pink-primary)', fontWeight: 900 }}>✦</span>
        <span
          className="navbar-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            letterSpacing: '-0.03em',
          }}
        >
          PixBooth
        </span>
      </div>

      <nav className="navbar-nav">
        {onGoToStudio && (
          <button
            onClick={onGoToStudio}
            className={`category-pill ${!isShowingFavoritesOnly ? 'active' : ''}`}
            style={{ padding: '0.45rem 1rem' }}
          >
            <Camera size={16} />
            <span>Studio</span>
          </button>
        )}

        {onFilterFavorites && (
          <button
            onClick={onFilterFavorites}
            className={`category-pill ${isShowingFavoritesOnly ? 'active' : ''}`}
            style={{ padding: '0.45rem 1rem' }}
          >
            <Heart size={16} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} color={isShowingFavoritesOnly ? 'white' : '#f43f5e'} />
            <span>Favorit</span>
            {favoritesCount > 0 && <span className="category-count">{favoritesCount}</span>}
          </button>
        )}

        {onToggleKiosk && (
          <button
            onClick={onToggleKiosk}
            className={`category-pill desktop-only ${isKioskMode ? 'active' : ''}`}
            title="Toggle Touchscreen Kiosk Mode"
            style={{ padding: '0.45rem 1rem' }}
          >
            <Monitor size={16} />
            <span>{isKioskMode ? 'Kiosk Active' : 'Kiosk Mode'}</span>
          </button>
        )}

        <div
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#f8fafc',
            border: '1px solid var(--color-border)',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-neutral-dark)',
            fontSize: '0.78rem',
            fontWeight: 700,
          }}
        >
          <Sparkles size={14} color="#6366f1" />
          <span>Studio Edition 2026</span>
        </div>
      </nav>
    </header>
  );
};
