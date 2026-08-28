import { useState, useEffect } from 'react';
import './assets/styles/main.css';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { StepProgress, type StepId } from './components/Common/StepProgress';
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

  const handleStepClick = (stepId: StepId) => {
    if (stepId === 'picker') {
      setCurrentStep('picker');
    } else if (stepId === 'camera' && selectedFrame) {
      setCurrentStep('camera');
    } else if (stepId === 'customize' && capturedPhotos.length > 0 && selectedFrame) {
      setCurrentStep('customize');
    } else if (stepId === 'final' && finalImageDataUrl) {
      setCurrentStep('final');
    }
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
    <div className="app-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Aesthetic Ambient Glow Effects */}
      <div
        style={{
          position: 'fixed',
          top: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 117, 151, 0.15) 0%, rgba(255, 235, 238, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '20%',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(243, 232, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-150px',
          left: '30%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.18) 0%, rgba(254, 252, 232, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar
        favoritesCount={favoritesCount}
        onGoToStudio={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(false);
        }}
        onFilterFavorites={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(true);
        }}
        isShowingFavoritesOnly={isShowingFavoritesOnly}
        onToggleKiosk={toggleKioskMode}
        isKioskMode={isKioskMode}
      />

      <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Modern Step Navigation Bar */}
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleStepClick}
          hasSelectedFrame={!!selectedFrame}
          hasCapturedPhotos={capturedPhotos.length > 0}
          hasFinalImage={!!finalImageDataUrl}
        />

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

