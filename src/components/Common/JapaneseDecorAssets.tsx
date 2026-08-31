import React from 'react';

// Sakura Cherry Blossom Branch
export const SakuraBranchSVG: React.FC<{ style?: React.CSSProperties; width?: number; height?: number }> = ({
  style,
  width = 240,
  height = 180,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none', userSelect: 'none', ...style }}
  >
    {/* Branch stem */}
    <path
      d="M240 10 C180 30, 140 70, 70 85 C40 92, 15 110, 0 140"
      stroke="#8B4513"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M160 45 C120 40, 90 20, 60 15"
      stroke="#8B4513"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M100 80 C80 110, 50 125, 20 135"
      stroke="#8B4513"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Sakura Flowers & Buds */}
    <g transform="translate(140, 30)">
      <circle cx="0" cy="0" r="14" fill="#FFC0CB" opacity="0.8" />
      <path d="M0 -14 C-5 -7, -5 7, 0 14 C5 7, 5 -7, 0 -14Z" fill="#FF69B4" opacity="0.9" />
      <path d="-14 0 C-7 -5, 7 -5, 14 0 C7 5, -7 5, -14 0Z" fill="#FF69B4" opacity="0.9" />
      <circle cx="0" cy="0" r="4" fill="#D90429" />
    </g>

    <g transform="translate(90, 75)">
      <circle cx="0" cy="0" r="16" fill="#FFE4E1" />
      <path d="M0 -16 C-6 -8, -6 8, 0 16 C6 8, 6 -8, 0 -16Z" fill="#FFB6C1" />
      <path d="-16 0 C-8 -6, 8 -6, 16 0 C8 6, -8 6, -16 0Z" fill="#FFB6C1" />
      <circle cx="0" cy="0" r="4" fill="#C71585" />
    </g>

    <g transform="translate(50, 15)">
      <circle cx="0" cy="0" r="12" fill="#FFC0CB" opacity="0.85" />
      <circle cx="0" cy="0" r="3" fill="#D90429" />
    </g>

    <g transform="translate(30, 125)">
      <circle cx="0" cy="0" r="15" fill="#FFE4E1" />
      <path d="M0 -15 C-5 -7, -5 7, 0 15 C5 7, 5 -7, 0 -15Z" fill="#FF69B4" opacity="0.9" />
      <circle cx="0" cy="0" r="3.5" fill="#900C3F" />
    </g>

    {/* Floating Petals */}
    <path d="M170 80 Q175 90 180 85 Q175 75 170 80Z" fill="#FFB6C1" opacity="0.8" />
    <path d="M120 130 Q125 140 130 135 Q125 125 120 130Z" fill="#FFC0CB" opacity="0.85" />
    <path d="M40 50 Q45 60 50 55 Q45 45 40 50Z" fill="#FF69B4" opacity="0.75" />
  </svg>
);

