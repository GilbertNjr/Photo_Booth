# Canvas Engine Specification — Photo Booth Web App

## 1. Pipeline Overview
The `CanvasEngine` (`src/services/canvas/canvasEngine.ts`) is responsible for taking base photo streams, template specifications, user edits, stickers, text overlays, and photo filters, and compositing them into a single high-resolution HTML5 Canvas.

```
Photo Captures ──┐
Template Data  ──┼──> [ CanvasEngine Pipeline ] ──> Output PNG / JPG / Print Data URL
Editor State   ──┤
Filters        ──┘
```

## 2. Compositing Order (Z-Index Hierarchy)
1. **Background Layer:** Solid color, CSS gradient, or canvas texture pattern (paper, film grain, dots).
2. **Outer Frame Border & Background Cards:** Tilted polaroid backgrounds, scrapbook papers, ticket borders.
3. **Photo Layer:** Captured photos cropped to slot aspect ratio with rotation and border radius.
4. **Photo Filter Overlay:** Per-slot or global CSS canvas filter matrix (Sepia, Vintage, Film, Contrast, B&W).
5. **Inner Frame Overlay & Perforations:** Film sprocket holes, ticket perforations, inner borders.
6. **Decorative Elements Layer:** Washi tape, stamps, barcodes, stickers, doodles.
7. **Text Layer:** Customizable headers, dates, handwritten captions.

## 3. High-DPI & Print Resolution
- Canvas default export targets minimum 300 DPI for high quality physical prints:
  - Photo Strip (2x6 inches @ 300 DPI): `600 x 1800 px`
  - Postcard (4x6 inches @ 300 DPI): `1200 x 1800 px`
