## [1.5.0] - 2026-09-17 (Standby Mirror Mode, Slot-by-Slot Retake, Real-Time Feedback Key, Studio Backdrops, Tactile Textures & Vivid GIF)

### Added & Enhanced
- **Standby Mirror & Posing Flow (`CameraView.tsx`):**
  - Instant smooth auto-scroll to the top of viewport upon entering the camera screen.
  - Interactive Standby "Bercermin & Rapikan Penampilan" mirror mode with a prominent "Saya Sudah Siap! Mulai Ambil Foto 📸" action button.
  - Animated 3-second pose transition overlay (`💃 Ganti Gaya Berikutnya! ✨`) with circular pulsing countdown between each photo slot.
- **Interactive Slot-by-Slot Photo Retake (`CameraView.tsx`):**
  - Real-time thumbnail gallery beneath the camera viewfinder showing each captured slot with status checkmarks.
  - Dedicated individual retake buttons (`Ulang #1`, `Ulang #2`, `Ulang #3`, `Ulang #4`) allowing retake of ANY specific slot without discarding or resetting the other photos.
- **Studio Backdrops & Custom Background Image Upload (`CustomizeView.tsx`, `canvasEngine.ts`):**
  - Tab "BACKDROP" with 6 curated studio backdrop presets (*Sakura Blush*, *Sunset Glow*, *Midnight Blue*, *Beige Cozy*, *Lavender Dream*, and *Polos Studio*).
  - High-resolution custom background image upload support (`+ Upload Background Foto Sendiri (JPG/PNG)`) with automatic cover fitting (`object-fit: cover`).
  - 1-click "✕ Reset Backdrop" button.
- **Tactile High-Impact Paper Textures (`canvasEngine.ts`, `CustomizeView.tsx`):**
  - Upgraded texture procedural shaders with visible depth and high tactile presence:
    - `matte`: Velvety fine-art stipple tooth paper grain.
    - `linen`: Dual-tone cross-hatch woven textile fibers with micro flecks.
    - `vintage-paper`: Antique parchment wash, tea-stain speckles, and aged edge vignettes.
    - `cable-knit`: Warm braided knit wool stitches.
    - `water-ripples`: Marine caustic wave ripples with shimmering surface highlights.
    - `holographic`: Prismatic metallic rainbow gradient with high-gloss diagonal flare beam.
    - `polaroid-gloss`: High-shine resin-coated polaroid sheen with specular reflection.
    - `film-grain`: 35mm silver-halide analog film grain.
    - `gingham` & `gingham-red`: Crisp picnic checks with thread transparency.
    - `dots` & `grid`: Clean aesthetic geometric grid and polka dot patterns.
- **Vivid Boomerang GIF Quality & Filter Matching (`gifRecorderService.ts`, `FinalPreviewView.tsx`):**
  - Replaced lossy fallback quantization with Euclidean color distance matching, completely eliminating muddy dark blotches and preserving authentic skin tones.
  - Applied 10% brightness and 15% saturation enhancement during frame rendering.
  - Synchronized active photo filter CSS with both the live motion boomerang player and downloaded GIF Blob.
- **Sharp AR Face Filter Rendering (`arFilterService.ts`):**
  - Doubled cheek blush radial gradient opacity with delicate white specular highlight dots.
  - Rendered bold, vibrant cat/bunny ears, sunglasses, and golden angel halos.
- **Real-Time Verified Support Email Relay (`feedbackService.ts`, `FeedbackModal.tsx`):**
  - Integrated user's verified Web3Forms API Access Key (`6d1afd97-5cbe-4d01-9786-69190d875373`) directly delivering user feedback and bug reports to **`pixbooth.support@gmail.com`**.
  - Fixed dark text (`#111827`) on crisp white input/textarea fields with elegant `#800020` burgundy focus rings.
- **Centralized Version Bump (`appConfig.ts`):**
  - Version updated to `v1.5.0` synchronized across all views and metadata.

## [1.4.0] - 2026-09-16 (Freeform Sticker Transformer, Nakatama Scrapbook Frames, Catalog Pruning & Privacy Architecture)

### Added & Enhanced
- **Freeform Interactive Sticker Transformer (`CustomizeView.tsx`):**
  - Continuous 360° rotation stem handle (🔄) with pointer capture and angle calculation via `Math.atan2`.
  - Continuous zoom-in / zoom-out corner scale handle (↘️) with dynamic distance scaling (`Math.hypot`).
  - Quick-action floating handles for direct sticker deletion (✕) and one-tap duplication (📄).
  - Multi-touch mobile pinch-to-zoom and two-finger rotation gesture tracking.
  - Floating status chip indicating current rotation angle and scale percentage (`📐 15° • 🔍 120%`).
- **Aesthetic Nakatama & Photobox Scrapbook Themes (`nakatamaScrapbook.ts`, `canvasEngine.ts`):**
  - **Marine Ocean Aesthetic (`nakatama-marine`):** The Great Wave off Kanagawa artwork, procedural ocean water ripples & caustics, wave-crest photo slot borders, sailor ribbon, seashells, blue & white starfish, Area Photobox seal, and retro ransom letter blocks ("HELLO").
  - **Autumn Cozy Knit & Dump Scrapbook (`nakatama-cozy-knit`):** Braided cable-knit sweater texture shader, scalloped postage stamp photo frames with white perforation dots, 3D plush teddy bear popping out with bucket hat, red knitted winter scarf with "I remember it all too well" embroidery, London red phone booth, and typewriter love label.
