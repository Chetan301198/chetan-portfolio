import { formatMonthYear, type GithubSnapshot } from "@/lib/github";
import { profile } from "@/lib/profile";

const languageColors = [
  "var(--accent)",
  "#c9c2b0",
  "#a39d8c",
  "#7f7a6c",
  "#615d52",
  "#47443c",
];

export function GithubSection({ github }: { github: GithubSnapshot }) {
  const { user, repos, languages } = github;
  const hasData = user !== null || repos.length > 0;
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const recentRepos = repos.slice(0, 6);

  const stats = [
    { label: "Public repos", value: user?.public_repos ?? repos.length },
    { label: "Stars earned", value: totalStars },
    { label: "Followers", value: user?.followers ?? 0 },
    { label: "Top language", value: languages[0]?.name ?? "—" },
  ];

  return (
    <section id="github" className="border-t border-line py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl">
            GitHub usage
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Live language mix and recently updated public repos, refreshed from
            the GitHub API every hour.
          </p>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-accent underline-offset-4 hover:underline"
        >
          View all repositories →
        </a>
      </div>

      {!hasData ? (
        <div className="mt-10 rounded-2xl border border-line bg-panel p-6 text-muted">
          GitHub data is unavailable right now (the API may be rate-limited).
          You can still browse everything on{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            github.com/{profile.githubUser}
          </a>
          .
        </div>
      ) : (
        <>
          <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-panel p-5"
              >
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mt-2 truncate text-2xl font-medium">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {languages.length > 0 && (
            <div className="mt-6 rounded-2xl border border-line bg-panel p-6">
              <h3 className="text-sm uppercase tracking-[0.18em] text-muted">
                Languages across public repos
              </h3>
              <div
                className="mt-4 flex h-3 overflow-hidden rounded-full"
                role="img"
                aria-label={`Language mix: ${languages
                  .map((l) => `${l.name} ${l.percent.toFixed(1)}%`)
                  .join(", ")}`}
              >
                {languages.map((language, index) => (
                  <div
                    key={language.name}
                    title={`${language.name} ${language.percent.toFixed(1)}%`}
                    className="h-full"
                    style={{
                      width: `${language.percent}%`,
                      background: languageColors[index] ?? languageColors[5],
                    }}
                  />
                ))}
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {languages.map((language, index) => (
                  <li
                    key={language.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{
                          background:
                            languageColors[index] ?? languageColors[5],
                        }}
                      />
                      {language.name}
                    </span>
                    <span className="font-mono text-muted">
                      {language.percent.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recentRepos.length > 0 && (
            <>
              <h3 className="mt-10 text-sm uppercase tracking-[0.18em] text-muted">
                Recently updated
              </h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {recentRepos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full rounded-2xl border border-line bg-panel p-5 hover:border-accent"
                    >
                      <p className="font-medium">{repo.name}</p>
                      <p className="mt-2 line-clamp-2 min-h-12 leading-6 text-muted">
                        {repo.description ?? "No description yet."}
                      </p>
                      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
                        {repo.language && <span>{repo.language}</span>}
                        <span>★ {repo.stargazers_count}</span>
                        <span>⑂ {repo.forks_count}</span>
                        <span>
                          Updated {formatMonthYear(repo.pushed_at || repo.updated_at)}
                        </span>
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
}
