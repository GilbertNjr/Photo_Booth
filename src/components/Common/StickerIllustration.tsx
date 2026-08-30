import React from 'react';

interface StickerIllustrationProps {
  content: string;
  size?: number;
  color?: string;
}

export const StickerIllustration: React.FC<StickerIllustrationProps> = React.memo(({
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

    // 🍓 Strawberry
    case '🍓':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 16C18 16 12 28 16 46C20 60 32 62 32 62C32 62 44 60 48 46C52 28 46 16 32 16Z" fill="#D90429" stroke="#800020" strokeWidth="3"/>
          <path d="M32 16C26 8 20 12 18 14M32 16C38 8 44 12 46 14M32 16V8" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="24" cy="28" r="1.5" fill="#FFB703"/>
          <circle cx="36" cy="26" r="1.5" fill="#FFB703"/>
          <circle cx="28" cy="38" r="1.5" fill="#FFB703"/>
          <circle cx="40" cy="36" r="1.5" fill="#FFB703"/>
          <circle cx="22" cy="48" r="1.5" fill="#FFB703"/>
          <circle cx="34" cy="48" r="1.5" fill="#FFB703"/>
        </svg>
      );

    // 🦋 Butterfly
    case '🦋':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 30C22 14 6 22 14 36C22 48 32 34 32 34Z" fill="#C9184A" stroke="#500A14" strokeWidth="2"/>
          <path d="M32 30C42 14 58 22 50 36C42 48 32 34 32 34Z" fill="#D90429" stroke="#500A14" strokeWidth="2"/>
          <path d="M32 34C24 38 12 50 20 56C28 60 32 40 32 40Z" fill="#800020" stroke="#500A14" strokeWidth="2"/>
          <path d="M32 34C40 38 52 50 44 56C36 60 32 40 32 40Z" fill="#900C3F" stroke="#500A14" strokeWidth="2"/>
          <line x1="32" y1="20" x2="32" y2="44" stroke="#1A1817" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );

    // 🌷 Tulips
    case '🌷':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 60V32" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round"/>
          <path d="M32 32C22 26 18 10 32 16C46 10 42 26 32 32Z" fill="#C9184A" stroke="#800020" strokeWidth="3"/>
          <path d="M26 30C22 20 28 12 32 16C36 12 42 20 38 30" fill="#D90429"/>
        </svg>
      );

    // 🍷 Wine / Cocktail Glass
    case '🍷':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L32 36L52 12H12Z" fill="#800020" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round"/>
          <line x1="32" y1="36" x2="32" y2="56" stroke="#FFFFFF" strokeWidth="4"/>
          <line x1="20" y1="56" x2="44" y2="56" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );

    // 🎟️ Ticket To Anywhere
    case '🎟️':
      return (
        <svg width={size * 1.5} height={size * 0.9} viewBox="0 0 90 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="90" height="54" rx="8" fill="#E8DFD1" stroke="#8C684D" strokeWidth="3"/>
          <circle cx="0" cy="27" r="8" fill="#7A1C28"/>
          <circle cx="90" cy="27" r="8" fill="#7A1C28"/>
          <line x1="24" y1="8" x2="24" y2="46" stroke="#8C684D" strokeWidth="2" strokeDasharray="3 3"/>
          <text x="32" y="24" fill="#4A3324" fontSize="9" fontFamily="Outfit" fontWeight="bold">TICKET TO</text>
          <text x="32" y="36" fill="#7A1C28" fontSize="10" fontFamily="Playfair Display" fontWeight="bold">Anywhere ✨</text>
        </svg>
      );

    // 📼 Retro Cassette Tape
    case '📼':
      return (
        <svg width={size * 1.4} height={size} viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="50" rx="6" fill="#27272A" stroke="#52525B" strokeWidth="3"/>
          <rect x="12" y="10" width="56" height="20" rx="3" fill="#E4E4E7"/>
          <circle cx="28" cy="20" r="6" fill="#18181B" stroke="#A1A1AA" strokeWidth="2"/>
          <circle cx="52" cy="20" r="6" fill="#18181B" stroke="#A1A1AA" strokeWidth="2"/>
          <path d="M20 38H60L54 44H26L20 38Z" fill="#3F3F46"/>
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

    // 🎟️ Vintage Pink Photo Ticket & Day Pass (From Pinterest Image 1)
    case '🎟️-pink-ticket':
    case 'photo-ticket':
    case 'photo-ticket-pink':
      return (
        <svg width={size * 2.8} height={size * 1.1} viewBox="0 0 240 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="ticketShadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
            </filter>
          </defs>
          <g filter="url(#ticketShadow)">
            {/* Main Pink Ticket Body */}
            <rect x="4" y="4" width="232" height="88" rx="4" fill="#F7C8D4" stroke="#B8657B" strokeWidth="2"/>
            <rect x="8" y="8" width="224" height="80" rx="2" fill="#FCE9EF" stroke="#DF93A7" strokeWidth="1" strokeDasharray="3 3"/>
            
            {/* Perforated Vertical Stub Line */}
            <line x1="172" y1="8" x2="172" y2="88" stroke="#B8657B" strokeWidth="1.5" strokeDasharray="3 3"/>

            {/* Left & Right Notch Cutouts */}
            <circle cx="4" cy="48" r="7" fill="#EAE4D9" stroke="#B8657B" strokeWidth="1.5"/>
            <circle cx="236" cy="48" r="7" fill="#EAE4D9" stroke="#B8657B" strokeWidth="1.5"/>
            <circle cx="172" cy="4" r="5" fill="#EAE4D9" stroke="#B8657B" strokeWidth="1.5"/>
            <circle cx="172" cy="92" r="5" fill="#EAE4D9" stroke="#B8657B" strokeWidth="1.5"/>

            {/* Header: PHOTO TICKET */}
            <text x="20" y="32" fill="#3D2329" fontSize="16" fontFamily="'Playfair Display', serif" fontWeight="900" letterSpacing="0.08em">PHOTO</text>
            <text x="20" y="48" fill="#3D2329" fontSize="16" fontFamily="'Playfair Display', serif" fontWeight="900" letterSpacing="0.08em">TICKET</text>
            
            {/* Minimal Sub Text */}
            <text x="20" y="20" fill="#8C5362" fontSize="5.5" fontFamily="'Courier New', monospace" letterSpacing="0.05em">TEL: 021-9344</text>
            
            {/* Grid Table for Day/Month/Year */}
            <rect x="20" y="55" width="140" height="22" fill="#FFFFFF" stroke="#B8657B" strokeWidth="1" opacity="0.9"/>
            <line x1="52" y1="55" x2="52" y2="77" stroke="#B8657B" strokeWidth="1"/>
            <line x1="90" y1="55" x2="90" y2="77" stroke="#B8657B" strokeWidth="1"/>
            <line x1="122" y1="55" x2="122" y2="77" stroke="#B8657B" strokeWidth="1"/>
            
            <text x="25" y="64" fill="#6B3846" fontSize="6" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">Day</text>
            <text x="56" y="64" fill="#6B3846" fontSize="6" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">Month</text>
            <text x="94" y="64" fill="#6B3846" fontSize="6" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">Year</text>
            <text x="124" y="64" fill="#6B3846" fontSize="5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">Expiration</text>

            <text x="20" y="85" fill="#8C5362" fontSize="6" fontFamily="'Courier New', monospace" fontWeight="bold">No. 009324</text>

            {/* Right Stub: DAY PASS */}
            <text x="180" y="20" fill="#8C5362" fontSize="5" fontFamily="'Courier New', monospace">TEL: 021-9344</text>
            <text x="202" y="40" fill="#3D2329" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">DAY</text>
            <text x="202" y="54" fill="#3D2329" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="900" textAnchor="middle" letterSpacing="0.06em">PASS</text>
            <line x1="182" y1="62" x2="222" y2="62" stroke="#B8657B" strokeWidth="0.8"/>
            <text x="182" y="70" fill="#6B3846" fontSize="5.5" fontFamily="'Plus Jakarta Sans', sans-serif">For_Month_Year</text>
            <text x="182" y="84" fill="#8C5362" fontSize="5" fontFamily="'Courier New', monospace">No. 009324</text>
          </g>
        </svg>
      );

    // ♥ Deep Maroon Watercolor Heart
    case '♥-maroon':
    case 'heart-maroon':
    case 'heart-watercolor':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 54C32 54 8 36 8 21C8 12.5 15.5 7 23 7C27.8 7 30.8 9.5 32 12C33.2 9.5 36.2 7 41 7C48.5 7 56 12.5 56 21C56 36 32 54 32 54Z" fill="#8C2635" opacity="0.88"/>
          <path d="M26 16C21 11 14 14 14 21C14 29 25 38 28 41" stroke="#A93244" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
          <circle cx="20" cy="18" r="2" fill="#FFFFFF" opacity="0.4"/>
        </svg>
      );

    // 🎀 Vintage Scalloped Tag "the curious!" (From Pinterest Image 2)
    case 'tag-curious':
    case 'the-curious':
      return (
        <svg width={size * 1.8} height={size * 1.3} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 22C52 12 40 16 45 26C50 34 60 22 60 22Z" fill="none" stroke="#2C2219" strokeWidth="2.5"/>
          <path d="M60 22C68 12 80 16 75 26C70 34 60 22 60 22Z" fill="none" stroke="#2C2219" strokeWidth="2.5"/>
          <circle cx="60" cy="22" r="3" fill="#2C2219"/>
          <path d="M57 24L48 38" stroke="#2C2219" strokeWidth="2" strokeLinecap="round"/>
          <path d="M63 24L72 38" stroke="#2C2219" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="60" cy="56" rx="46" ry="24" fill="#FAF5ED" stroke="#B8A388" strokeWidth="2"/>
          <ellipse cx="60" cy="56" rx="42" ry="20" fill="#FFFDF9" stroke="#D8C8B0" strokeWidth="1" strokeDasharray="3 2"/>
          <text x="60" y="55" fill="#8C2D38" fontSize="12" fontFamily="'Caveat', cursive" fontWeight="bold" fontStyle="italic" textAnchor="middle">the</text>
          <text x="60" y="67" fill="#8C2D38" fontSize="15" fontFamily="'Caveat', cursive" fontWeight="bold" fontStyle="italic" textAnchor="middle">curious!</text>
        </svg>
      );

    // 🎬 Vintage Movie Reel & Film Strip (From Pinterest Image 2)
    case 'movie-film-reel':
    case 'film-clapper':
      return (
        <svg width={size * 1.8} height={size * 1.3} viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="42" width="75" height="28" rx="3" fill="#FAF5ED" stroke="#4A3324" strokeWidth="2" transform="rotate(-6 25 42)"/>
          <line x1="28" y1="48" x2="98" y2="40" stroke="#4A3324" strokeWidth="1" strokeDasharray="4 3"/>
          <line x1="28" y1="64" x2="98" y2="56" stroke="#4A3324" strokeWidth="1" strokeDasharray="4 3"/>
          <circle cx="34" cy="40" r="22" fill="#5C3E2D" stroke="#2C1D14" strokeWidth="2.5"/>
          <circle cx="34" cy="40" r="16" fill="#FAF5ED" stroke="#4A3324" strokeWidth="1.5"/>
          <circle cx="34" cy="40" r="6" fill="#2C1D14"/>
          <circle cx="34" cy="29" r="3.5" fill="#5C3E2D"/>
          <circle cx="34" cy="51" r="3.5" fill="#5C3E2D"/>
          <circle cx="23" cy="40" r="3.5" fill="#5C3E2D"/>
          <circle cx="45" cy="40" r="3.5" fill="#5C3E2D"/>
        </svg>
      );

    // ⭐ 3D Metallic Glossy Star (From Pinterest Image 2)
    case '3d-star-gold':
    case 'star-3d':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="starG1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="50%" stopColor="#E6D3B8"/>
              <stop offset="100%" stopColor="#B8976C"/>
            </linearGradient>
          </defs>
          <path d="M32 4L37 27L60 32L37 37L32 60L27 37L4 32L27 27Z" fill="url(#starG1)" stroke="#8C684D" strokeWidth="1.5"/>
          <path d="M32 4L32 60" stroke="#FFFFFF" strokeWidth="1" opacity="0.6"/>
          <path d="M4 32L60 32" stroke="#FFFFFF" strokeWidth="1" opacity="0.6"/>
        </svg>
      );

    // ❗ Pink Capsule Exclamation Mark Badge (From Pinterest Image 2)
    case 'exclamation-pink':
    case 'badge-exclamation':
      return (
        <svg width={size * 0.6} height={size * 1.2} viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="28" height="60" rx="14" fill="#E63956" stroke="#FFFFFF" strokeWidth="2.5"/>
          <rect x="13" y="12" width="6" height="24" rx="3" fill="#FFFFFF"/>
          <circle cx="16" cy="46" r="3.5" fill="#FFFFFF"/>
        </svg>
      );

    // 🎟️ Caramel Click Cinema Barcode & Stub (From Pinterest Image 2)
    case 'cinema-barcode':
      return (
        <svg width={size * 1.5} height={size * 0.9} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50" y="14" fill="#3E271E" fontSize="7" fontFamily="'Outfit', sans-serif" fontWeight="bold" textAnchor="middle">Caramel Click</text>
          <text x="50" y="22" fill="#8C684D" fontSize="5" fontFamily="'Outfit', sans-serif" textAnchor="middle">CINEMA PASS</text>
          <rect x="10" y="28" width="4" height="22" fill="#2C1D14"/>
          <rect x="17" y="28" width="2" height="22" fill="#2C1D14"/>
          <rect x="22" y="28" width="5" height="22" fill="#2C1D14"/>
          <rect x="30" y="28" width="2" height="22" fill="#2C1D14"/>
          <rect x="35" y="28" width="6" height="22" fill="#2C1D14"/>
          <rect x="44" y="28" width="2" height="22" fill="#2C1D14"/>
          <rect x="49" y="28" width="4" height="22" fill="#2C1D14"/>
          <rect x="56" y="28" width="3" height="22" fill="#2C1D14"/>
          <rect x="62" y="28" width="6" height="22" fill="#2C1D14"/>
          <rect x="71" y="28" width="2" height="22" fill="#2C1D14"/>
          <rect x="76" y="28" width="4" height="22" fill="#2C1D14"/>
          <rect x="83" y="28" width="3" height="22" fill="#2C1D14"/>
          <rect x="89" y="28" width="2" height="22" fill="#2C1D14"/>
          <text x="50" y="56" fill="#8C684D" fontSize="4.5" fontFamily="monospace" textAnchor="middle">№ 7492019-A</text>
        </svg>
      );

    // ☀️ Sun Tarot Card (From Pinterest Image 4)
    case 'sun-tarot':
    case 'tarot-sun':
      return (
        <svg width={size * 1.1} height={size * 1.7} viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="66" height="106" rx="6" fill="#FCE4EC" stroke="#C97A8E" strokeWidth="2"/>
          <rect x="5" y="5" width="60" height="100" rx="3" fill="#FFF5F7" stroke="#E598AC" strokeWidth="1"/>
          <circle cx="35" cy="40" r="14" fill="#FFB703" stroke="#FB8500" strokeWidth="1.5"/>
          <circle cx="31" cy="38" r="1.5" fill="#2C1D14"/>
          <circle cx="39" cy="38" r="1.5" fill="#2C1D14"/>
          <path d="M31 43C33 45 37 45 39 43" stroke="#2C1D14" strokeWidth="1" strokeLinecap="round"/>
          <path d="M35 20L35 23M35 57L35 60M17 40L20 40M50 40L53 40M22 27L25 30M45 50L48 53M22 53L25 50M45 30L48 27" stroke="#FFB703" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="26" cy="63" rx="12" ry="6" fill="#F8BBD0"/>
          <ellipse cx="44" cy="63" rx="12" ry="6" fill="#F48FB1"/>
          <ellipse cx="35" cy="66" rx="16" ry="7" fill="#F06292"/>
          <text x="35" y="93" fill="#880E4F" fontSize="7.5" fontFamily="'Playfair Display', serif" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle">THE SUN</text>
        </svg>
      );

    // 🌸 Die-cut Pink Lily Sticker (From Pinterest Image 4)
    case 'pink-lily':
    case 'flower-lily':
      return (
        <svg width={size * 1.5} height={size * 1.5} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 6C50 18 70 26 74 40C70 54 50 62 40 74C30 62 10 54 6 40C10 26 30 18 40 6Z" fill="#FFFFFF" stroke="#F8BBD0" strokeWidth="3.5"/>
          <path d="M40 12C46 23 60 30 66 40C60 50 46 57 40 68C34 57 20 50 14 40C20 30 34 23 40 12Z" fill="#F48FB1"/>
          <path d="M22 22C34 32 40 45 40 66C40 45 46 32 58 22C46 30 34 30 22 22Z" fill="#EC407A" opacity="0.65"/>
          <circle cx="40" cy="40" r="4" fill="#FFF59D"/>
          <circle cx="40" cy="32" r="2" fill="#AD1457"/>
          <circle cx="48" cy="36" r="2" fill="#AD1457"/>
          <circle cx="46" cy="46" r="2" fill="#AD1457"/>
          <circle cx="34" cy="46" r="2" fill="#AD1457"/>
          <circle cx="32" cy="36" r="2" fill="#AD1457"/>
        </svg>
      );

    // 👼 Marble Cherub Angel Statue (From Pinterest Image 4)
    case 'cherub-angel':
    case 'angel-statue':
      return (
        <svg width={size * 1.5} height={size * 1.3} viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 35C5 20 20 10 32 22C24 28 18 32 15 35Z" fill="#EDE7F6" stroke="#D1C4E9" strokeWidth="1.5"/>
          <path d="M75 35C85 20 70 10 58 22C66 28 72 32 75 35Z" fill="#EDE7F6" stroke="#D1C4E9" strokeWidth="1.5"/>
          <circle cx="45" cy="30" r="16" fill="#F5F5F5" stroke="#D7CCC8" strokeWidth="1.5"/>
          <circle cx="45" cy="20" r="13" fill="#FFFFFF" stroke="#BCAAA4" strokeWidth="1.5"/>
          <circle cx="38" cy="12" r="5" fill="#EFEBE9"/>
          <circle cx="45" cy="10" r="5" fill="#EFEBE9"/>
          <circle cx="52" cy="12" r="5" fill="#EFEBE9"/>
          <ellipse cx="40" cy="20" rx="1.5" ry="1" fill="#8D6E63"/>
          <ellipse cx="50" cy="20" rx="1.5" ry="1" fill="#8D6E63"/>
          <path d="M43 25C44 26 46 26 47 25" stroke="#8D6E63" strokeWidth="1" strokeLinecap="round"/>
          <ellipse cx="45" cy="46" rx="18" ry="10" fill="#FFFFFF" stroke="#D7CCC8" strokeWidth="1.5"/>
        </svg>
      );

    // 🦋 3D Pink Aesthetic Butterfly (From Pinterest Image 4)
    case 'butterfly-pink':
    case 'butterfly-3d':
      return (
        <svg width={size * 1.5} height={size * 1.3} viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bfG2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8BBD0"/>
              <stop offset="60%" stopColor="#EC407A"/>
              <stop offset="100%" stopColor="#AD1457"/>
            </linearGradient>
          </defs>
          <path d="M45 42C30 18 5 28 15 50C25 65 42 48 45 42Z" fill="url(#bfG2)" stroke="#880E4F" strokeWidth="1.5"/>
          <path d="M45 42C60 18 85 28 75 50C65 65 48 48 45 42Z" fill="url(#bfG2)" stroke="#880E4F" strokeWidth="1.5"/>
          <path d="M45 46C34 50 20 65 32 72C42 75 45 52 45 46Z" fill="#C2185B" stroke="#880E4F" strokeWidth="1.5"/>
          <path d="M45 46C56 50 70 65 58 72C48 75 45 52 45 46Z" fill="#C2185B" stroke="#880E4F" strokeWidth="1.5"/>
          <line x1="45" y1="28" x2="45" y2="60" stroke="#2C1D14" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      );

    // ✨ Hand-drawn White Outline Doodle & Sparkles (From Pinterest Image 3)
    case 'doodle-sparkle-white':
    case 'sparkle-doodle':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6C32 20 44 32 58 32C44 32 32 44 32 58C32 44 20 32 6 32C20 32 32 20 32 6Z" fill="#FFFFFF" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
          <circle cx="48" cy="16" r="3" fill="#FFFFFF"/>
          <circle cx="16" cy="48" r="2.5" fill="#FFFFFF"/>
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
});
