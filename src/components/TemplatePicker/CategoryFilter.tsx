import React from 'react';
import {
  Sparkles,
  Heart,
  Camera,
  Gift,
  GraduationCap,
  Sun,
  Smile,
  LayoutGrid,
} from 'lucide-react';
import type { FrameCategory } from '../../types/template';

interface CategoryFilterProps {
  selectedCategory: FrameCategory | 'all';
  onSelectCategory: (category: FrameCategory | 'all') => void;
  categoryCounts: Record<string, number>;
}

export const CATEGORIES: { id: FrameCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Semua Frame', icon: <LayoutGrid size={16} /> },
  { id: 'cute', label: 'Cute', icon: <Sparkles size={16} /> },
  { id: 'minimal', label: 'Minimal', icon: <Camera size={16} /> },
  { id: 'vintage', label: 'Vintage', icon: <Camera size={16} /> },
  { id: 'romantic', label: 'Romantic', icon: <Heart size={16} /> },
  { id: 'friendship', label: 'Friendship', icon: <Smile size={16} /> },
  { id: 'birthday', label: 'Birthday', icon: <Gift size={16} /> },
  { id: 'graduation', label: 'Graduation', icon: <GraduationCap size={16} /> },
  { id: 'seasonal', label: 'Seasonal', icon: <Sun size={16} /> },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="category-filter-container">
      {CATEGORIES.map((cat) => {
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
