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
import type { PhotoFilterType } from './types/editor';
import { TemplateService } from './services/template/templateService';
import { StorageService } from './services/storage/storageService';

import { GalleryView } from './views/GalleryView';
import { AboutView } from './views/AboutView';
import { HowToUseView } from './views/HowToUseView';

type Step = 'picker' | 'camera' | 'customize' | 'final';

export interface SavedSessionStrip {
  id: string;
  templateName: string;
  dataUrl: string;
  timestamp: string;
}

export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('picker');
  const [selectedFrame, setSelectedFrame] = useState<TemplateData | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [finalImageDataUrl, setFinalImageDataUrl] = useState<string>('');
  const [appliedFilter, setAppliedFilter] = useState<PhotoFilterType>('original');
  const [sessionStrips, setSessionStrips] = useState<SavedSessionStrip[]>([]);

  const [isShowingFavoritesOnly, setIsShowingFavoritesOnly] = useState(false);
  const [isShowingHowToUse, setIsShowingHowToUse] = useState(false);
  const [isAllFramesCatalog, setIsAllFramesCatalog] = useState(false);

  const [favoritesCount, setFavoritesCount] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'gallery' | 'about'>('home');
  const [activeNavSection, setActiveNavSection] = useState<NavSection>('hero');

  // Kiosk Mode & 60s Idle Auto-Reset
  const [isKioskMode, setIsKioskMode] = useState(false);
  const [idleSecondsLeft, setIdleSecondsLeft] = useState<number | null>(null);

  const toggleKioskMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsKioskMode(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsKioskMode(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsKioskMode(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const navigateToStep = (newStep: Step) => {
    setCurrentStep(newStep);
    window.history.pushState({ step: newStep }, '');
  };

  const handleNewSession = () => {
    setSelectedFrame(null);
    setCapturedPhotos([]);
    setFinalImageDataUrl('');
    setAppliedFilter('original');
    setSessionStrips([]);
    navigateToStep('picker');
  };

  // 60-Second Auto-Reset Idle Purge on 'final' step
  useEffect(() => {
    if (currentStep !== 'final') {
      setIdleSecondsLeft(null);
      return;
    }

    let remaining = 60;
    setIdleSecondsLeft(remaining);

    const resetIdle = () => {
      remaining = 60;
      setIdleSecondsLeft(remaining);
    };

    const interval = setInterval(() => {
      remaining -= 1;
      setIdleSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        handleNewSession();
      }
    }, 1000);

    const events = ['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));

    return () => {
      clearInterval(interval);
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
    };
  }, [currentStep]);

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

  const handleSelectFrame = (template: TemplateData) => {
    setSelectedFrame(template);
    if (capturedPhotos.length > 0) {
      navigateToStep('customize');
    } else {
      navigateToStep('camera');
    }
  };

  const handlePhotosCaptured = (photos: string[]) => {
    setCapturedPhotos(photos);
    navigateToStep('customize');
  };

  const handleApplyCustomization = (imageDataUrl: string, selectedFilter?: PhotoFilterType) => {
    setFinalImageDataUrl(imageDataUrl);
    if (selectedFilter) {
      setAppliedFilter(selectedFilter);
    }
    const newStrip: SavedSessionStrip = {
      id: `strip-${Date.now()}`,
      templateName: selectedFrame?.name || 'PixBooth Strip',
      dataUrl: imageDataUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSessionStrips((prev) => {
      const exists = prev.some((s) => s.dataUrl === imageDataUrl);
      if (exists) return prev;
      return [...prev.slice(-3), newStrip];
    });
    navigateToStep('final');
  };

  const handleTryAnotherFrame = () => {
    setCurrentStep('picker');
    setIsShowingFavoritesOnly(false);
    setIsShowingHowToUse(false);
    setIsAllFramesCatalog(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        isKioskMode={isKioskMode}
        onToggleKiosk={toggleKioskMode}
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
            selectedFilter={appliedFilter}
            sessionStrips={sessionStrips}
            onSelectStripFromTray={(strip) => setFinalImageDataUrl(strip.dataUrl)}
            onTryAnotherFrame={handleTryAnotherFrame}
            onEditCustomization={() => setCurrentStep('customize')}
            onNewSession={handleNewSession}
          />
        )}

        {/* 60s Idle Auto-Reset Notification Alert Banner */}
        {idleSecondsLeft !== null && idleSecondsLeft <= 20 && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(239, 68, 68, 0.96)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              zIndex: 99999,
              fontSize: '0.84rem',
              fontWeight: 800,
              boxShadow: '0 8px 30px rgba(239, 68, 68, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
            }}
            onClick={() => setIdleSecondsLeft(60)}
          >
            <span style={{ fontSize: '1rem' }}>⏱️</span>
            <span>Sesi foto akan otomatis direset dalam {idleSecondsLeft} detik... Sentuh layar untuk lanjut.</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