// Japanese Folding Fan (Sensu)
export const SensuFanSVG: React.FC<{ style?: React.CSSProperties; width?: number; height?: number }> = ({
  style,
  width = 160,
  height = 120,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 160 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none', userSelect: 'none', ...style }}
  >
    <path
      d="M10 110 C20 40, 140 40, 150 110 L80 110 Z"
      fill="#FFF5F5"
      stroke="#D90429"
      strokeWidth="2"
    />
    <path d="M80 110 L15 65" stroke="#C71585" strokeWidth="1.5" />
    <path d="M80 110 L45 35" stroke="#C71585" strokeWidth="1.5" />
    <path d="M80 110 L80 25" stroke="#C71585" strokeWidth="1.5" />
    <path d="M80 110 L115 35" stroke="#C71585" strokeWidth="1.5" />
    <path d="M80 110 L145 65" stroke="#C71585" strokeWidth="1.5" />
    {/* Red Sun on Fan */}
    <circle cx="80" cy="70" r="18" fill="#D90429" opacity="0.85" />
    {/* Gold Ribbon Pivot */}
    <circle cx="80" cy="110" r="5" fill="#D4AF37" />
  </svg>
);

// Japanese Chochin Lantern
export const JapaneseLanternSVG: React.FC<{ style?: React.CSSProperties; width?: number; height?: number }> = ({
  style,
  width = 70,
  height = 110,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 70 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none', userSelect: 'none', ...style }}
  >
    {/* Hanging Cord */}
    <line x1="35" y1="0" x2="35" y2="15" stroke="#800020" strokeWidth="2.5" />
    {/* Top Cap */}
    <rect x="22" y="15" width="26" height="8" rx="2" fill="#333333" />
    {/* Main Lantern Body */}
    <ellipse cx="35" cy="55" rx="28" ry="32" fill="#D90429" />
    <ellipse cx="35" cy="55" rx="28" ry="32" stroke="#800020" strokeWidth="2" />
    {/* Horizontal Rib lines */}
    <line x1="12" y1="40" x2="58" y2="40" stroke="#FFE4E1" strokeWidth="1.5" opacity="0.7" />
    <line x1="7" y1="55" x2="63" y2="55" stroke="#FFE4E1" strokeWidth="1.5" opacity="0.7" />
    <line x1="12" y1="70" x2="58" y2="70" stroke="#FFE4E1" strokeWidth="1.5" opacity="0.7" />
    {/* Japanese Kanji "祭" (Festival) */}
    <text x="35" y="61" fontSize="18" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
      祭
    </text>
    {/* Bottom Cap */}
    <rect x="22" y="87" width="26" height="8" rx="2" fill="#333333" />
    {/* Tassel */}
    <path d="M35 95 L30 110 M35 95 L35 110 M35 95 L40 110" stroke="#D4AF37" strokeWidth="2" />
  </svg>
);

// Japanese Pagoda Temple Line Drawing
export const PagodaTempleSVG: React.FC<{ style?: React.CSSProperties; width?: number; height?: number; color?: string }> = ({
  style,
  width = 180,
  height = 140,
  color = '#800020',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 180 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none', userSelect: 'none', opacity: 0.18, ...style }}
  >
    {/* Spire */}
    <line x1="90" y1="5" x2="90" y2="25" stroke={color} strokeWidth="2" />
    <circle cx="90" cy="8" r="3" fill={color} />
    {/* Roof 3 */}
    <path d="M60 35 Q90 20 120 35 L112 42 L68 42 Z" fill={color} />
    {/* Floor 3 */}
    <rect x="74" y="42" width="32" height="14" fill="none" stroke={color} strokeWidth="1.5" />
    {/* Roof 2 */}
    <path d="M45 65 Q90 48 135 65 L125 74 L55 74 Z" fill={color} />
    {/* Floor 2 */}
    <rect x="64" y="74" width="52" height="18" fill="none" stroke={color} strokeWidth="1.5" />
    {/* Roof 1 */}
    <path d="M30 100 Q90 80 150 100 L140 112 L40 112 Z" fill={color} />
    {/* Base Floor */}
    <rect x="52" y="112" width="76" height="28" fill="none" stroke={color} strokeWidth="2" />
    <line x1="90" y1="112" x2="90" y2="140" stroke={color} strokeWidth="1.5" />
  </svg>
);

// Cute Japanese Maneki-Neko (Lucky Cat)
export const ManekiNekoCatSVG: React.FC<{ style?: React.CSSProperties; width?: number; height?: number }> = ({
  style,
  width = 90,
  height = 90,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ ...style }}
  >
    {/* Body */}
    <ellipse cx="50" cy="65" rx="32" ry="28" fill="#FFFFFF" stroke="#333333" strokeWidth="2" />
    {/* Head */}
    <circle cx="50" cy="38" r="26" fill="#FFFFFF" stroke="#333333" strokeWidth="2" />
    {/* Ears */}
    <polygon points="28,20 38,12 40,28" fill="#FFC0CB" stroke="#333333" strokeWidth="2" />
    <polygon points="72,20 62,12 60,28" fill="#FFC0CB" stroke="#333333" strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="38" cy="36" rx="3" ry="5" fill="#333333" />
    <ellipse cx="62" cy="36" rx="3" ry="5" fill="#333333" />
    {/* Whiskers */}
    <line x1="22" y1="36" x2="32" y2="38" stroke="#333333" strokeWidth="1.5" />
    <line x1="22" y1="42" x2="32" y2="42" stroke="#333333" strokeWidth="1.5" />
    <line x1="78" y1="36" x2="68" y2="38" stroke="#333333" strokeWidth="1.5" />
    <line x1="78" y1="42" x2="68" y2="42" stroke="#333333" strokeWidth="1.5" />
    {/* Red Collar & Bell */}
    <path d="M30 50 Q50 58 70 50" stroke="#D90429" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="56" r="5" fill="#D4AF37" stroke="#333333" strokeWidth="1" />
    {/* Koban Gold Coin */}
    <ellipse cx="50" cy="74" rx="10" ry="14" fill="#FFD700" stroke="#D4AF37" strokeWidth="2" />
    <text x="50" y="78" fontSize="9" fontWeight="bold" fill="#B8860B" textAnchor="middle">
      小判
    </text>
    {/* Waving Paw (Right Paw Raised) */}
    <path d="M70 48 Q82 30 76 22 Q68 24 66 38" fill="#FFFFFF" stroke="#333333" strokeWidth="2" />
    <ellipse cx="76" cy="22" rx="4" ry="4" fill="#FFC0CB" />
  </svg>
);
