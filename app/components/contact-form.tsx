"use client";

import { useState, type FormEvent } from "react";

// No backend needed: submitting opens the visitor's email app with the
// message pre-filled and addressed to the portfolio owner.
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Portfolio enquiry from ${name.trim() || "a visitor"}`;
    const body = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-panel p-6"
    >
      <label className="block text-sm text-muted">
        Your name
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Jane Doe"
          className={fieldClass}
        />
      </label>
      <label className="mt-5 block text-sm text-muted">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me about the role or project…"
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#1a140c] hover:bg-[#e8bb74]"
      >
        Send via email
      </button>
      <p className="mt-3 text-xs text-muted">
        This opens your email app with the message ready to send.
      </p>
    </form>
  );
}
