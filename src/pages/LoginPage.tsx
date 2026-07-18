import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerAccount, requestPasswordReset } from '../api/mockApi';
import './LoginPage.css';

type Mode = 'login' | 'register' | 'reset';

export default function LoginPage() {
  const { isAuthenticated, login, isLoading, error } = useAuth();
  const [mode, setMode] = useState<Mode>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const resetLocalState = () => {
    setFormErrors({});
    setNotice(null);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    resetLocalState();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetLocalState();
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await login(email, password);
    } catch {
      // error surfaced via useAuth().error
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetLocalState();
    const errs: Record<string, string> = {};
    if (!name) errs.name = 'Full name is required.';
    if (!email) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (confirmPassword !== password) errs.confirmPassword = 'Passwords do not match.';
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await registerAccount(name, email, password);
      setNotice({ type: 'success', text: 'Account created. You can now sign in.' });
      switchModePreserveNotice('login');
    } catch (err) {
      setNotice({ type: 'error', text: err instanceof Error ? err.message : 'Registration failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Keeps a success/error notice visible across a mode switch.
  const switchModePreserveNotice = (next: Mode) => {
    setMode(next);
    setFormErrors({});
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    resetLocalState();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormErrors({ email: 'Enter a valid email address.' });
      return;
    }
    setSubmitting(true);
    try {
      await requestPasswordReset(email);
      setNotice({ type: 'success', text: `If an account exists for ${email}, a reset link has been sent.` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card" data-testid="auth-card">
        <div className="login-brand">
          <span className="navbar__mark">QA</span>
          <h1>QA Sandbox</h1>
        </div>
        <p className="help-text" style={{ marginBottom: 20 }}>
          Practice credentials — email <code>qa.engineer@example.com</code>, password{' '}
          <code>Practice123!</code>
        </p>

        <div className="tabs" role="tablist">
          <button
            className={`tab ${mode === 'login' ? 'tab--active' : ''}`}
            data-testid="tab-login"
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => switchMode('login')}
          >
            Sign in
          </button>
          <button
            className={`tab ${mode === 'register' ? 'tab--active' : ''}`}
            data-testid="tab-register"
            role="tab"
            aria-selected={mode === 'register'}
            onClick={() => switchMode('register')}
          >
            Create account
          </button>
          <button
            className={`tab ${mode === 'reset' ? 'tab--active' : ''}`}
            data-testid="tab-reset"
            role="tab"
            aria-selected={mode === 'reset'}
            onClick={() => switchMode('reset')}
          >
            Forgot password
          </button>
        </div>

        {notice && (
          <div
            className={`alert-banner alert-banner--${notice.type === 'success' ? 'success' : 'error'}`}
            data-testid="auth-notice"
          >
            {notice.text}
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} noValidate data-testid="login-form">
            {error && (
              <div className="alert-banner alert-banner--error" data-testid="login-error">
                {error}
              </div>
            )}
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                data-testid="login-email-input"
                className={formErrors.email ? 'has-error' : ''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
              {formErrors.email && (
                <span className="field-error" data-testid="login-email-error">
                  {formErrors.email}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                data-testid="login-password-input"
                className={formErrors.password ? 'has-error' : ''}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {formErrors.password && (
                <span className="field-error" data-testid="login-password-error">
                  {formErrors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn--primary"
              data-testid="login-submit"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? <span className="spinner" /> : 'Sign in'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} noValidate data-testid="register-form">
            <div className="field">
              <label htmlFor="reg-name">Full name</label>
              <input
                id="reg-name"
                type="text"
                data-testid="register-name-input"
                className={formErrors.name ? 'has-error' : ''}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && <span className="field-error">{formErrors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                data-testid="register-email-input"
                className={formErrors.email ? 'has-error' : ''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && <span className="field-error">{formErrors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                data-testid="register-password-input"
                className={formErrors.password ? 'has-error' : ''}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && <span className="field-error">{formErrors.password}</span>}
            </div>
            <div className="field">
              <label htmlFor="reg-confirm">Confirm password</label>
              <input
                id="reg-confirm"
                type="password"
                data-testid="register-confirm-input"
                className={formErrors.confirmPassword ? 'has-error' : ''}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formErrors.confirmPassword && (
                <span className="field-error">{formErrors.confirmPassword}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn--primary"
              data-testid="register-submit"
              disabled={submitting}
              style={{ width: '100%' }}
            >
              {submitting ? <span className="spinner" /> : 'Create account'}
            </button>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={handleReset} noValidate data-testid="reset-form">
            <div className="field">
              <label htmlFor="reset-email">Email</label>
              <input
                id="reset-email"
                type="email"
                data-testid="reset-email-input"
                className={formErrors.email ? 'has-error' : ''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && <span className="field-error">{formErrors.email}</span>}
            </div>
            <button
              type="submit"
              className="btn btn--primary"
              data-testid="reset-submit"
              disabled={submitting}
              style={{ width: '100%' }}
            >
              {submitting ? <span className="spinner" /> : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
