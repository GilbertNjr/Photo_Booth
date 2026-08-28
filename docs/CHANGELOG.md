## [1.1.0] - 2026-08-28 (Enhanced Camera Viewport & Right Sidebar Card Layout)

### Added & Refactored
- **Main Live Camera Viewport (`CameraView.tsx`):** Added a dedicated, high-definition live webcam feed viewport positioned on the left/main area so users can see their face position clearly before and during photo capture.
- **Face Alignment Guide Overlay (`face-alignment-guide`):** Added an interactive, pulsing face contour guide ("Posisi Wajah Di Sini ✨") to assist users in centering their face.
- **Rule of Thirds Grid Lines (`grid-lines-overlay`):** Added optional 3x3 framing grid lines toggle for composition control.
- **Right Sidebar Frame Card Panel (`camera-sidebar-card`):** Moved the Template Frame Card to a clean, dedicated right sidebar panel ("samping kanan bar clean, enak dilihat").
- **Live Stream Card Slot Mirroring (`CameraFrameOverlay.tsx`):** Updated active frame slots inside the template card to stream live webcam video simultaneously in real time.
- **Camera Service Stream Access (`cameraService.ts`):** Added `getActiveStream()` method to enable multi-viewport video stream rendering.

## [1.0.0] - 2026-08-27 (Full Core Application: Canvas Engine, Customization Editor, Final Preview & Printing)

### Added
- **HTML5 Canvas Engine (`canvasEngine.ts`):** Complete 2D rendering pipeline with pixel-perfect photo filter matrix application, object-fit crop positioning, vector sticker rendering, custom text compositing, and high-DPI PNG export.
- **Photo Filters (`FilterPicker.tsx`):** Live filter switcher with 8 presets: Original 🌿, Bright ✨, Warm Sunset 🌅, Vintage 📷, Film Grain 🎞️, Soft Pastel 🌸, B&W Classic 🖤, and Retro Pop 🎨.
- **Customization Editor (`CustomizeView.tsx`):** Real-time editor with tabbed interface for Photo Filters, Background Color Palettes + Custom Hex Picker, Text Field Captions & Dates, and Interactive Sticker Picker (hearts, stars, flowers, ribbons, bears, bunnies, sparkles, cameras, smileys, cakes, crowns).
- **Final Preview (`FinalPreviewView.tsx`):** High-resolution export screen featuring instant PNG image download, layout print modal, and session reset capabilities.
- **Modular Printing Service (`printService.ts`):** High-DPI print support for 2x6 photo strips, 4x6 postcards, and A4 multi-cut pages using clean CSS `@media print` rules.
- **Touchscreen Kiosk Mode:** Integrated fullscreen kiosk toggle with optimized touch targets and reset flow.

### Added
- **Camera Stream Service (`cameraService.ts`):** WebRTC camera access manager with device selection, device enumeration, and stream teardown.
- **Audio & Shutter Effects (`captureService.ts`):** Web Audio API synthesized audio countdown ticks and mechanical camera shutter click sound.
- **Frame Guide Overlay (`CameraFrameOverlay.tsx`):** Composited live feed stream directly inside the photo slots of the selected template.
- **Interactive Camera UI (`CameraView.tsx`):**
  - Multi-photo burst sequence auto-capturing photos 1 to N based on `photoSlotsCount`.
  - Visual 3-2-1-📸 countdown overlay with pop animation.
  - Fullscreen white flash overlay on shutter trigger.
  - Countdown speed selector (3s, 5s, 10s).
  - Mirror toggle (horizontal selfie flip).
  - Sound mute/unmute toggle.
  - Photo grid preview with individual retake option.
  - "Proceed to Customize ✨" CTA when sequence completes.

### Added
- **Project Foundation:** Initialized Vite + React + TypeScript web application architecture.
- **Documentation:** Created `AGENTS.md`, `PRD.md`, `ARCHITECTURE.md`, `UI-UX.md`, `FRAME-SYSTEM.md`, `CANVAS-ENGINE.md`, `PRINTING.md`, `COMPONENTS.md`, `TESTING.md`, and `CHANGELOG.md`.
- **Design System:** Created CSS variables for Korean/Japanese aesthetic, scrapbook & polaroid tokens, pastel palettes, modern Google Fonts (`Outfit`, `Plus Jakarta Sans`, `Caveat`, `Playfair Display`, `Fredoka`), and soft shadows.
- **Data Model:** Defined `TemplateData`, `PhotoSlot`, `DecorativeElement`, `TextElement`, and style/category types in `src/types/template.ts`.
- **Template Collection:** Implemented 8 data-driven templates across 8 categories with unique styles:
  1. `cute-pink-01` (Sweet Strawberry Scrapbook - Scrapbook style, 4 slots)
  2. `vintage-camera-01` (Retro Leica 1988 - Vintage Camera style, 3 slots)
  3. `newspaper-01` (The Daily Romance Gazette - Newspaper style, 3 slots)
  4. `ticket-01` (VIP Concert Pass 2026 - Concert Ticket style, 2 slots)
  5. `film-strip-01` (Cinematic 35mm Strip - Film Strip style, 4 slots)
  6. `cute-bear-01` (Teddy & Friends Party - Cute Bear style, 3 slots)
  7. `polaroid-01` (Scrapbook Memory Polaroid - Stacked Polaroid style, 4 slots)
  8. `seasonal-summer-01` (Golden Hour Sunset - Minimal Modern style, 2 slots)
- **Services:** Created `templateService.ts`, `storageService.ts`, `canvasEngine.ts`, `cameraService.ts`, `captureService.ts`, and `printService.ts`.
- **Template Picker UI:** Built "Choose Your Frame" view featuring:
  - Hero header with cute micro-badge and subtitle.
  - Interactive search bar with instant filter & clear actions.
  - Responsive category filter pills with icon badges and frame counts.
  - Interactive frame grid with collectible card animations, favorite heart toggle, and slot count badges.
  - Template inspect modal with full detail specs and "Use This Frame" CTA.
