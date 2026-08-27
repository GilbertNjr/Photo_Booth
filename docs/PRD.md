# Product Requirements Document (PRD) — Photo Booth Web App

## 1. Overview
The **Photo Booth Web App** is an interactive, highly customizable web application designed to bring the magic and nostalgia of physical photo booths to any device (mobile, tablet, desktop, and touchscreen kiosk).

## 2. Target Audience
- Gen-Z and Millennials looking for aesthetic, Pinterest-worthy photo strips.
- Event organizers (weddings, birthday parties, graduation ceremonies).
- Kiosk operators who need a turn-key digital photo booth application.

## 3. Key User Flow
```
[HOME] 
  └──> [CHOOSE FRAME] 
         └──> [CAMERA PREVIEW & COUNTDOWN] 
                └──> [AUTOMATIC PHOTO CAPTURE] 
                       └──> [CUSTOMIZATION EDITOR] 
                              └──> [FINAL PREVIEW & EXPORT/PRINT]
```

## 4. Key Features & Requirements
### 4.1 Frame & Template Selection
- Data-driven frame card gallery categorized into: Cute, Minimal, Vintage, Romantic, Friendship, Birthday, Graduation, Seasonal.
- Favorite/bookmarking capability.
- Instant search and category filtering.
- Visual frame attributes: photo slot counts (1, 2, 3, 4, 6), styles (scrapbook, film strip, ticket, polaroid, newspaper, cute bear, etc.), and color palettes.

### 4.2 Camera & Capture Engine
- Multi-photo burst flow matching selected template's slot count.
- Visual & audio countdown timer (3-2-1-📸).
- Screen flash overlay on capture.
- Live camera stream feed directly composited with frame preview.

### 4.3 Customization Engine
- Frame color/background texture switcher.
- Custom text overlays (e.g. date, event title, cute captions).
- Interactive sticker placement (drag, resize, rotate, delete).
- Real-time photo filter pipeline (Original, Bright, Warm, Vintage, Film, B&W, Retro, Soft).

### 4.4 Canvas Rendering Engine
- Pixel-perfect HTML5 Canvas composition at printable resolutions (e.g. 1200x1800 or higher).
- PNG/JPEG export.

### 4.5 Modular Printing Support
- Presets for 2x6 photo strip, 4x6 postcard, and A4 multi-cut layouts.
- Dynamic CSS print styles with high-DPI scaling.

### 4.6 Touchscreen Kiosk Mode
- Fullscreen UI with simplified touch targets.
- Idle screen timeout & automatic session resetting for privacy and event usability.

## 5. Non-Functional Requirements
- **Performance:** 60fps animations for frame browsing and interactive preview.
- **Responsiveness:** Fluid grid layouts adapting seamlessly from 360px mobile viewports to 4K kiosk screens.
- **Usability:** Single clear primary call-to-action (CTA) on every view.
