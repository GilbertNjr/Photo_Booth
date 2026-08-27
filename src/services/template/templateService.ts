import { TEMPLATES } from '../../data/templates';
import type { FrameCategory, TemplateData } from '../../types/template';

export class TemplateService {
  /**
   * Get all templates
   */
  static getAllTemplates(): TemplateData[] {
    return TEMPLATES;
  }

  /**
   * Get template by ID
   */
  static getTemplateById(id: string): TemplateData | undefined {
    return TEMPLATES.find((t) => t.id === id);
  }

  /**
   * Filter templates by category
   */
  static getTemplatesByCategory(category: FrameCategory | 'all'): TemplateData[] {
    if (category === 'all') return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === category);
  }

  /**
   * Search templates by name, subtitle, or tags
   */
  static searchTemplates(query: string, category: FrameCategory | 'all' = 'all'): TemplateData[] {
    const q = query.toLowerCase().trim();
    let list = this.getTemplatesByCategory(category);

    if (!q) return list;

    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.subtitle && t.subtitle.toLowerCase().includes(q)) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.style.toLowerCase().includes(q)
    );
  }

  /**
   * Get category counts map
   */
  static getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = { all: TEMPLATES.length };

    TEMPLATES.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    return counts;
  }
}
