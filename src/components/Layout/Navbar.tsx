import React from 'react';
import { Camera, Heart, Sparkles, Monitor } from 'lucide-react';

interface NavbarProps {
  favoritesCount?: number;
  onFilterFavorites?: () => void;
  isShowingFavoritesOnly?: boolean;
  onToggleKiosk?: () => void;
  isKioskMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount = 0,
  onFilterFavorites,
  isShowingFavoritesOnly,
  onToggleKiosk,
  isKioskMode,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo-icon">
          <Camera size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="navbar-title">PhotoBooth ✨</span>
            <span className="navbar-badge">STUDIO</span>
          </div>
        </div>
      </div>

      <nav className="navbar-nav">
        {onFilterFavorites && (
          <button
            onClick={onFilterFavorites}
            className={`category-pill ${isShowingFavoritesOnly ? 'active' : ''}`}
            style={{ padding: '0.45rem 1rem' }}
          >
            <Heart size={16} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} color={isShowingFavoritesOnly ? 'white' : '#f43f5e'} />
            <span>Favorites</span>
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
            background: 'var(--color-pink-soft)',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-pink-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}
        >
          <Sparkles size={14} />
          <span>Aesthetic & Cute</span>
        </div>
      </nav>
    </header>
  );
};
