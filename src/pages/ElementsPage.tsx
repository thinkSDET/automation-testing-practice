import React, { useEffect, useRef, useState } from 'react';

export default function ElementsPage() {
  const [checkboxes, setCheckboxes] = useState({ a: false, b: true, c: false });
  const [radioValue, setRadioValue] = useState('medium');
  const [selectValue, setSelectValue] = useState('');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [range, setRange] = useState(50);
  const [date, setDate] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [dynamicVisible, setDynamicVisible] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDynamicVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  };

  const accordionItems = [
    { title: 'What is this practice app for?', body: 'It gives an automation framework realistic, stable elements to interact with — no live backend required.' },
    { title: 'Is the data real?', body: 'No. Everything is generated in memory when the app starts, so runs are repeatable.' },
    { title: 'Can I reset state?', body: 'Refresh the page — session data lives in memory and localStorage only.' },
  ];

  return (
    <div data-testid="elements-page">
      <div className="page-header">
        <div>
          <h2>UI elements</h2>
          <p>A grab bag of controls: checkboxes, selects, sliders, tooltips, modals, and more.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Checkboxes &amp; radios</h3>
          <label className="checkbox-row">
            <input
              type="checkbox"
              data-testid="checkbox-a"
              checked={checkboxes.a}
              onChange={(e) => setCheckboxes((c) => ({ ...c, a: e.target.checked }))}
            />
            Option A
          </label>
          <br />
          <label className="checkbox-row">
            <input
              type="checkbox"
              data-testid="checkbox-b"
              checked={checkboxes.b}
              onChange={(e) => setCheckboxes((c) => ({ ...c, b: e.target.checked }))}
            />
            Option B (starts checked)
          </label>
          <br />
          <label className="checkbox-row">
            <input
              type="checkbox"
              data-testid="checkbox-c"
              disabled
              checked={checkboxes.c}
              onChange={(e) => setCheckboxes((c) => ({ ...c, c: e.target.checked }))}
            />
            Option C (disabled)
          </label>

          <hr className="divider" />

          {(['small', 'medium', 'large'] as const).map((size) => (
            <label className="radio-row" key={size} style={{ marginBottom: 6 }}>
              <input
                type="radio"
                name="size"
                data-testid={`radio-${size}`}
                checked={radioValue === size}
                onChange={() => setRadioValue(size)}
              />
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
          ))}
        </div>

        <div className="card">
          <h3>Selects &amp; range</h3>
          <div className="field">
            <label htmlFor="single-select">Single select</label>
            <select
              id="single-select"
              data-testid="single-select"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="">Choose a fruit…</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="cherry">Cherry</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="multi-select">Multi select</label>
            <select
              id="multi-select"
              data-testid="multi-select"
              multiple
              value={multiSelect}
              onChange={(e) =>
                setMultiSelect(Array.from(e.target.selectedOptions).map((o) => o.value))
              }
              style={{ height: 90 }}
            >
              <option value="js">JavaScript</option>
              <option value="ts">TypeScript</option>
              <option value="py">Python</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="range-input">
              Range: <span data-testid="range-value">{range}</span>
            </label>
            <input
              id="range-input"
              type="range"
              data-testid="range-input"
              min={0}
              max={100}
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="date-input">Date picker</label>
            <input
              id="date-input"
              type="date"
              data-testid="date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="card">
          <h3>Tooltip &amp; modal</h3>
          <div
            className="tooltip-wrap"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
          >
            <button className="btn btn--secondary" data-testid="tooltip-trigger">
              Hover me
            </button>
            {tooltipOpen && (
              <div className="tooltip-bubble" data-testid="tooltip-bubble">
                This tooltip only exists on hover
              </div>
            )}
          </div>
          <div style={{ marginTop: 14 }}>
            <button
              className="btn btn--primary"
              data-testid="open-modal"
              onClick={() => setModalOpen(true)}
            >
              Open modal
            </button>
          </div>
          <div style={{ marginTop: 14 }}>
            <button
              className="btn btn--secondary"
              data-testid="toggle-enable-btn"
              onClick={() => setToggleDisabled((v) => !v)}
            >
              {toggleDisabled ? 'Enable the button below' : 'Disable the button below'}
            </button>
            <br />
            <button
              className="btn btn--primary"
              data-testid="togglable-btn"
              disabled={toggleDisabled}
              style={{ marginTop: 10 }}
            >
              {toggleDisabled ? 'Currently disabled' : 'Now enabled — click me'}
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Accordion</h3>
          {accordionItems.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                className="btn btn--ghost"
                data-testid={`accordion-header-${i}`}
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  color: 'var(--ink)',
                  borderColor: 'transparent',
                  padding: '10px 0',
                }}
                onClick={() => setAccordionOpen((cur) => (cur === i ? null : i))}
              >
                {item.title} <span>{accordionOpen === i ? '−' : '+'}</span>
              </button>
              {accordionOpen === i && (
                <p className="help-text" data-testid={`accordion-body-${i}`} style={{ paddingBottom: 12 }}>
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Dynamic content</h3>
          <p className="help-text">This block appears about 2 seconds after the page loads.</p>
          {dynamicVisible ? (
            <div className="alert-banner alert-banner--info" data-testid="dynamic-content">
              Loaded! This element did not exist when the page first rendered.
            </div>
          ) : (
            <div className="loading-row" data-testid="dynamic-content-pending">
              <span className="spinner" /> Waiting…
            </div>
          )}
        </div>

        <div className="card">
          <h3>File upload</h3>
          <div
            className={`upload-zone ${dragging ? 'is-dragging' : ''}`}
            data-testid="upload-zone"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            Drag files here, or click to browse
            <input
              ref={fileInputRef}
              type="file"
              multiple
              data-testid="file-input"
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          <div data-testid="file-list">
            {files.map((f, i) => (
              <span className="file-chip" key={i} data-testid="file-chip">
                {f.name}
                <button
                  aria-label={`Remove ${f.name}`}
                  data-testid={`remove-file-${i}`}
                  onClick={() => setFiles((fs) => fs.filter((_, idx) => idx !== i))}
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Embedded frame</h3>
          <p className="help-text">A same-origin iframe for practicing frame-scoped locators.</p>
          <iframe
            title="practice-frame"
            data-testid="practice-iframe"
            style={{ width: '100%', height: 140, border: '1px solid var(--border)', borderRadius: 6 }}
            srcDoc={`<!doctype html><html><body style="font-family: sans-serif; padding: 12px;">
              <p>Content inside an iframe.</p>
              <button id="frame-btn" onclick="document.getElementById('frame-result').textContent='Clicked inside frame'">Click me</button>
              <p id="frame-result" data-testid="frame-result"></p>
            </body></html>`}
          />
        </div>
      </div>

      {modalOpen && (
        <div
          className="modal-overlay"
          data-testid="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" data-testid="modal">
            <h3>Confirm action</h3>
            <p>This is a standard modal dialog with a focus trap you can build automation around.</p>
            <div className="modal__actions">
              <button
                className="btn btn--secondary"
                data-testid="modal-cancel"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn--primary"
                data-testid="modal-confirm"
                onClick={() => setModalOpen(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
