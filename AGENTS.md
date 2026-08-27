# AGENTS.md — Photo Booth Web App Guidelines

Welcome to the **Photo Booth Web App** codebase! This document provides guidelines, constraints, architectural principles, and instructions for AI agents and developers working on this repository.

---

## 1. Project Philosophy & Goal

> **Goal:** Build a digital Photo Booth experience that feels like a physical photo booth, but with aesthetic, cute, modern, Korean/Japanese-inspired, scrapbook, polaroid, and highly customizable frames.

The application must **never** look like a generic camera app or an admin dashboard. It must feel like a premium, playful, collectible photo booth kiosk.

---

## 2. Core Architecture Guidelines

1. **Data-Driven Templates:**
   - Frames/templates MUST NEVER be hardcoded into UI components.
   - All visual elements, slots, colors, text fields, and styles MUST be defined in structured `TemplateData` models in `src/data/templates/`.

2. **Modular Service Layer:**
   - UI components handle rendering and user interactions only.
   - Business logic must reside in `src/services/`:
     - `templateService.ts`: Template querying, filtering, and state.
     - `canvasEngine.ts`: Canvas composition, export, filter pipeline.
     - `cameraService.ts`: WebRTC camera access, stream management.
     - `captureService.ts`: Photo capture, countdown timing.
     - `printService.ts`: Print layouts (2x6 photo strip, 4x6 postcard, A4).
     - `storageService.ts`: Favorites, recent templates, session persistence.

3. **HTML5 Canvas Rendering:**
   - Final output generation MUST use standard HTML5 `<canvas>` rendering pipeline.
   - Screenshots of HTML elements are strictly prohibited for output generation to maintain high DPI resolution for printing.

4. **Design System & CSS:**
   - Styling uses CSS Variables (`src/assets/styles/variables.css`) and modular styles.
   - Do NOT introduce utility-first frameworks (TailwindCSS) unless explicitly instructed.
   - Prioritize micro-interactions, smooth transitions, glassmorphism, soft pastel colors, and elegant Google Fonts (`Outfit`, `Caveat`, `Plus Jakarta Sans`, `Playfair Display`, `Fredoka`).

---

## 3. Directory & File Structure Rules

- `src/components/`: Pure visual React components separated into domain subfolders (`Common`, `FramePreview`, `TemplatePicker`, `Layout`, etc.).
- `src/services/`: Isolated domain logic without React hooks (can be consumed by custom hooks or context).
- `src/types/`: TypeScript definitions.
- `src/data/templates/`: Template configurations grouped by category.
- `docs/`: Comprehensive project documentation.

---

## 4. Work Flow & Phase Progression

- Execute tasks strictly in planned phases.
- Do NOT proceed to camera or editor implementations before Phase 1 & 2 foundations (Template System & Picker UI) are thoroughly built, tested, and validated.

---

## 5. Testing & Maintenance Principles

- Ensure responsive behavior on Mobile, Tablet, Desktop, and Touchscreen Kiosk viewports.
- Avoid duplicate code and monolithic files.
- Document all architectural changes in `docs/CHANGELOG.md` and relevant docs.
