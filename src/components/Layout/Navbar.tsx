import React, { useState } from 'react';
import { Camera, Heart, Menu, X, Home, LayoutGrid, HelpCircle, Info, Maximize, Minimize, ShieldCheck, Mail } from 'lucide-react';
import { PrivacyModal } from '../Common/PrivacyModal';
import { FeedbackModal } from '../Common/FeedbackModal';

export type NavSection = 'hero' | 'frames' | 'how-to-use' | 'about' | 'favorites';

interface NavbarProps {
  favoritesCount?: number;
  activeSection?: NavSection;
  onFilterFavorites?: () => void;
  onGoToStudio?: () => void;
  onGoToAllFrames?: () => void;
  onGoToHowToUse?: () => void;
  onGoToAbout?: () => void;
  isShowingFavoritesOnly?: boolean;
  isKioskMode?: boolean;
  onToggleKiosk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount = 0,
  activeSection = 'hero',
  onFilterFavorites,
  onGoToStudio,
  onGoToAllFrames,
  onGoToHowToUse,
  onGoToAbout,
  isShowingFavoritesOnly = false,
  isKioskMode = false,
  onToggleKiosk,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

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
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="navbar-center-links desktop-only">
          <button
            className={`nav-link-item ${activeSection === 'hero' && !isShowingFavoritesOnly ? 'active' : ''}`}
            onClick={onGoToStudio}
          >
            Beranda
          </button>
          <button
            className={`nav-link-item ${activeSection === 'frames' && !isShowingFavoritesOnly ? 'active' : ''}`}
            onClick={onGoToAllFrames || onGoToStudio}
          >
            Pilih Frame
          </button>
          <button
            className={`nav-link-item ${activeSection === 'how-to-use' && !isShowingFavoritesOnly ? 'active' : ''}`}
            onClick={onGoToHowToUse || onGoToStudio}
          >
            Cara Pakai
          </button>
          <button
            className={`nav-link-item ${activeSection === 'about' && !isShowingFavoritesOnly ? 'active' : ''}`}
            onClick={onGoToAbout || onGoToStudio}
          >
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

          <button
            className="nav-action-pill"
            onClick={() => setIsPrivacyOpen(true)}
            title="Jaminan Privasi 100% On-Device (Tanpa Database)"
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              color: '#065F46',
              fontWeight: 700,
            }}
          >
            <ShieldCheck size={15} color="#10B981" />
            <span>Privasi</span>
          </button>

          <button
            className="nav-action-pill"
            onClick={() => setIsFeedbackOpen(true)}
            title="Kirim saran atau ide bingkai baru langsung ke developer"
            style={{
              background: 'rgba(225, 29, 72, 0.08)',
              borderColor: 'rgba(225, 29, 72, 0.25)',
              color: '#BE123C',
              fontWeight: 700,
            }}
          >
            <Mail size={15} color="#E11D48" />
            <span>Saran</span>
          </button>

          {onToggleKiosk && (
            <button
              className="nav-action-pill"
              onClick={onToggleKiosk}
              title={isKioskMode ? 'Keluar Mode Kiosk' : 'Masuk Mode Kiosk (Layar Penuh)'}
              style={{
                background: isKioskMode ? '#10B981' : 'transparent',
                color: isKioskMode ? '#ffffff' : 'inherit',
                borderColor: isKioskMode ? '#10B981' : 'var(--color-border)',
                fontWeight: 700,
              }}
            >
              {isKioskMode ? <Minimize size={15} /> : <Maximize size={15} />}
              <span>{isKioskMode ? 'Kiosk ON' : 'Mode Kiosk'}</span>
            </button>
          )}
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
              className={`mobile-menu-item ${activeSection === 'hero' && !isShowingFavoritesOnly ? 'active' : ''}`}
              onClick={() => handleMobileNav(onGoToStudio)}
            >
              <Home size={18} />
              <span>Beranda</span>
            </button>

            <button
              className={`mobile-menu-item ${activeSection === 'frames' && !isShowingFavoritesOnly ? 'active' : ''}`}
              onClick={() => handleMobileNav(onGoToAllFrames || onGoToStudio)}
            >
              <LayoutGrid size={18} />
              <span>Pilih Frame</span>
            </button>

            <button
              className={`mobile-menu-item ${activeSection === 'how-to-use' && !isShowingFavoritesOnly ? 'active' : ''}`}
              onClick={() => handleMobileNav(onGoToHowToUse || onGoToStudio)}
            >
              <HelpCircle size={18} />
              <span>Cara Pakai</span>
            </button>

            <button
              className={`mobile-menu-item ${activeSection === 'about' && !isShowingFavoritesOnly ? 'active' : ''}`}
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

            <button
              className="mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPrivacyOpen(true);
              }}
              style={{ color: '#065F46', fontWeight: 700 }}
            >
              <ShieldCheck size={18} color="#10B981" />
              <span>Jaminan Privasi 100% On-Device</span>
            </button>

            <button
              className="mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFeedbackOpen(true);
              }}
              style={{ color: '#BE123C', fontWeight: 700 }}
            >
              <Mail size={18} color="#E11D48" />
              <span>Punya Saran / Masukan?</span>
            </button>

            {onToggleKiosk && (
              <button
                className="mobile-menu-item"
                onClick={() => handleMobileNav(onToggleKiosk)}
                style={{ color: isKioskMode ? '#10B981' : 'inherit', fontWeight: 700 }}
              >
                {isKioskMode ? <Minimize size={18} /> : <Maximize size={18} />}
                <span>{isKioskMode ? 'Keluar Mode Kiosk (Aktif)' : 'Mode Kiosk (Layar Penuh)'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </header>
  );
};
