const STORAGE_KEY = 'pixbooth_session_metrics_v1';
const BASELINE_COUNT = 1428;

export interface SessionMetrics {
  totalPrints: number;
  lastSessionAt: string;
}

export class SessionMetricsService {
  private static listeners: Array<(metrics: SessionMetrics) => void> = [];

  private static getStoredMetrics(): SessionMetrics {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.totalPrints === 'number') {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return {
      totalPrints: BASELINE_COUNT,
      lastSessionAt: new Date().toISOString(),
    };
  }

  static getMetrics(): SessionMetrics {
    return this.getStoredMetrics();
  }

  static getTotalCount(): number {
    return this.getStoredMetrics().totalPrints;
  }

  static getFormattedCount(): string {
    const count = this.getTotalCount();
    return count.toLocaleString('id-ID') + '+';
  }

  static incrementSessionCount(): SessionMetrics {
    const current = this.getStoredMetrics();
    const updated: SessionMetrics = {
      totalPrints: current.totalPrints + 1,
      lastSessionAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable or full
    }
    this.notifyListeners(updated);
    return updated;
  }

  static subscribe(callback: (metrics: SessionMetrics) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private static notifyListeners(metrics: SessionMetrics): void {
    this.listeners.forEach((cb) => {
      try {
        cb(metrics);
      } catch (err) {
        console.warn('Error in metrics listener:', err);
      }
    });
  }
}
