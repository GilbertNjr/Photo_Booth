import React from 'react';

interface StickerIllustrationProps {
  content: string;
  size?: number;
  color?: string;
}

export const StickerIllustration: React.FC<StickerIllustrationProps> = ({
  content,
  size = 40,
}) => {
  switch (content) {
    // 🍄 Red Mushroom with White Dots
    case '🍄':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 36C12 21.6406 20.9543 10 32 10C43.0457 10 52 21.6406 52 36H12Z" fill="#E63946" stroke="#900C3F" strokeWidth="3" strokeLinejoin="round"/>
          <circle cx="24" cy="22" r="4.5" fill="#FFFFFF"/>
          <circle cx="40" cy="24" r="3.5" fill="#FFFFFF"/>
          <circle cx="31" cy="16" r="3" fill="#FFFFFF"/>
          <path d="M22 36V48C22 52 26 55 32 55C38 55 42 52 42 48V36H22Z" fill="#FDF0ED" stroke="#B8978A" strokeWidth="3" strokeLinejoin="round"/>
          <ellipse cx="32" cy="55" rx="14" ry="3" fill="rgba(0,0,0,0.15)"/>
        </svg>
      );

    // 📷 Vintage Camera
    case '📷':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="48" height="34" rx="6" fill="#3D3A37" stroke="#1A1817" strokeWidth="3"/>
          <path d="M22 20L25 14H39L42 20H22Z" fill="#6B6560" stroke="#1A1817" strokeWidth="3"/>
          <rect x="12" y="24" width="40" height="10" fill="#E8DFD1" rx="2"/>
          <circle cx="32" cy="37" r="11" fill="#1A1817" stroke="#D4AF37" strokeWidth="3"/>
          <circle cx="32" cy="37" r="6" fill="#4B6584"/>
          <circle cx="30" cy="35" r="2" fill="#FFFFFF" opacity="0.8"/>
          <circle cx="48" cy="26" r="2.5" fill="#E63946"/>
        </svg>
      );

    // 🌺 Hibiscus Flower
    case '🌺':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 32C24 16 12 24 18 36C24 48 32 32 32 32Z" fill="#FF477E"/>
          <path d="M32 32C48 24 52 38 40 44C28 50 32 32 32 32Z" fill="#FF5C8A"/>
          <path d="M32 32C38 48 24 54 20 42C16 30 32 32 32 32Z" fill="#FF7096"/>
          <path d="M32 32C16 38 18 52 30 50C42 48 32 32 32 32Z" fill="#FF85A1"/>
          <path d="M32 32C32 16 46 14 44 26C42 38 32 32 32 32Z" fill="#FF9EBB"/>
          <circle cx="32" cy="32" r="5" fill="#FFD166"/>
          <path d="M32 32L46 18" stroke="#FFD166" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="46" cy="18" r="2" fill="#FFD166"/>
        </svg>
      );

    // 🐚 Starfish
    case '🐚':
    case '⭐':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6L38.5 23.5L57 24L42.5 35L47.5 53L32 42.5L16.5 53L21.5 35L7 24L25.5 23.5L32 6Z" fill="#F4A261" stroke="#E76F51" strokeWidth="3" strokeLinejoin="round"/>
          <circle cx="32" cy="28" r="2" fill="#FFFFFF" opacity="0.6"/>
          <circle cx="26" cy="34" r="1.5" fill="#FFFFFF" opacity="0.6"/>
          <circle cx="38" cy="34" r="1.5" fill="#FFFFFF" opacity="0.6"/>
        </svg>
      );

    // 🧸 Teddy Bear
    case '🧸':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="9" fill="#B07D62" stroke="#6C4A35" strokeWidth="3"/>
          <circle cx="18" cy="18" r="4" fill="#E8B49B"/>
          <circle cx="46" cy="18" r="9" fill="#B07D62" stroke="#6C4A35" strokeWidth="3"/>
          <circle cx="46" cy="18" r="4" fill="#E8B49B"/>
          <circle cx="32" cy="32" r="18" fill="#B07D62" stroke="#6C4A35" strokeWidth="3"/>
          <ellipse cx="32" cy="36" rx="8" ry="6" fill="#E8B49B"/>
          <circle cx="32" cy="34" r="3" fill="#6C4A35"/>
          <circle cx="25" cy="28" r="2.5" fill="#1A1817"/>
          <circle cx="39" cy="28" r="2.5" fill="#1A1817"/>
          <path d="M12 40L24 48V56L12 40Z" fill="#E63946"/>
        </svg>
      );

    // 🎀 Satin Bow Ribbon
    case '🎀':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 28C22 18 10 24 16 36C22 48 32 32 32 32Z" fill="#D90429"/>
          <path d="M32 28C42 18 54 24 48 36C42 48 32 32 32 32Z" fill="#EF233C"/>
          <path d="M28 34L14 54" stroke="#D90429" strokeWidth="6" strokeLinecap="round"/>
          <path d="M36 34L50 54" stroke="#EF233C" strokeWidth="6" strokeLinecap="round"/>
          <rect x="27" y="27" width="10" height="10" rx="3" fill="#FF85A1" stroke="#D90429" strokeWidth="2"/>
        </svg>
      );

    // 🍒 Cherries
    case '🍒':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 42C12 36 28 12 44 10" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round"/>
          <path d="M44 42C36 36 40 20 44 10" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="20" cy="44" r="11" fill="#D90429" stroke="#800020" strokeWidth="3"/>
          <circle cx="44" cy="44" r="11" fill="#EF233C" stroke="#800020" strokeWidth="3"/>
          <circle cx="16" cy="40" r="3" fill="#FFFFFF" opacity="0.7"/>
          <circle cx="40" cy="40" r="3" fill="#FFFFFF" opacity="0.7"/>
          <path d="M44 10C48 6 54 12 50 16" fill="#52B788"/>
        </svg>
      );

    // 🍰 Strawberry Cake Slice
    case '🍰':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 48L54 48L44 26L10 48Z" fill="#FDF0ED" stroke="#6C4A35" strokeWidth="3"/>
          <path d="M10 48L54 48L54 38L10 38Z" fill="#C9184A"/>
          <circle cx="26" cy="24" r="6" fill="#D90429"/>
          <path d="M10 28C14 24 20 28 26 24C32 20 38 26 44 26" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );

    // 💿 Vinyl Record
    case '💿':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" fill="#1A1817" stroke="#3D3A37" strokeWidth="2"/>
          <circle cx="32" cy="32" r="20" stroke="#333333" strokeWidth="1" strokeDasharray="3 3"/>
          <circle cx="32" cy="32" r="14" stroke="#333333" strokeWidth="1"/>
          <circle cx="32" cy="32" r="9" fill="#E63946"/>
          <circle cx="32" cy="32" r="3" fill="#FFFFFF"/>
        </svg>
      );

    // 💐 Tulip Bouquet
    case '💐':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 28C16 16 30 14 32 26C34 14 48 16 42 28C36 40 28 40 22 28Z" fill="#B07D62" stroke="#6C4A35" strokeWidth="2"/>
          <path d="M20 40L32 60L44 40Z" fill="#D2B48C" stroke="#6C4A35" strokeWidth="2"/>
          <path d="M24 32C24 44 40 44 40 32" stroke="#8C6239" strokeWidth="3"/>
        </svg>
      );

    // 🤎 Disco Heart
    case '🤎':
    case '💖':
    case '💋':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 54C32 54 8 36 8 22C8 13.5 15 8 22.5 8C27 8 30.5 10.5 32 13C33.5 10.5 37 8 41.5 8C49 8 56 13.5 56 22C56 36 32 54 32 54Z" fill="#8C6239" stroke="#362417" strokeWidth="3"/>
          <path d="M20 18L26 24M38 18L44 24M28 32L36 40" stroke="#F5EFE6" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      );

    // 🪩 3D Silver Disco Mirror Ball
    case '🪩':
      return (
        <svg width={size} height={size * 1.2} viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="32" y1="0" x2="32" y2="16" stroke="#C0C0C0" strokeWidth="2"/>
          <circle cx="32" cy="44" r="26" fill="url(#disco_grad)" stroke="#808080" strokeWidth="2"/>
          <path d="M10 44C10 32 54 32 54 44C54 56 10 56 10 44Z" stroke="#E0E0E0" strokeWidth="1.5" strokeDasharray="3 3"/>
          <path d="M16 44C16 24 48 24 48 44C48 64 16 64 16 44Z" stroke="#E0E0E0" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="32" y1="18" x2="32" y2="70" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6"/>
          <defs>
            <radialGradient id="disco_grad" cx="32" cy="36" r="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF"/>
              <stop offset="0.5" stopColor="#D3D3D3"/>
              <stop offset="1" stopColor="#707070"/>
            </radialGradient>
          </defs>
        </svg>
      );

    // 🎵 Music Player Lyric Widget Card
    case '🎵':
      return (
        <svg width={size * 1.8} height={size * 1.2} viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="110" height="70" rx="10" fill="#2C2219" opacity="0.85" stroke="#D2B48C" strokeWidth="2"/>
          <rect x="10" y="10" width="22" height="22" rx="4" fill="#8C6239"/>
          <circle cx="21" cy="21" r="6" fill="#F5EFE6"/>
          <text x="38" y="20" fill="#F5EFE6" fontSize="9" fontFamily="Outfit" fontWeight="bold">Lover</text>
          <text x="38" y="29" fill="#D2B48C" fontSize="7" fontFamily="Outfit">Taylor Swift ♡</text>
          <text x="10" y="44" fill="#FFF" fontSize="8" fontFamily="Caveat">Can we always be this close? ✨</text>
          <line x1="10" y1="56" x2="100" y2="56" stroke="#6C4A35" strokeWidth="2"/>
          <circle cx="40" cy="56" r="3" fill="#D2B48C"/>
        </svg>
      );

    // 📎 Gold Binder Paper Clip
    case '📎':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="12" width="24" height="14" rx="3" fill="#D4AF37" stroke="#8B6B1B" strokeWidth="2"/>
          <path d="M26 26L20 52H44L38 26" stroke="#D4AF37" strokeWidth="3" fill="none"/>
        </svg>
      );

    // 🐱 Twin Black & Cream Cats
    case '🐱':
      return (
        <svg width={size * 1.5} height={size} viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Black Cat */}
          <path d="M15 55C15 35 25 25 35 25C45 25 55 35 55 55H15Z" fill="#1A1817"/>
          <polygon points="20,28 15,12 30,22" fill="#1A1817"/>
          <polygon points="50,28 55,12 40,22" fill="#1A1817"/>
          <circle cx="28" cy="33" r="3" fill="#FFD166"/>
          <circle cx="42" cy="33" r="3" fill="#FFD166"/>
          {/* Cream Cat */}
          <path d="M40 55C40 38 50 28 62 28C74 28 84 38 84 55H40Z" fill="#F4E2D8"/>
          <polygon points="46,30 42,16 56,25" fill="#F4E2D8"/>
          <polygon points="78,30 82,16 68,25" fill="#F4E2D8"/>
          <circle cx="54" cy="36" r="3" fill="#4B6584"/>
          <circle cx="70" cy="36" r="3" fill="#4B6584"/>
        </svg>
      );

    // 🎓 Graduation Cap
    case '🎓':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 10L58 24L32 38L6 24L32 10Z" fill="#1E293B" stroke="#F59E0B" strokeWidth="3"/>
          <path d="M18 32V44C18 44 24 50 32 50C40 50 46 44 46 44V32" fill="#0F172A" stroke="#1E293B" strokeWidth="3"/>
          <path d="M50 28V46" stroke="#F59E0B" strokeWidth="3"/>
          <circle cx="50" cy="46" r="3" fill="#F59E0B"/>
        </svg>
      );

    // Default fallback
    default:
      return (
        <span style={{ fontSize: `${size * 0.75}px`, display: 'inline-block', lineHeight: 1 }}>
          {content}
        </span>
      );
  }
};
