'use client';

import { useState, useRef } from 'react';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    if (!form.current) return;

    try {
      const formData = new FormData(form.current);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const message = formData.get('message') as string;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      // Always try to read the body so we can surface a useful message.
      let payload: { success?: boolean; error?: string; message?: string } = {};
      try {
        payload = await response.json();
      } catch {
        /* no JSON body — fall through to status-based message */
      }

      if (!response.ok) {
        const backendMsg = payload.error || payload.message;
        const looksLikeBackendDown =
          response.status === 502 ||
          (typeof backendMsg === 'string' &&
            /backend is not reachable|failed to connect to contact service/i.test(
              backendMsg
            ));

        const friendly = looksLikeBackendDown
          ? 'We couldn’t reach our message service. Please try again in a moment, or email us at info@uedi.nyc.'
          : backendMsg || `Message failed (${response.status}). Please try again.`;
        throw new Error(friendly);
      }

      setStatus('success');
      form.current.reset();
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      const friendly =
        err?.name === 'TypeError'
          ? 'Network error — please check your internet connection and try again.'
          : err?.message || 'Failed to send message. Please try again later or contact us directly.';
      setStatus('error');
      setErrorMessage(friendly);
    }
  };

  return (
    <div className="p-40 bg-color-op-1 rounded-1">
      <h3>Get In Touch</h3>
      <form ref={form} onSubmit={sendEmail} name="contactForm" id="contact_form" className="form-border">
        <div className="mb-4">
          <input type="text" name="name" id="name" className="form-control" placeholder="Your Name" required />
        </div>

        <div className="mb-4">
          <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" required />
        </div>

        <div className="mb-4">
          <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone" required />
        </div>

        <div className="mb-4 mb20">
          <textarea name="message" id="message" className="form-control" placeholder="Your Message" required></textarea>
        </div>

        <div id='submit' className="mt20">
          <input 
            type='submit' 
            id='send_message' 
            value={status === 'sending' ? 'Sending...' : 'Send Message'} 
            className="btn-main" 
            disabled={status === 'sending'}
          />
        </div>

        {status === 'success' && (
          <div id="success_message" className='success' style={{ display: 'block' }}>
            Your message has been sent successfully.
          </div>
        )}
        
        {status === 'error' && (
          <div id="error_message" className='error' style={{ display: 'block' }}>
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
