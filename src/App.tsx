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
import { TemplateService } from './services/template/templateService';
import { StorageService } from './services/storage/storageService';

import { GalleryView } from './views/GalleryView';

import { BottomNav } from './components/Layout/BottomNav';

type Step = 'picker' | 'camera' | 'customize' | 'final';

export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('picker');
  const [selectedFrame, setSelectedFrame] = useState<TemplateData | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [finalImageDataUrl, setFinalImageDataUrl] = useState<string>('');

  const [isShowingFavoritesOnly, setIsShowingFavoritesOnly] = useState(false);
  const [isKioskMode, setIsKioskMode] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'gallery' | 'about'>('home');

  useEffect(() => {
    setFavoritesCount(StorageService.getFavorites().length);
  }, [isShowingFavoritesOnly, currentStep]);

  // Browser Back Button (popstate) Step-by-Step Navigation
  useEffect(() => {
    // Set initial history state if empty
    if (!window.history.state?.step) {
      window.history.replaceState({ step: 'picker' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setCurrentStep(event.state.step as Step);
      } else {
        setCurrentStep('picker');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToStep = (newStep: Step) => {
    setCurrentStep(newStep);
    window.history.pushState({ step: newStep }, '');
  };

  const handleSelectFrame = (template: TemplateData) => {
    setSelectedFrame(template);
    navigateToStep('camera');
  };

  const handlePhotosCaptured = (photos: string[]) => {
    setCapturedPhotos(photos);
    navigateToStep('customize');
  };

  const handleApplyCustomization = (imageDataUrl: string) => {
    setFinalImageDataUrl(imageDataUrl);
    navigateToStep('final');
  };

  const handleNewSession = () => {
    setSelectedFrame(null);
    setCapturedPhotos([]);
    setFinalImageDataUrl('');
    navigateToStep('picker');
  };

  const handleStepClick = (stepId: StepId) => {
    if (stepId === 'picker') {
      navigateToStep('picker');
    } else if (stepId === 'camera' && selectedFrame) {
      navigateToStep('camera');
    } else if (stepId === 'customize' && capturedPhotos.length > 0 && selectedFrame) {
      navigateToStep('customize');
    } else if (stepId === 'final' && finalImageDataUrl) {
      navigateToStep('final');
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
    <div className="app-container" style={{ position: 'relative', overflowX: 'clip' }}>
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

        {currentStep === 'picker' && activeBottomTab === 'gallery' && (
          <GalleryView
            onSelectFrame={handleSelectFrame}
            onGoToCamera={() => {
              setActiveBottomTab('home');
              const defaultTpl = selectedFrame || TemplateService.getAllTemplates()[0];
              if (defaultTpl) handleSelectFrame(defaultTpl);
            }}
          />
        )}

        {currentStep === 'picker' && activeBottomTab !== 'gallery' && (
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

      <BottomNav
        currentTab={activeBottomTab}
        onChangeTab={(tab) => {
          setActiveBottomTab(tab);
          if (tab === 'home') {
            setIsShowingFavoritesOnly(false);
            navigateToStep('picker');
          } else if (tab === 'gallery') {
            setIsShowingFavoritesOnly(true);
            navigateToStep('picker');
          } else if (tab === 'about') {
            alert('PixBooth Studio v2.0 • Ultra-High DPI Commercial Photo Booth System 📸✨');
          }
        }}
      />
    </div>
  );
}

export default App;