- **Card Pruning & Catalog Curation (`templates/index.ts`, `FramePickerView.tsx`, `FrameCard.tsx`):**
  - Pruned plain, repetitive card templates to highlight top aesthetic and scrapbook designs.
  - Added golden `⭐ BEST SELLER` badge and vibrant `✨ NEW` badge on card thumbnails.
  - Added star ratings (`★ 4.9`) and usage metrics (`3.2k dipakai`) on all frames.
  - Added one-click quick collection filter pills ("Semua", "⭐ Best Seller", "✨ Baru (New)").
- **Centralized Dynamic App Versioning (`appConfig.ts`):**
  - Single source of truth for app version (`v1.4.0`), build date, author copyright, and release codename.
  - Synchronized dynamically in `AboutView.tsx`, `Footer.tsx`, and `Navbar.tsx`.
- **Real-Time Interactive Feedback & Support System (`feedbackService.ts`, `FeedbackModal.tsx`):**
  - Direct email relay to official developer email **`pixbooth.support@gmail.com`**.
  - Interactive aesthetic feedback modal with 5 category pills (`💡 Ide Bingkai`, `✨ Fitur Baru`, `🐞 Lapor Bug`, `💌 Pujian/Kesan`, `💬 Lainnya`).
  - Interactive 5-star rating selector with live sentiment labels.
  - Client-side rate-limit protection (45s anti-spam cooldown).
  - Telemetry collection without private facial data (device type, viewport size, timestamp).
  - Graceful fallback with one-click "Salin Email" and prefilled `mailto:` client opener.
  - Interactive bottom card in `AboutView.tsx` and quick access pills in `Navbar.tsx` and `Footer.tsx`.
- **Zero-Database Privacy Architecture & Copyright Security (`PrivacyModal.tsx`, `Navbar.tsx`, `Footer.tsx`):**
  - Dedicated interactive Privacy Modal explaining 100% on-device WebRTC & Canvas processing (zero photo storage on external servers/databases).
  - Automatic memory purge upon session completion or browser refresh.
  - Official developer copyright notice: `© 2026 GilbertNjr. PixBooth Studio. All Rights Reserved.`.
- **Live Session Counter Service (`sessionMetricsService.ts`):**
  - Persistent, reactive session counter tracking photo downloads and prints with portfolio baseline (1,428+ prints).
  - Live metric widgets in Navbar, Hero section, and Footer.

## [1.3.0] - 2026-09-16 (TikTok AR Face Filters, Boomerang Motion GIF & Kiosk Mode)

### Added & Enhanced
- **TikTok-Style AR Face Filter Engine (`arFilterService.ts`, `ARFilterBar.tsx`):**
  - Real-time 60 FPS face detection & procedural AR rendering engine (zero heavy WASM / external AI dependency).
  - 6 interactive AR filter presets:
    - `beauty`: Korean glass-skin smoothing & rosy cheek blush
    - `bunny`: Interactive cute bunny ears with pink inner fluff + whisker dots
    - `cat`: Kitty cat ears with inner blush and nose tip
    - `y2k`: Cyberpunk neon-tinted sunglasses with mirror shine streaks
    - `angel`: Radiant golden angel halo with cherub wings
    - `sparkles`: Dynamic twinkling golden sparkles & cosmetic glitters
    - `hearts`: Floating pastel pink love hearts with subtle pulse
  - WYSIWYG Composite Capture: AR props and beauty effects are burned directly into captured photos at full resolution.
- **Pure TypeScript Boomerang GIF Engine (`gifRecorderService.ts`):**
  - Self-contained LZW Animated GIF generator producing true `.gif` binary Blobs without external libraries.
  - Multi-frame countdown burst recording (3–5s motion sequence) synchronized with shutter.
  - Dual Output Switcher in `FinalPreviewView`: Instant toggle between Static 300 DPI Print Strip (PNG) and Live Motion Boomerang (GIF).
  - Download Animated GIF button with client-side compression and playback preview.
- **Smartphone Cloud Sync Simulator (`FinalPreviewView.tsx`):**
  - QR Code generator with mobile receiver simulator modal for instant smartphone testing.
- **Event Kiosk Mode & Auto-Reset Purge (`App.tsx`, `Navbar.tsx`):**
  - 1-click Fullscreen Kiosk mode toggle in navigation bar with active status indicators.
  - 60-second idle auto-purge on final screen with countdown notification banner to ensure user photo privacy at live booth events.

## [1.2.0] - 2026-09-15 (Dynamic Grid Aspect Ratios, Paper Textures & Physical Photobooth Accents)

### Added & Enhanced
- **Dynamic Grid & Aspect Ratio System (`LayoutBlueprintService.ts`, `GridAspectSelector.tsx`):**
  - Instant selection of aspect ratios: Strip 2x6 (Life Four Cuts), Postcard 4x6, Square 1:1 (Instagram Polaroid), Portrait 3:4, and Story 9:16 (TikTok/Reels).
  - Slot count selector (1, 2, 3, 4, 6 photos) and dynamic template adaptation engine.
  - On-the-fly "GRID" layout switcher tab inside `CustomizeView.tsx`.
- **Procedural Canvas Paper Textures (`canvasEngine.ts`):**
  - Added realistic shaders: Matte Paper, Polaroid Gloss, Linen Fabric, and Holographic Foil.
- **Physical Photobooth Accents (`canvasEngine.ts`):**
  - Semi-transparent washi tape with jagged paper cut edges and color palette.
  - Live rubber postal date stamp with dynamic current date and seal graphics.
  - Korea photobox serial barcode accent.

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
