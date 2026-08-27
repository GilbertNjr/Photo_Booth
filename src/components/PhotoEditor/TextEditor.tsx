import React from 'react';
import type { TextElement } from '../../types/template';
import { Type } from 'lucide-react';

interface TextEditorProps {
  textElements: TextElement[];
  customTexts: Record<string, string>;
  onChangeText: (id: string, value: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  textElements,
  customTexts,
  onChangeText,
}) => {
  if (textElements.length === 0) {
    return (
      <div style={{ color: 'var(--color-neutral-sub)', fontSize: '0.85rem' }}>
        This frame does not contain editable text fields.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Type size={16} color="#7b61ff" /> CUSTOMIZE CAPTIONS & DATES
      </label>

      {textElements.map((el) => {
        const val = customTexts[el.id] !== undefined ? customTexts[el.id] : el.defaultText;
        return (
          <div key={el.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-sub)' }}>
              FIELD ({el.placeholder || 'Text'})
            </span>
            <input
              type="text"
              value={val}
              onChange={(e) => onChangeText(el.id, e.target.value)}
              placeholder={el.placeholder}
              style={{
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '0.9rem',
                fontFamily: el.fontFamily || 'inherit',
                outline: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
