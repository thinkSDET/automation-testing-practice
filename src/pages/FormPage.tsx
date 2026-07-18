import React, { useState } from 'react';
import { ContactFormInput, submitContactForm } from '../api/mockApi';

const initialForm: ContactFormInput = {
  fullName: '',
  email: '',
  department: '',
  priority: 'normal',
  subscribe: false,
  message: '',
};

export default function FormPage() {
  const [form, setForm] = useState<ContactFormInput>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof ContactFormInput>(key: K, value: ContactFormInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.department) errs.department = 'Choose a department.';
    if (!form.message.trim()) errs.message = 'Message cannot be empty.';
    else if (form.message.trim().length < 20)
      errs.message = 'Message must be at least 20 characters.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setTicketId(null);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const result = await submitContactForm(form);
      setTicketId(result.ticketId);
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitError(null);
    setTicketId(null);
  };

  return (
    <div data-testid="form-page">
      <div className="page-header">
        <div>
          <h2>Support request</h2>
          <p>A multi-field form covering text, email, select, radio, checkbox, and textarea inputs.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 620 }}>
        {ticketId && (
          <div className="alert-banner alert-banner--success" data-testid="form-success">
            Ticket <strong>{ticketId}</strong> was created. We'll follow up by email.
          </div>
        )}
        {submitError && (
          <div className="alert-banner alert-banner--error" data-testid="form-error">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate data-testid="contact-form">
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              data-testid="input-fullname"
              className={errors.fullName ? 'has-error' : ''}
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
            />
            {errors.fullName && (
              <span className="field-error" data-testid="error-fullname">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              data-testid="input-email"
              className={errors.email ? 'has-error' : ''}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
            <span className="help-text">Use an address containing "bounce" to see a submission error.</span>
            {errors.email && (
              <span className="field-error" data-testid="error-email">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              data-testid="input-department"
              className={errors.department ? 'has-error' : ''}
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
            >
              <option value="">Select a department…</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical support</option>
              <option value="sales">Sales</option>
              <option value="other">Other</option>
            </select>
            {errors.department && (
              <span className="field-error" data-testid="error-department">
                {errors.department}
              </span>
            )}
          </div>

          <div className="field">
            <label>Priority</label>
            <div style={{ display: 'flex', gap: 16 }}>
              {(['low', 'normal', 'high'] as const).map((p) => (
                <label key={p} className="radio-row">
                  <input
                    type="radio"
                    name="priority"
                    data-testid={`priority-${p}`}
                    checked={form.priority === p}
                    onChange={() => update('priority', p)}
                  />
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              data-testid="input-message"
              className={errors.message ? 'has-error' : ''}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={5}
            />
            <span className="help-text">{form.message.trim().length} characters (minimum 20)</span>
            {errors.message && (
              <span className="field-error" data-testid="error-message">
                {errors.message}
              </span>
            )}
          </div>

          <div className="field">
            <label className="checkbox-row">
              <input
                type="checkbox"
                data-testid="input-subscribe"
                checked={form.subscribe}
                onChange={(e) => update('subscribe', e.target.checked)}
              />
              Send me product updates
            </label>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="submit"
              className="btn btn--primary"
              data-testid="submit-form"
              disabled={submitting}
            >
              {submitting ? <span className="spinner" /> : 'Submit request'}
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              data-testid="reset-form"
              onClick={handleReset}
              disabled={submitting}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
