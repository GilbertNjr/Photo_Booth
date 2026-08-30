import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFDF9',
            padding: '2rem',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              background: '#ffffff',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(128, 0, 32, 0.1)',
              border: '1px solid #FCE7F3',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FFE4E6',
                color: '#BE123C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem',
                color: '#800020',
                margin: 0,
              }}
            >
              Terjadi Kendala Teknis
            </h2>

            <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              Aplikasi mengalami kendala saat memuat kamera atau template. Silakan muat ulang halaman untuk melanjutkan.
            </p>

            {this.state.error && (
              <div
                style={{
                  background: '#F8FAFC',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  color: '#475569',
                  fontFamily: 'monospace',
                  width: '100%',
                  textAlign: 'left',
                  overflowX: 'auto',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={this.handleReset}
              style={{
                background: '#800020',
                color: '#ffffff',
                padding: '0.85rem 1.75rem',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(128, 0, 32, 0.25)',
              }}
            >
              <RotateCcw size={18} />
              <span>Muat Ulang Halaman</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
