import React from 'react';
import { LayoutGrid, Camera, Palette, Download, Check } from 'lucide-react';

export type StepId = 'picker' | 'camera' | 'customize' | 'final';

interface StepProgressProps {
  currentStep: StepId;
  onStepClick: (step: StepId) => void;
  hasSelectedFrame: boolean;
  hasCapturedPhotos: boolean;
  hasFinalImage: boolean;
}

interface StepConfig {
  id: StepId;
  label: string;
  subLabel: string;
  icon: React.ElementType;
}

const STEPS: StepConfig[] = [
  { id: 'picker', label: '1. Pilih Frame', subLabel: 'Koleksi Bingkai', icon: LayoutGrid },
  { id: 'camera', label: '2. Ambil Foto', subLabel: 'Kamera Studio', icon: Camera },
  { id: 'customize', label: '3. Hias & Custom', subLabel: 'Filter & Stiker', icon: Palette },
  { id: 'final', label: '4. Unduh Foto', subLabel: 'Format PNG', icon: Download },
];

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  onStepClick,
  hasSelectedFrame,
  hasCapturedPhotos,
  hasFinalImage,
}) => {
  const getStepStatus = (stepId: StepId) => {
    const stepOrder: StepId[] = ['picker', 'camera', 'customize', 'final'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(stepId);

    if (currentIndex === targetIndex) return 'current';
    if (currentIndex > targetIndex) return 'completed';

    // Check if reachable
    if (stepId === 'camera' && hasSelectedFrame) return 'available';
    if (stepId === 'customize' && hasCapturedPhotos) return 'available';
    if (stepId === 'final' && hasFinalImage) return 'available';

    return 'disabled';
  };

  return (
    <div className="step-progress-wrapper">
      <div className="step-progress-container">
        {STEPS.map((step, idx) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const isCurrent = status === 'current';
          const isCompleted = status === 'completed';
          const isAvailable = status === 'available' || isCompleted || isCurrent;

          return (
            <React.Fragment key={step.id}>
              {idx > 0 && (
                <div className={`step-connector ${isCompleted || isCurrent ? 'active' : ''}`} />
              )}

              <button
                className={`step-item ${status}`}
                onClick={() => isAvailable && onStepClick(step.id)}
                disabled={!isAvailable}
                title={isAvailable ? `Pindah ke ${step.label}` : 'Selesaikan langkah sebelumnya terlebih dahulu'}
              >
                <div className="step-icon-badge">
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={16} />
                  )}
                </div>
                <div className="step-text-info">
                  <span className="step-main-label">{step.label}</span>
                  <span className="step-sub-label">{step.subLabel}</span>
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
