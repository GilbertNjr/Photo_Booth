import { useState, useEffect } from 'react';
import './assets/styles/main.css';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { FramePickerView } from './views/FramePickerView';
import { CameraView } from './views/CameraView';
import { CustomizeView } from './views/CustomizeView';
import { FinalPreviewView } from './views/FinalPreviewView';
import type { TemplateData } from './types/template';
import { StorageService } from './services/storage/storageService';

type Step = 'picker' | 'camera' | 'customize' | 'final';

export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('picker');
  const [selectedFrame, setSelectedFrame] = useState<TemplateData | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [finalImageDataUrl, setFinalImageDataUrl] = useState<string>('');

  const [isShowingFavoritesOnly, setIsShowingFavoritesOnly] = useState(false);
  const [isKioskMode, setIsKioskMode] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setFavoritesCount(StorageService.getFavorites().length);
  }, [isShowingFavoritesOnly, currentStep]);

  const handleSelectFrame = (template: TemplateData) => {
    setSelectedFrame(template);
    setCurrentStep('camera');
  };

  const handlePhotosCaptured = (photos: string[]) => {
    setCapturedPhotos(photos);
    setCurrentStep('customize');
  };

  const handleApplyCustomization = (imageDataUrl: string) => {
    setFinalImageDataUrl(imageDataUrl);
    setCurrentStep('final');
  };

  const handleNewSession = () => {
    setSelectedFrame(null);
    setCapturedPhotos([]);
    setFinalImageDataUrl('');
    setCurrentStep('picker');
  };

  const toggleKioskMode = () => {
    const nextState = !isKioskMode;
    setIsKioskMode(nextState);
    if (nextState) {
      document.body.classList.add('kiosk-mode');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.body.classList.remove('kiosk-mode');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar
        favoritesCount={favoritesCount}
        onFilterFavorites={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly((prev) => !prev);
        }}
        isShowingFavoritesOnly={isShowingFavoritesOnly}
        onToggleKiosk={toggleKioskMode}
        isKioskMode={isKioskMode}
      />

      <main className="main-content">
        {currentStep === 'picker' && (
          <FramePickerView
            onSelectFrame={handleSelectFrame}
            isShowingFavoritesOnly={isShowingFavoritesOnly}
          />
        )}

        {currentStep === 'camera' && selectedFrame && (
          <CameraView
            template={selectedFrame}
            onBackToFrames={() => setCurrentStep('picker')}
            onPhotosCaptured={handlePhotosCaptured}
          />
        )}

        {currentStep === 'customize' && selectedFrame && (
          <CustomizeView
            template={selectedFrame}
            capturedPhotos={capturedPhotos}
            onBackToCamera={() => setCurrentStep('camera')}
            onApplyCustomization={handleApplyCustomization}
          />
        )}

        {currentStep === 'final' && finalImageDataUrl && (
          <FinalPreviewView
            finalImageDataUrl={finalImageDataUrl}
            onEditCustomization={() => setCurrentStep('customize')}
            onNewSession={handleNewSession}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
