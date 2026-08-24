/**
 * Reusable React Error Boundary (app-wide + page inset).
 * Sentry / Qipper env coupling removed — callers may attach their own reporter.
 */

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import Button from '@/components/Button';

export interface ErrorBoundaryProps {
  children: ReactNode;
  scope?: string;
  variant?: 'fullscreen' | 'inset';
  onError?: (error: Error, info: ErrorInfo) => void;
  showDevMessage?: boolean;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const scope = this.props.scope ?? 'app';
    console.error(`[ErrorBoundary:${scope}]`, error);
    if (info.componentStack) {
      console.error(`[ErrorBoundary:${scope}] componentStack`, info.componentStack);
    }
    this.props.onError?.(error, info);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const inset = this.props.variant === 'inset';
    const showDevMessage = this.props.showDevMessage ?? false;

    return (
      <div
        className={
          inset
            ? 'flex flex-col items-center justify-center min-h-[40vh] gap-4 px-6 text-center'
            : 'flex flex-col items-center justify-center min-h-screen w-full bg-bg-body gap-4 px-6 text-center'
        }
        role="alert"
      >
        <div className="w-14 h-14 rounded-2xl bg-error-50 text-error-600 flex items-center justify-center border border-error-100">
          <AlertTriangle size={28} strokeWidth={2.5} />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-base font-black text-slate-800">خطایی در نمایش این بخش رخ داد</h1>
          <p className="text-sm font-bold text-slate-500 leading-relaxed">
            می‌توانید دوباره تلاش کنید یا صفحه را بارگذاری مجدد کنید.
          </p>
          {showDevMessage && (
            <pre className="mt-3 text-left text-[11px] font-mono text-error-700 bg-error-50 border border-error-100 rounded-xl p-3 overflow-auto max-h-32 dir-ltr">
              {error.message}
            </pre>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Button variant="secondary" onClick={this.handleReset}>
            <RefreshCw size={16} /> تلاش مجدد
          </Button>
          {!inset && (
            <Button variant="primary" onClick={this.handleReload}>
              بارگذاری مجدد
            </Button>
          )}
        </div>
      </div>
    );
  }
}
