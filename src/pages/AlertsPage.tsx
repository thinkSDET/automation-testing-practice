import React, { useState } from 'react';

interface Toast {
  id: number;
  text: string;
  kind: 'info' | 'success' | 'error';
}

let toastCounter = 0;

export default function AlertsPage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [promptResult, setPromptResult] = useState<string | null>(null);
  const [confirmResult, setConfirmResult] = useState<string | null>(null);
  const [banners, setBanners] = useState({
    info: true,
    success: true,
    warning: true,
    error: true,
  });
  const [slowActionState, setSlowActionState] = useState<'idle' | 'loading' | 'done'>('idle');

  const pushToast = (text: string, kind: Toast['kind'] = 'info') => {
    const id = ++toastCounter;
    setToasts((t) => [...t, { id, text, kind }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const runNativeAlert = () => {
    window.alert('This is a native browser alert().');
  };

  const runNativeConfirm = () => {
    const result = window.confirm('This is a native confirm(). Proceed?');
    setConfirmResult(result ? 'User accepted' : 'User dismissed');
  };

  const runNativePrompt = () => {
    const result = window.prompt('This is a native prompt(). Type anything:', 'default value');
    setPromptResult(result);
  };

  const runSlowAction = () => {
    setSlowActionState('loading');
    setTimeout(() => {
      setSlowActionState('done');
      pushToast('Slow action finished after 2.5s', 'success');
    }, 2500);
  };

  return (
    <div data-testid="alerts-page">
      <div className="page-header">
        <div>
          <h2>Alerts &amp; notifications</h2>
          <p>Native browser dialogs, toast notifications, and dismissible banners.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Native dialogs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <button className="btn btn--secondary" data-testid="trigger-alert" onClick={runNativeAlert}>
              Trigger alert()
            </button>
            <button className="btn btn--secondary" data-testid="trigger-confirm" onClick={runNativeConfirm}>
              Trigger confirm()
            </button>
            {confirmResult && (
              <span className="help-text" data-testid="confirm-result">
                {confirmResult}
              </span>
            )}
            <button className="btn btn--secondary" data-testid="trigger-prompt" onClick={runNativePrompt}>
              Trigger prompt()
            </button>
            {promptResult !== null && (
              <span className="help-text" data-testid="prompt-result">
                You typed: {promptResult}
              </span>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Toast notifications</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="btn btn--secondary btn--sm"
              data-testid="toast-info"
              onClick={() => pushToast('Heads up — this is informational.', 'info')}
            >
              Info toast
            </button>
            <button
              className="btn btn--secondary btn--sm"
              data-testid="toast-success"
              onClick={() => pushToast('Saved successfully.', 'success')}
            >
              Success toast
            </button>
            <button
              className="btn btn--secondary btn--sm"
              data-testid="toast-error"
              onClick={() => pushToast('Something went wrong.', 'error')}
            >
              Error toast
            </button>
          </div>
          <p className="help-text" style={{ marginTop: 10 }}>
            Toasts auto-dismiss after 3.5 seconds — useful for practicing timing-sensitive assertions.
          </p>
        </div>

        <div className="card">
          <h3>Async action with feedback</h3>
          <button
            className="btn btn--primary"
            data-testid="slow-action"
            onClick={runSlowAction}
            disabled={slowActionState === 'loading'}
          >
            {slowActionState === 'loading' ? <span className="spinner" /> : 'Run 2.5s action'}
          </button>
          <p className="help-text" data-testid="slow-action-status" style={{ marginTop: 10 }}>
            Status: {slowActionState}
          </p>
        </div>

        <div className="card">
          <h3>Dismissible banners</h3>
          {banners.info && (
            <div className="alert-banner alert-banner--info" data-testid="banner-info">
              Informational banner.
              <button
                className="btn btn--ghost btn--sm"
                data-testid="dismiss-banner-info"
                style={{ marginLeft: 'auto', color: 'var(--primary)' }}
                onClick={() => setBanners((b) => ({ ...b, info: false }))}
              >
                Dismiss
              </button>
            </div>
          )}
          {banners.success && (
            <div className="alert-banner alert-banner--success" data-testid="banner-success">
              Success banner.
              <button
                className="btn btn--ghost btn--sm"
                data-testid="dismiss-banner-success"
                style={{ marginLeft: 'auto', color: 'var(--success)' }}
                onClick={() => setBanners((b) => ({ ...b, success: false }))}
              >
                Dismiss
              </button>
            </div>
          )}
          {banners.warning && (
            <div className="alert-banner alert-banner--warning" data-testid="banner-warning">
              Warning banner.
              <button
                className="btn btn--ghost btn--sm"
                data-testid="dismiss-banner-warning"
                style={{ marginLeft: 'auto', color: 'var(--amber)' }}
                onClick={() => setBanners((b) => ({ ...b, warning: false }))}
              >
                Dismiss
              </button>
            </div>
          )}
          {banners.error && (
            <div className="alert-banner alert-banner--error" data-testid="banner-error">
              Error banner.
              <button
                className="btn btn--ghost btn--sm"
                data-testid="dismiss-banner-error"
                style={{ marginLeft: 'auto', color: 'var(--danger)' }}
                onClick={() => setBanners((b) => ({ ...b, error: false }))}
              >
                Dismiss
              </button>
            </div>
          )}
          {!banners.info && !banners.success && !banners.warning && !banners.error && (
            <p className="help-text" data-testid="banners-empty">
              All banners dismissed. Refresh to restore them.
            </p>
          )}
        </div>
      </div>

      <div className="toast-stack" data-testid="toast-stack">
        {toasts.map((t) => (
          <div className="toast" key={t.id} data-testid="toast">
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
