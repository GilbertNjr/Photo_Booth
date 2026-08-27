# UI/UX Design System — Photo Booth Web App

## 1. Aesthetic Direction
- **Style:** Modern Korean/Japanese Photo Booth × Pinterest Scrapbook × Premium Pastel Kiosk.
- **Mood:** Cute, playful, youthful, romantic, collectible, aesthetic.
- **Visual Cues:** Soft pill badges, tape accents, polaroid shadows, smooth spring animations, subtle glassmorphism, micro-scale hover effects.

## 2. Color Palette & Tokens
Defined in `src/assets/styles/variables.css`:

```css
:root {
  /* Brand Pastels */
  --color-primary: #ff85a2;
  --color-primary-soft: #ffe4e9;
  --color-secondary: #7b61ff;
  --color-secondary-soft: #ede9ff;
  --color-accent: #ffb800;
  --color-accent-soft: #fff6d6;
  
  /* Backgrounds */
  --bg-cream: #faf7f2;
  --bg-card: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.85);

  /* Neutrals */
  --text-main: #2b2627;
  --text-muted: #7d7577;
  --border-light: #efe8e1;

  /* Shadow & Glow */
  --shadow-soft: 0 10px 30px rgba(255, 133, 162, 0.12);
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 16px 36px rgba(255, 133, 162, 0.22);
}
```

## 3. Typography Hierarchy
Google Fonts imported:
- `Outfit`: Clean UI headings and body text.
- `Plus Jakarta Sans`: Subtitles and labels.
- `Caveat`: Handwritten scrapbook & polaroid captions.
- `Playfair Display`: Vintage newspaper & romantic frame text.
- `Fredoka`: Bubbly cute titles.

## 4. Key Interactive Components
- **Category Filter Pills:** Horizontal scrollable row with icon badges, active highlight animation, and counter.
- **Frame Card:** Collectible portrait card displaying live rendered frame preview, category tag, photo slot indicator, style tag, favorite heart button, and hover lift.
- **Single CTA Flow:** Clear primary button ("Use This Frame", "Take Photo", "Customize Frame", "Download & Print") on every view.
