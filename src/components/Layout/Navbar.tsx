import React from 'react';
import { Camera, Heart } from 'lucide-react';

interface NavbarProps {
  favoritesCount?: number;
  onFilterFavorites?: () => void;
  onGoToStudio?: () => void;
  isShowingFavoritesOnly?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount = 0,
  onFilterFavorites,
  onGoToStudio,
  isShowingFavoritesOnly = false,
}) => {
  return (
    <header className="navbar-mockup">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand-box" onClick={onGoToStudio} style={{ cursor: 'pointer' }}>
          <span className="brand-logo-text">PIXBOOTH</span>
          <span className="brand-camera-badge">📷</span>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="navbar-center-links desktop-only">
          <button className={`nav-link-item ${!isShowingFavoritesOnly ? 'active' : ''}`} onClick={onGoToStudio}>
            Beranda
          </button>
          <button className="nav-link-item" onClick={onGoToStudio}>
            Pilih Frame
          </button>
          <button className="nav-link-item" onClick={() => alert('Fitur Cara Pakai: Pilih frame, ambil foto dengan kamera web, dan simpan hasilnya!')}>
            Cara Pakai
          </button>
          <button className="nav-link-item" onClick={() => alert('PixBooth Studio 100% GRATIS & Bebas Digunakan!')}>
            Harga
          </button>
          <button className="nav-link-item" onClick={() => alert('PixBooth Studio adalah aplikasi photo booth digital estetik!')}>
            Tentang
          </button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-right-actions">
          {onFilterFavorites && (
            <button
              onClick={onFilterFavorites}
              className={`nav-action-pill ${isShowingFavoritesOnly ? 'active' : ''}`}
              title="Koleksi Favorit"
            >
              <Heart size={16} fill={isShowingFavoritesOnly ? 'currentColor' : 'none'} color={isShowingFavoritesOnly ? 'white' : '#800020'} />
              <span className="desktop-only">Favorit</span>
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
      </div>
    </header>
  );
};
