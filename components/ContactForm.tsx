'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    if (form.current) {
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

        if (!response.ok) {
          throw new Error('Failed to send message. Please try again.');
        }

        setStatus('success');
        form.current.reset();
      } catch (err: any) {
        console.error('Contact form submission error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Failed to send message. Please try again later or contact us directly.');
      }
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
