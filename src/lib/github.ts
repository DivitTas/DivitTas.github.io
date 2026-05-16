import type { Commit } from '../data/index';

export async function fetchRecentCommits(username: string, count = 6): Promise<Commit[]> {
  // Get public repos sorted by most recently pushed
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?type=public&sort=pushed&per_page=10`
  );
  if (!reposRes.ok) return [];
  const repos: { name: string; pushed_at: string }[] = await reposRes.json();

  // Fetch latest commits from each repo in parallel, then flatten + sort
  const perRepo = await Promise.all(
    repos.map(async (repo) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=3`
        );
        if (!res.ok) return [];
        const commits: { sha: string; commit: { message: string; author: { date: string } } }[] =
          await res.json();
        return commits.map((c) => ({
          repo: repo.name,
          branch: 'main',
          sha: c.sha.slice(0, 7),
          msg: c.commit.message.split('\n')[0],
          when: relativeTime(new Date(c.commit.author.date)),
          _date: new Date(c.commit.author.date).getTime(),
        }));
      } catch {
        return [];
      }
    })
  );

  return perRepo
    .flat()
    .sort((a, b) => b._date - a._date)
    .slice(0, count)
    .map(({ _date: _d, ...c }) => c);
}

function relativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
