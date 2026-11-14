// Fetches the GitHub contribution calendar for each year since the account was created and writes
// src/data/contributions.json. Runs before `astro build`.
//
// Token: GITHUB_TOKEN (env). Never fails the build: if the token is missing or the API errors, the committed
// snapshot is used as-is and a warning is logged.
import fs from 'node:fs';
import path from 'node:path';

const USER = 'sankalp-rajeev';
const OUT = path.resolve('src/data/contributions.json');
const warn = (m) => console.warn(`\n[contributions] WARNING: ${m}\n[contributions] Using the committed snapshot (src/data/contributions.json).\n`);

const token = process.env.GITHUB_TOKEN;
if (!token) {
  warn('GITHUB_TOKEN is not set.');
  process.exit(0);
}

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
const gql = async (query, variables) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'portfolio-build' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  return json.data;
};

try {
  const { user } = await gql('query($l:String!){ user(login:$l){ createdAt } }', { l: USER });
  const first = new Date(user.createdAt).getUTCFullYear();
  const last = new Date().getUTCFullYear();
  const q = `query($l:String!,$from:DateTime!,$to:DateTime!){ user(login:$l){ contributionsCollection(from:$from,to:$to){ contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount contributionLevel } } } } } }`;
  const years = [];
  for (let y = last; y >= first; y--) {
    const from = `${y}-01-01T00:00:00Z`;
    const to = y === last ? new Date().toISOString() : `${y}-12-31T23:59:59Z`;
    const d = await gql(q, { l: USER, from, to });
    const cal = d.user.contributionsCollection.contributionCalendar;
    // compact: each day is [date, count, level 0-4]
    const weeks = cal.weeks
      .map((w) => w.contributionDays.filter((day) => day.date.startsWith(String(y))).map((day) => [day.date, day.contributionCount, LEVELS[day.contributionLevel] ?? 0]))
      .filter((w) => w.length);
    years.push({ year: y, total: cal.totalContributions, weeks });
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ user: USER, generatedAt: new Date().toISOString().slice(0, 10), years }));
  console.log(`[contributions] Wrote ${years.length} year(s) for ${USER}: ${years.map((y) => `${y.year}=${y.total}`).join(', ')}`);
} catch (e) {
  warn(`Could not fetch contributions (${e.message}).`);
}
process.exit(0);
