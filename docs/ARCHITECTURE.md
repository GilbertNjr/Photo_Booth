# System Architecture — Photo Booth Web App

## 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------+
|                              USER UI LAYER                             |
|  [FramePickerView] [CameraView] [CustomizeView] [FinalPreviewView]    |
+-----------------------------------++----------------------------------+
                                    ||
+-----------------------------------vv----------------------------------+
|                           COMPONENT SYSTEM                             |
|  - Layout (Navbar, Footer)                                            |
|  - FramePreview (FrameCard, FrameRender, FrameModal)                  |
|  - TemplatePicker (CategoryFilter, SearchBar, TemplateGrid)           |
|  - PhotoEditor (StickerPicker, TextEditor, FilterPicker)              |
+-----------------------------------++----------------------------------+
                                    ||
+-----------------------------------vv----------------------------------+
|                            SERVICE LAYER                              |
|  - TemplateService  : Queries & data transformations                  |
|  - CameraService    : WebRTC navigator.mediaDevices handling           |
|  - CaptureService   : Session management & countdown timer            |
|  - CanvasEngine     : Compositing, layer stack & export               |
|  - StorageService   : LocalStorage favorites & session state          |
|  - PrintService     : Print layouts & print document generation       |
+-----------------------------------++----------------------------------+
                                    ||
+-----------------------------------vv----------------------------------+
|                             DATA & STATE                              |
|  - Template Data Models (src/data/templates/*.ts)                     |
|  - React Application State / Context                                  |
+-----------------------------------------------------------------------+
```

## 2. Layer Definitions

### 2.1 UI Layer (`src/views` & `src/components`)
Pure functional React components driven by props and custom hooks. The UI components are decoupled from raw canvas manipulation and media stream setup.

### 2.2 Service Layer (`src/services`)
Stateless or state-encapsulated ES6 modules responsible for business operations:
- `templateService.ts`: Filters, searches, and fetches templates.
- `canvasEngine.ts`: Standardized canvas rendering pipeline.
- `cameraService.ts`: WebRTC media stream manager.
- `captureService.ts`: Multi-photo sequence state controller.
- `printService.ts`: Multi-format print document formatter.
- `storageService.ts`: Local persistence layer for favorites and app config.

### 2.3 Data Layer (`src/data/templates` & `src/types`)
Pure TypeScript objects defining frame schema:
- `PhotoSlot`: Position, aspect ratio, rotation, border radius.
- `DecorativeElement`: Tape, doodles, stamps, stickers, barcodes.
- `TextElement`: Customizable text headers, dates, and locations.
- `TemplateData`: Complete frame metadata and rendering specs.

## 3. Data Flow & Separation of Concerns
1. **Selection:** User selects a `TemplateData` object via `TemplatePicker`.
2. **Capture:** `CameraService` feeds media stream; `CaptureService` collects base64/Blob photo array matching `photoSlotsCount`.
3. **Customization:** User edits background color, text values, stickers, filters. Edits mutate a local `EditorState` structure.
4. **Rendering:** `CanvasEngine` processes `(TemplateData + Photos + EditorState)` to render to an HTML5 `<canvas>` element and generate high-resolution PNG data URLs.
