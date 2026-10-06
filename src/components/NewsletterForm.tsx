"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to a newsletter provider (e.g. Formspree, Mailchimp).
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-sm text-gold-light">Thank you for subscribing!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex overflow-hidden rounded-md bg-white">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Enter your email"
        className="min-w-0 flex-1 px-3.5 py-3.5 text-[13px] text-ink outline-none placeholder:text-[#777]"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex w-12 items-center justify-center border-l border-[#e3dacb] text-forest hover:bg-cream"
      >
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
