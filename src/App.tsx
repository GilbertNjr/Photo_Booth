import { useState, useEffect } from 'react';
import './assets/styles/main.css';
import { Navbar, type NavSection } from './components/Layout/Navbar';
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
import { AboutView } from './views/AboutView';
import { HowToUseView } from './views/HowToUseView';

type Step = 'picker' | 'camera' | 'customize' | 'final';

export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('picker');
  const [selectedFrame, setSelectedFrame] = useState<TemplateData | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [finalImageDataUrl, setFinalImageDataUrl] = useState<string>('');

  const [isShowingFavoritesOnly, setIsShowingFavoritesOnly] = useState(false);
  const [isShowingHowToUse, setIsShowingHowToUse] = useState(false);
  const [isAllFramesCatalog, setIsAllFramesCatalog] = useState(false);

  const [favoritesCount, setFavoritesCount] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'gallery' | 'about'>('home');
  const [activeNavSection, setActiveNavSection] = useState<NavSection>('hero');

  useEffect(() => {
    setFavoritesCount(StorageService.getFavorites().length);
  }, [isShowingFavoritesOnly, currentStep]);

  // 📜 ScrollSpy system for automatic Navbar active tab highlighting as user scrolls
  useEffect(() => {
    if (currentStep !== 'picker' || isShowingFavoritesOnly || isShowingHowToUse) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;

      const framesEl = document.getElementById('frame-showcase-section');
      const howToUseEl = document.getElementById('how-to-use-section');
      const aboutEl = document.getElementById('about-section');

      const aboutOffset = aboutEl ? aboutEl.offsetTop : Infinity;
      const howToUseOffset = howToUseEl ? howToUseEl.offsetTop : Infinity;
      const framesOffset = framesEl ? framesEl.offsetTop : Infinity;

      if (scrollPos >= aboutOffset - 60) {
        setActiveNavSection('about');
      } else if (scrollPos >= howToUseOffset - 60) {
        setActiveNavSection('how-to-use');
      } else if (scrollPos >= framesOffset - 60) {
        setActiveNavSection('frames');
      } else {
        setActiveNavSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep, isShowingFavoritesOnly, isShowingHowToUse]);

  // Browser Back Button (popstate) Step-by-Step Navigation
  useEffect(() => {
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

  const scrollToElementWithOffset = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', overflowX: 'clip' }}>
      <Navbar
        favoritesCount={favoritesCount}
        activeSection={activeNavSection}
        onGoToStudio={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(false);
          setIsShowingHowToUse(false);
          setIsAllFramesCatalog(false);
          setActiveBottomTab('home');
          setActiveNavSection('hero');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToAllFrames={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(false);
          setIsShowingHowToUse(false);
          setIsAllFramesCatalog(false);
          setActiveBottomTab('home');
          setActiveNavSection('frames');
          setTimeout(() => {
            scrollToElementWithOffset('frame-showcase-section');
          }, 100);
        }}
        onFilterFavorites={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(true);
          setIsShowingHowToUse(false);
          setActiveNavSection('favorites');
        }}
        onGoToHowToUse={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(false);
          setIsShowingHowToUse(false);
          setIsAllFramesCatalog(false);
          setActiveBottomTab('home');
          setActiveNavSection('how-to-use');
          setTimeout(() => {
            scrollToElementWithOffset('how-to-use-section');
          }, 100);
        }}
        onGoToAbout={() => {
          setCurrentStep('picker');
          setIsShowingFavoritesOnly(false);
          setIsShowingHowToUse(false);
          setIsAllFramesCatalog(false);
          setActiveBottomTab('home');
          setActiveNavSection('about');
          setTimeout(() => {
            scrollToElementWithOffset('about-section');
          }, 100);
        }}
        isShowingFavoritesOnly={isShowingFavoritesOnly}
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

        {currentStep === 'picker' && isShowingHowToUse && (
          <HowToUseView onBack={() => setIsShowingHowToUse(false)} />
        )}

        {currentStep === 'picker' && !isShowingHowToUse && activeBottomTab === 'about' && (
          <AboutView onBack={() => setActiveBottomTab('home')} />
        )}

        {currentStep === 'picker' && !isShowingHowToUse && activeBottomTab === 'gallery' && (
          <GalleryView
            onSelectFrame={handleSelectFrame}
            onGoToCamera={() => {
              setActiveBottomTab('home');
              const defaultTpl = selectedFrame || TemplateService.getAllTemplates()[0];
              if (defaultTpl) handleSelectFrame(defaultTpl);
            }}
          />
        )}

        {currentStep === 'picker' && !isShowingHowToUse && activeBottomTab === 'home' && (
          <FramePickerView
            onSelectFrame={handleSelectFrame}
            isShowingFavoritesOnly={isShowingFavoritesOnly}
            isHomeView={!isAllFramesCatalog && !isShowingFavoritesOnly}
            onExploreAllFrames={() => setIsAllFramesCatalog(true)}
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
