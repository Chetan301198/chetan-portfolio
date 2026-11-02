import Image from "next/image";
import { ContactSection } from "./components/contact-section";
import { GithubSection } from "./components/github-section";
import { getGithubSnapshot } from "@/lib/github";
import { profile } from "@/lib/profile";

const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default async function Home() {
  const github = await getGithubSnapshot();
  const avatar =
    github.user?.avatar_url ?? `https://github.com/${profile.githubUser}.png`;
  const githubSince = github.user?.created_at.slice(0, 4) ?? null;

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <a
            href="#top"
            className="shrink-0 font-mono text-sm tracking-[0.2em] text-accent"
          >
            CB
          </a>
          <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto text-sm text-muted">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={profile.linkedin}
            className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm text-foreground hover:border-accent hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="grid gap-10 py-20 md:grid-cols-[1.4fr_0.8fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
              {profile.location}
            </p>
            <h1 className="mt-5 font-(family-name:--font-fraunces) text-5xl leading-[1.05] tracking-tight md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
              {profile.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#1a140c] hover:bg-[#e8bb74]"
              >
                View work
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
          <div className="rounded-3xl border border-line bg-panel p-5">
            <Image
              src={avatar}
              alt={`${profile.name} GitHub avatar`}
              width={420}
              height={420}
              className="aspect-square w-full rounded-2xl object-cover"
              priority
            />
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <dt className="text-muted">Repos</dt>
                <dd className="mt-1 text-xl font-medium">
                  {github.user?.public_repos ?? profile.projects.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Followers</dt>
                <dd className="mt-1 text-xl font-medium">
                  {github.user?.followers ?? 0}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Since</dt>
                <dd className="mt-1 text-xl font-medium">
                  {githubSince ?? "—"}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="about" className="border-t border-line py-20">
          <div className="grid gap-10 md:grid-cols-[0.4fr_1fr]">
            <h2 className="font-(family-name:--font-fraunces) text-3xl">
              About
            </h2>
            <div className="space-y-5 text-lg leading-8 text-muted">
              {profile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="flex flex-wrap gap-2 pt-2">
                {profile.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-accent-soft px-3 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-line py-20">
          <h2 className="font-(family-name:--font-fraunces) text-3xl">
            Experience
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Roles pulled from{" "}
            <a
              href={profile.linkedin}
              className="text-accent underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            . Dates and titles match the public profile.
          </p>
          <ol className="mt-10 space-y-6">
            {profile.experience.map((job) => (
              <li
                key={`${job.company}-${job.role}-${job.start}`}
                className="grid gap-4 rounded-2xl border border-line bg-panel p-6 md:grid-cols-[220px_1fr]"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {job.start} — {job.end}
                  </p>
                  <p className="mt-2 text-sm text-muted">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium">{job.role}</h3>
                  <p className="mt-1 text-muted">{job.company}</p>
                  <ul className="mt-4 space-y-2 text-muted">
                    {job.points.map((point) => (
                      <li key={point} className="leading-7">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="border-t border-line py-20">
          <h2 className="font-(family-name:--font-fraunces) text-3xl">
            Selected projects
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Public repositories from{" "}
            <span className="text-foreground">{profile.githubUser}</span>, with
            stack inferred from each repo’s dependencies.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {profile.projects.map((project) => {
              const live = github.repos.find(
                (repo) => repo.name === project.repo,
              );
              return (
                <a
                  key={project.repo}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-line bg-panel p-6 hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-medium">{project.name}</h3>
                    <span className="font-mono text-xs text-muted group-hover:text-accent">
                      {live?.language ?? project.stack[0]}
                    </span>
                  </div>
                  <p className="mt-3 leading-7 text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </a>
              );
            })}
          </div>
        </section>

        <GithubSection github={github} />

        <ContactSection />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {profile.name}</p>
          <p>Experience from LinkedIn · usage from GitHub</p>
        </div>
      </footer>
    </div>
  );
}
