# Component Catalog — Photo Booth Web App

## 1. Directory Overview
```
src/components/
├── Common/
│   ├── Badge.tsx
│   ├── Button.tsx
│   └── Modal.tsx
├── FramePreview/
│   ├── FrameCard.tsx
│   ├── FrameRender.tsx
│   └── FrameModal.tsx
├── Layout/
│   ├── Footer.tsx
│   └── Navbar.tsx
└── TemplatePicker/
    ├── CategoryFilter.tsx
    ├── SearchBar.tsx
    └── TemplateGrid.tsx
```

## 2. Key Components Detail

### `FrameCard.tsx`
- Renders frame thumbnail card in the template gallery.
- Supports favorite toggling (heart icon with animation).
- Interactive hover effects (card elevation, gradient border glow, CTA overlay).
- Renders dynamic tag badges (`Category`, `Style`, `Slots Count`).

### `FrameRender.tsx`
- Component responsible for visually rendering any `TemplateData` either in vector preview mode or canvas engine mode.
- Correctly positions photo slots, text elements, stickers, washi tape, tickets, and camera borders.

### `CategoryFilter.tsx`
- Category pill selector featuring icons and frame counts for all 8 categories (Cute, Minimal, Vintage, Romantic, Friendship, Birthday, Graduation, Seasonal).

### `TemplateGrid.tsx`
- Responsive grid container (auto-fill 280px-340px) displaying frame cards with smooth entrance micro-animations.

### `FrameModal.tsx`
- Modal dialog for inspecting selected template details, photo slot count, style tags, and primary action ("Use This Frame").
