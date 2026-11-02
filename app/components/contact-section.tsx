import { profile } from "@/lib/profile";
import { ContactForm } from "./contact-form";
import { CopyEmailButton } from "./copy-email-button";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-line py-20">
      <h2 className="font-[family-name:var(--font-fraunces)] text-3xl">
        Contact
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <p className="max-w-xl text-lg leading-8 text-muted">
            Open to frontend roles and collaborations. Reach me directly or
            send a note with the form and I will get back to you.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <span
              aria-hidden
              className="size-2 rounded-full bg-accent"
            />
            Based in {profile.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#1a140c] hover:bg-[#e8bb74]"
            >
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <ContactForm email={profile.email} />
      </div>
    </section>
  );
}
