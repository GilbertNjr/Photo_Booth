import React, { useState } from 'react';
import { Camera, Heart, Menu, X, Home, LayoutGrid, HelpCircle, Info } from 'lucide-react';

interface NavbarProps {
  favoritesCount?: number;
  onFilterFavorites?: () => void;
  onGoToStudio?: () => void;
  onGoToAllFrames?: () => void;
  onGoToHowToUse?: () => void;
  onGoToAbout?: () => void;
  isShowingFavoritesOnly?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount = 0,
  onFilterFavorites,
  onGoToStudio,
  onGoToAllFrames,
  onGoToHowToUse,
  onGoToAbout,
  isShowingFavoritesOnly = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (action?: () => void) => {
    setIsMobileMenuOpen(false);
    if (action) action();
  };

  return (
    <header className="navbar-mockup">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div
          className="navbar-brand-box"
          onClick={() => handleMobileNav(onGoToStudio)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
        >
          <img
            src="/pixbooth-logo.png"
            alt="Pixbooth Logo"
            className="navbar-brand-logo-img"
          />
          <div className="brand-title-group" style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span className="brand-logo-text">PixBooth</span>
            <span className="brand-logo-sparkle" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D90429' }}>✦</span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="navbar-center-links desktop-only">
          <button className={`nav-link-item ${!isShowingFavoritesOnly ? 'active' : ''}`} onClick={onGoToStudio}>
            Beranda
          </button>
          <button className="nav-link-item" onClick={onGoToAllFrames || onGoToStudio}>
            Pilih Frame
          </button>
          <button className="nav-link-item" onClick={onGoToHowToUse || onGoToStudio}>
            Cara Pakai
          </button>
          <button className="nav-link-item" onClick={onGoToAbout || onGoToStudio}>
            Tentang
          </button>
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="navbar-right-actions desktop-only">
          {onFilterFavorites && (
            <button
              onClick={onFilterFavorites}
              className={`nav-action-pill ${isShowingFavoritesOnly ? 'active' : ''}`}
              title="Koleksi Favorit"
            >
              <Heart size={16} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} color={isShowingFavoritesOnly ? 'white' : '#800020'} />
              <span>Favorit</span>
              {favoritesCount > 0 && <span className="action-badge-count">{favoritesCount}</span>}
            </button>
          )}

          <button
            className="nav-action-pill history-pill"
            onClick={onFilterFavorites}
            title="Riwayat Foto Studio"
          >
            <Camera size={15} />
            <span>Riwayat Foto</span>
          </button>
        </div>

        {/* Hamburger Toggle Button (Mobile Only) */}
        <div className="mobile-menu-toggle-box mobile-only">
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown-drawer">
          <div className="mobile-menu-links-list">
            <button
              className="mobile-menu-item"
              onClick={() => handleMobileNav(onGoToStudio)}
            >
              <Home size={18} />
              <span>Beranda</span>
            </button>

            <button
              className="mobile-menu-item"
              onClick={() => handleMobileNav(onGoToAllFrames || onGoToStudio)}
            >
              <LayoutGrid size={18} />
              <span>Pilih Frame</span>
            </button>

            <button
              className="mobile-menu-item"
              onClick={() => handleMobileNav(onGoToHowToUse || onGoToStudio)}
            >
              <HelpCircle size={18} />
              <span>Cara Pakai</span>
            </button>

            <button
              className="mobile-menu-item"
              onClick={() => handleMobileNav(onGoToAbout || onGoToStudio)}
            >
              <Info size={18} />
              <span>Tentang</span>
            </button>

            {onFilterFavorites && (
              <button
                className={`mobile-menu-item ${isShowingFavoritesOnly ? 'active' : ''}`}
                onClick={() => handleMobileNav(onFilterFavorites)}
              >
                <Heart size={18} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} />
                <span>Favorit ({favoritesCount})</span>
              </button>
            )}

            <button
              className="mobile-menu-item"
              onClick={() => handleMobileNav(onFilterFavorites)}
            >
              <Camera size={18} />
              <span>Riwayat Foto</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
