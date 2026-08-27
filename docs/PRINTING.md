# Printing Specification — Photo Booth Web App

## 1. Overview
The Printing Service (`src/services/printing/printService.ts`) handles print layouts, aspect ratio scaling, print preview generation, and window print triggering without relying on low-resolution screen captures.

## 2. Supported Layout Formats
- **2x6 Photo Strip:** Classic photo booth vertical strip (2 inches by 6 inches). Fits 2 strips side-by-side on standard 4x6 photo paper.
- **4x6 Postcard:** Standard 4 inch by 6 inch photo card.
- **A4 Multi-Cut:** Multi-strip page fitting 4-6 photo strips on a single A4 sheet for high-volume event printing.

## 3. High Resolution Print Pipeline
1. Render canvas at 300 DPI resolution (`1200x1800` or `600x1800`).
2. Convert canvas to lossless PNG Data URL.
3. Inject canvas output into invisible or modal `@media print` layout container.
4. Call `window.print()` with CSS page margins set to `0mm`.
