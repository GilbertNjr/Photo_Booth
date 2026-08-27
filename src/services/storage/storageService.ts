const FAVORITES_KEY = 'photo_booth_favorites';

export class StorageService {
  static getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static toggleFavorite(templateId: string): string[] {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(templateId);
    let updated: string[];

    if (index >= 0) {
      updated = favorites.filter((id) => id !== templateId);
    } else {
      updated = [...favorites, templateId];
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }

    return updated;
  }

  static isFavorite(templateId: string): boolean {
    return this.getFavorites().includes(templateId);
  }
}
