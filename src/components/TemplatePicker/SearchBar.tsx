import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search frames, tags (e.g. pink, 35mm, scrapbook)...',
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '1.1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--color-neutral-sub)',
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 2.8rem 0.75rem 2.8rem',
          borderRadius: 'var(--radius-full)',
          background: 'white',
          border: '1px solid var(--color-border-soft)',
          fontSize: '0.92rem',
          color: 'var(--color-neutral-dark)',
          boxShadow: 'var(--shadow-sm)',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-neutral-sub)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
