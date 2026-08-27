# Testing Strategy — Photo Booth Web App

## 1. Scope of Testing
- **Visual & UI Testing:** Verify design system responsiveness across mobile (360px-430px), tablet (768px-1024px), laptop/desktop (1440px+), and touchscreen kiosk modes.
- **Data Model Integrity:** Ensure all templates conform strictly to `TemplateData` interfaces.
- **Filtering & Search:** Test filtering by category, search by tag/name, and favorite persistence in `localStorage`.
- **Canvas Rendering:** Validate pixel output across various photo slot aspect ratios and styles.

## 2. Testing Execution
- Build validation via TypeScript compiler (`tsc --noEmit`).
- Dev server execution via Vite (`npm run dev`).
- Visual verification using automated browser subagent.
