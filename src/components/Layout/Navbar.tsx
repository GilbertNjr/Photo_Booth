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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #EFE4D8',
        boxShadow: '0 4px 20px rgba(122, 28, 40, 0.04)',
        padding: '0.75rem 1.5rem',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand Logo & Title */}
        <div
          onClick={() => handleMobileNav(onGoToStudio)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <img
            src="/pixbooth-logo.png"
            alt="Pixbooth Logo"
            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: 'var(--color-burgundy-deep)',
              letterSpacing: '-0.02em',
            }}
          >
            PixBooth
          </span>
          <span style={{ fontSize: '1rem' }}>🌸</span>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <button
            onClick={onGoToStudio}
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              color: !isShowingFavoritesOnly ? 'var(--color-burgundy-deep)' : '#4B5563',
              borderBottom: !isShowingFavoritesOnly ? '2.5px solid var(--color-burgundy-deep)' : '2.5px solid transparent',
              padding: '0.35rem 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Beranda
          </button>

          <button
            onClick={onGoToAllFrames || onGoToStudio}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#4B5563',
              padding: '0.35rem 0',
              cursor: 'pointer',
            }}
          >
            Pilih Frame
          </button>

          <button
            onClick={onGoToHowToUse || onGoToStudio}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#4B5563',
              padding: '0.35rem 0',
              cursor: 'pointer',
            }}
          >
            Cara Pakai
          </button>

          <button
            onClick={onGoToAbout || onGoToStudio}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#4B5563',
              padding: '0.35rem 0',
              cursor: 'pointer',
            }}
          >
            Tentang
          </button>
        </nav>

        {/* Right Action Buttons (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onFilterFavorites && (
            <button
              onClick={onFilterFavorites}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                background: isShowingFavoritesOnly ? 'var(--color-burgundy-deep)' : '#FFFFFF',
                color: isShowingFavoritesOnly ? '#FFFFFF' : 'var(--color-burgundy-deep)',
                border: '1.5px solid var(--color-burgundy-deep)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(122, 28, 40, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={15} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} />
              <span>Favorit</span>
              {favoritesCount > 0 && (
                <span
                  style={{
                    background: isShowingFavoritesOnly ? '#FFFFFF' : 'var(--color-burgundy-deep)',
                    color: isShowingFavoritesOnly ? 'var(--color-burgundy-deep)' : '#FFFFFF',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onFilterFavorites}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: 'var(--color-burgundy-deep)',
              border: '1.5px solid #EFE4D8',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Camera size={15} />
            <span>Riwayat Foto</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-only">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-burgundy-deep)',
              cursor: 'pointer',
              padding: '0.2rem',
            }}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid #EFE4D8',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
          }}
        >
          <button
            onClick={() => handleMobileNav(onGoToStudio)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-burgundy-deep)' }}
          >
            <Home size={18} />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => handleMobileNav(onGoToAllFrames || onGoToStudio)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#4B5563' }}
          >
            <LayoutGrid size={18} />
            <span>Pilih Frame</span>
          </button>

          <button
            onClick={() => handleMobileNav(onGoToHowToUse || onGoToStudio)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#4B5563' }}
          >
            <HelpCircle size={18} />
            <span>Cara Pakai</span>
          </button>

          <button
            onClick={() => handleMobileNav(onGoToAbout || onGoToStudio)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#4B5563' }}
          >
            <Info size={18} />
            <span>Tentang</span>
          </button>

          {onFilterFavorites && (
            <button
              onClick={() => handleMobileNav(onFilterFavorites)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-burgundy-deep)' }}
            >
              <Heart size={18} />
              <span>Favorit ({favoritesCount})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
