import React from 'react';
import {
  Sparkles,
  Heart,
  Camera,
  Gift,
  GraduationCap,
  Smile,
  LayoutGrid,
  Feather,
} from 'lucide-react';
import type { FrameCategory } from '../../types/template';

interface CategoryFilterProps {
  selectedCategory: FrameCategory | 'all';
  onSelectCategory: (category: FrameCategory | 'all') => void;
  categoryCounts: Record<string, number>;
}

export const CATEGORIES: { id: FrameCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Semua', icon: <LayoutGrid size={15} /> },
  { id: 'romantic', label: 'Romantic', icon: <Heart size={15} /> },
  { id: 'friendship', label: 'Bestie', icon: <Smile size={15} /> },
  { id: 'graduation', label: 'Graduation', icon: <GraduationCap size={15} /> },
  { id: 'cute', label: 'Cute', icon: <Sparkles size={15} /> },
  { id: 'vintage', label: 'Vintage', icon: <Camera size={15} /> },
  { id: 'minimal', label: 'Minimal', icon: <Feather size={15} /> },
  { id: 'birthday', label: 'Birthday', icon: <Gift size={15} /> },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const visibleCategories = CATEGORIES.filter((cat) => {
    if (cat.id === 'all') return true;
    return (categoryCounts[cat.id] || 0) > 0;
  });

  return (
    <div className="category-filter-container">
      {visibleCategories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
            <span className="category-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
};
