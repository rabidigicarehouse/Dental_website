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

    try {
      const response = await fetch(buildBackendUrl('/api/forms/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          patientName: fullName,
          patientEmail,
          fields,
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
