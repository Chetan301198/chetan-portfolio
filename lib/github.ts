import { profile } from "./profile";

export type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
};

export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type LanguageShare = {
  name: string;
  bytes: number;
  percent: number;
};

export type GithubSnapshot = {
  user: GithubUser | null;
  repos: GithubRepo[];
  languages: LanguageShare[];
};

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "chetan-portfolio",
};

async function githubJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubSnapshot(): Promise<GithubSnapshot> {
  const user = await githubJson<GithubUser>(
    `https://api.github.com/users/${profile.githubUser}`,
  );
  const repos =
    (await githubJson<GithubRepo[]>(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated`,
    )) ?? [];

  const ownRepos = repos.filter((repo) => !repo.fork);
  const languageTotals = new Map<string, number>();

  await Promise.all(
    ownRepos.map(async (repo) => {
      const langs = await githubJson<Record<string, number>>(
        `https://api.github.com/repos/${profile.githubUser}/${repo.name}/languages`,
      );
      if (!langs) return;
      for (const [name, bytes] of Object.entries(langs)) {
        languageTotals.set(name, (languageTotals.get(name) ?? 0) + bytes);
      }
    }),
  );

  const totalBytes = [...languageTotals.values()].reduce(
    (sum, value) => sum + value,
    0,
  );
  const languages = [...languageTotals.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: totalBytes ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);

  return { user, repos: ownRepos, languages };
}
