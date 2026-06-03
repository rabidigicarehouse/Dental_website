'use client';

import { useState } from 'react';
import type { RefObject } from 'react';
import { buildBackendUrl } from '@/lib/api-base-url';

type FormType =
  | 'patient-form'
  | 'medical-history'
  | 'covid19'
  | 'patient-screening';

interface Props {
  formRef: RefObject<HTMLFormElement | null>;
  formType: FormType;
  /** Optional: an extra download/print button to render next to Submit */
  onDownload?: () => void;
  downloadLabel?: string;
}

interface CollectedField {
  label: string;
  value: string;
}

async function buildRenderedPdfBase64(form: HTMLFormElement, title: string): Promise<string> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const cloneHost = document.createElement('div');
  cloneHost.style.position = 'fixed';
  cloneHost.style.left = '-10000px';
  cloneHost.style.top = '0';
  cloneHost.style.width = `${Math.ceil(form.getBoundingClientRect().width)}px`;
  cloneHost.style.padding = '0';
  cloneHost.style.margin = '0';
  cloneHost.style.background = '#ffffff';
  cloneHost.style.zIndex = '-1';

  const clone = form.cloneNode(true) as HTMLFormElement;
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';

  const originalControls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
  const clonedControls = clone.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');

  const buildTextReplacement = (
    source: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    cloned: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    const replacement = document.createElement(source instanceof HTMLTextAreaElement ? 'div' : 'span');
    const computed = window.getComputedStyle(source);
    const value =
      source instanceof HTMLSelectElement
        ? source.options[source.selectedIndex]?.text || source.value
        : source.value || source.getAttribute('placeholder') || '';

    replacement.textContent = value || ' ';
    replacement.style.display = computed.display === 'block' || source instanceof HTMLTextAreaElement ? 'block' : 'inline-flex';
    replacement.style.verticalAlign = computed.verticalAlign || 'middle';
    replacement.style.alignItems = 'center';
    replacement.style.boxSizing = 'border-box';
    replacement.style.width = computed.width;
    replacement.style.minWidth = computed.width;
    replacement.style.maxWidth = computed.width;
    replacement.style.minHeight = computed.height;
    replacement.style.height = computed.height === 'auto' ? 'auto' : computed.height;
    replacement.style.padding = computed.padding;
    replacement.style.margin = computed.margin;
    replacement.style.border = 'none';
    replacement.style.borderRadius = '0';
    replacement.style.background = 'transparent';
    replacement.style.color = computed.color;
    replacement.style.font = computed.font;
    replacement.style.fontSize = computed.fontSize;
    replacement.style.fontWeight = computed.fontWeight;
    replacement.style.fontFamily = computed.fontFamily;
    replacement.style.lineHeight = computed.lineHeight === 'normal' ? '1.35' : computed.lineHeight;
    replacement.style.letterSpacing = computed.letterSpacing;
    replacement.style.textAlign = 'center';
    replacement.style.whiteSpace = source instanceof HTMLTextAreaElement ? 'pre-wrap' : 'nowrap';
    replacement.style.overflow = 'visible';
    replacement.style.textOverflow = 'clip';
    replacement.style.justifyContent = 'center';
    replacement.style.textDecoration = 'none';
    replacement.style.boxShadow = 'none';

    if (source instanceof HTMLTextAreaElement) {
      replacement.style.height = 'auto';
      replacement.style.minHeight = computed.height;
      replacement.style.wordBreak = 'break-word';
      replacement.style.textAlign = 'left';
      replacement.style.justifyContent = 'flex-start';
    }

    cloned.replaceWith(replacement);
  };

  originalControls.forEach((original, index) => {
    const cloned = clonedControls[index];
    if (!cloned) return;

    if (cloned instanceof HTMLInputElement) {
      cloned.value = original instanceof HTMLInputElement ? original.value : original.value;
      if (original instanceof HTMLInputElement) {
        cloned.checked = original.checked;
        if (original.type === 'checkbox' || original.type === 'radio') {
          cloned.setAttribute('checked', original.checked ? 'checked' : '');
        } else {
          cloned.setAttribute('value', original.value);
        }
      }
    } else if (cloned instanceof HTMLTextAreaElement) {
      cloned.value = original.value;
      cloned.textContent = original.value;
    } else if (cloned instanceof HTMLSelectElement && original instanceof HTMLSelectElement) {
      cloned.value = original.value;
      Array.from(cloned.options).forEach((option, optionIndex) => {
        option.selected = optionIndex === original.selectedIndex;
      });
    }

    if (
      (original instanceof HTMLInputElement && !['checkbox', 'radio', 'button', 'submit', 'reset', 'hidden'].includes(original.type)) ||
      original instanceof HTMLTextAreaElement ||
      original instanceof HTMLSelectElement
    ) {
      buildTextReplacement(original, cloned);
    }
  });

  cloneHost.appendChild(clone);
  document.body.appendChild(cloneHost);

  try {
    const scale = Math.min(window.devicePixelRatio || 1, 1.35);
    const canvas = await html2canvas(cloneHost, {
      backgroundColor: '#ffffff',
      scale,
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    const imageData = canvas.toDataURL('image/jpeg', 0.82);
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let remainingHeight = imgHeight;
    let position = 0;

    pdf.setProperties({ title });
    pdf.addImage(imageData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    remainingHeight -= pageHeight;

    while (remainingHeight > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imageData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      remainingHeight -= pageHeight;
    }

    const dataUri = pdf.output('datauristring');
    return dataUri.split(',')[1] || '';
  } finally {
    document.body.removeChild(cloneHost);
  }
}

/**
 * Walks every input/select/textarea inside the form, derives a human-readable
 * label (from <label for="...">, the closest <label> ancestor, or a nearby
 * heading), and serializes the value. Groups checkboxes/radios with the
 * same `name` into a single entry.
 */
function collectFields(form: HTMLFormElement): CollectedField[] {
  const grouped: Record<string, CollectedField> = {};
  const fields: CollectedField[] = [];

  const labelFor = (el: HTMLElement): string => {
    // 1. <label for="id">
    const id = (el as HTMLInputElement).id;
    if (id) {
      const lbl = form.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (lbl && lbl.textContent) return lbl.textContent.trim();
    }
    // 2. Closest ancestor <label>
    const ancestorLabel = el.closest('label');
    if (ancestorLabel && ancestorLabel.textContent) {
      const text = ancestorLabel.textContent.trim();
      if (text) return text;
    }
    // 3. Nearest preceding heading or label within the same form-group
    const group = el.closest('.dental-form-row, .dental-form-group, .form-group, .mb-4, .row');
    if (group) {
      const heading = group.querySelector('label, .dental-form-label, h4, h5, .form-label');
      if (heading && heading.textContent) return heading.textContent.trim();
    }
    // 4. Placeholder fallback
    if ('placeholder' in el && (el as HTMLInputElement).placeholder) {
      return (el as HTMLInputElement).placeholder.trim();
    }
    // 5. name attribute
    if ((el as HTMLInputElement).name) return (el as HTMLInputElement).name;
    return '(unnamed field)';
  };

  const inputs = form.querySelectorAll<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >('input, select, textarea');

  inputs.forEach((el) => {
    const type = (el as HTMLInputElement).type;
    if (type === 'button' || type === 'submit' || type === 'reset' || type === 'hidden') return;
    if ((el as HTMLInputElement).disabled) return;

    const label = labelFor(el);

    if (type === 'checkbox') {
      const name = (el as HTMLInputElement).name || label;
      if (!grouped[name]) grouped[name] = { label, value: '' };
      if ((el as HTMLInputElement).checked) {
        const checkedLabel = labelFor(el);
        grouped[name].value =
          grouped[name].value
            ? `${grouped[name].value}, ${checkedLabel}`
            : checkedLabel;
      }
    } else if (type === 'radio') {
      const name = (el as HTMLInputElement).name || label;
      if (!grouped[name]) {
        // Use the closest fieldset/legend or section heading as the label
        const group = el.closest('.dental-form-row, fieldset, .form-group');
        let groupLabel = '';
        if (group) {
          const heading = group.querySelector('legend, label:first-child, .dental-form-label, h4, h5');
          if (heading && heading.textContent) groupLabel = heading.textContent.trim();
        }
        grouped[name] = { label: groupLabel || name, value: '' };
      }
      if ((el as HTMLInputElement).checked) {
        grouped[name].value = labelFor(el);
      }
    } else {
      const value = (el as HTMLInputElement).value || '';
      fields.push({ label, value });
    }
  });

  // Append grouped checkboxes/radios in stable order
  Object.values(grouped).forEach((g) => fields.push(g));

  return fields;
}

function validate(fields: CollectedField[]): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  fields.forEach((f) => {
    if (!f.value || f.value.trim() === '') missing.push(f.label || '(unnamed)');
  });
  return { ok: missing.length === 0, missing };
}

export default function PatientFormSubmit({
  formRef,
  formType,
  onDownload,
  downloadLabel = 'Download PDF',
}: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!formRef.current) return;
    setStatus('sending');
    setErrorMessage('');
    setMissingFields([]);

    const fields = collectFields(formRef.current);
    const { ok, missing } = validate(fields);

    if (!ok) {
      setStatus('error');
      setMissingFields(missing);
      setErrorMessage(
        `Please fill in all required fields. ${missing.length} field${missing.length === 1 ? '' : 's'} still empty.`
      );
      return;
    }

    // Best-effort: extract patient name + email from labels we recognize.
    const find = (re: RegExp) =>
      fields.find((f) => re.test(f.label))?.value || '';
    const firstName = find(/^first ?name\b/i);
    const lastName = find(/^last ?name\b/i);
    const fullName =
      find(/^(full ?name|patient ?name|name)\b/i) ||
      `${firstName} ${lastName}`.trim();
    const patientEmail = find(/^(email|e-?mail)\b/i);
    let renderedPdfBase64 = '';

    try {
      renderedPdfBase64 = await buildRenderedPdfBase64(formRef.current, formType);

      const response = await fetch(buildBackendUrl('/api/forms/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          patientName: fullName,
          patientEmail,
          fields,
          renderedPdfBase64,
        }),
      });

      let payload: { success?: boolean; error?: string; missingLabels?: string[] } = {};
      try {
        payload = await response.json();
      } catch {
        /* no JSON body */
      }

      if (!response.ok) {
        if (Array.isArray(payload.missingLabels) && payload.missingLabels.length > 0) {
          setMissingFields(payload.missingLabels);
        }
        const looksLikeBackendDown =
          response.status === 502 ||
          (typeof payload.error === 'string' && /backend is not reachable/i.test(payload.error));
        const friendly = looksLikeBackendDown
          ? 'We couldn’t reach the form service. Please try again in a moment, or call us at 212.697.1701.'
          : payload.error || `Form submission failed (${response.status}). Please try again.`;
        throw new Error(friendly);
      }

      setStatus('success');
      // Reset the form on success
      formRef.current.reset();
    } catch (err: any) {
      console.error('Patient form submission error:', err);
      const friendly =
        err?.name === 'TypeError'
          ? 'Network error — please check your internet connection and try again.'
          : err?.message || 'Failed to submit form. Please try again.';
      setStatus('error');
      setErrorMessage(friendly);
    }
  };

  return (
    <div className="patient-form-submit-wrap">
      <div className="patient-form-submit-actions">
        {onDownload && (
          <button
            type="button"
            className="btn-main btn-line"
            onClick={onDownload}
            disabled={status === 'sending'}
          >
            <span>{downloadLabel}</span>
          </button>
        )}
        <button
          type="button"
          className="btn-main"
          onClick={handleSubmit}
          disabled={status === 'sending'}
        >
          <span>{status === 'sending' ? 'Submitting…' : 'Submit to Clinic'}</span>
        </button>
      </div>

      {status === 'success' && (
        <div className="patient-form-feedback patient-form-feedback--success">
          <strong>✓ Form submitted!</strong> We&rsquo;ve emailed your completed form to the clinic and sent you a confirmation. We&rsquo;ll follow up shortly.
        </div>
      )}

      {status === 'error' && (
        <div className="patient-form-feedback patient-form-feedback--error">
          <strong>Could not submit:</strong> {errorMessage}
          {missingFields.length > 0 && (
            <ul className="patient-form-missing-list">
              {missingFields.slice(0, 20).map((label, i) => (
                <li key={i}>{label}</li>
              ))}
              {missingFields.length > 20 && <li>…and {missingFields.length - 20} more</li>}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
