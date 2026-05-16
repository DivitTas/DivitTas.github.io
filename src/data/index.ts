export const GAME = {
  codename: 'CAT-1',
  title: 'Catastrophe Cafe',
  tagline: 'Run a chaotic cat cafe with your friends. Try not to set anything on fire.',
  status: 'IN_DEVELOPMENT',
  classification: 'IMPERIAL ARCHIVE · UNRESTRICTED',
  version: 'v0.3.4',
  build: 'NIGHTLY · 2026.05.14',
  players: '2–4 · ONLINE CO-OP',
  engine: 'Unity',
  startedOn: '2025.09',
  longBlurb: 'You and up to three friends run a cat cafe on the wrong side of the galaxy. Customers want coffee. Cats want chaos. The fire extinguisher is in a slightly different place every shift. We are making the cooperative kitchen game we always wanted, with cats, and with very little dignity.',
  pitch: [
    'Real-time, 2–4 player online co-op',
    'Roughly 30 cats. Each one has opinions.',
    'Procedurally messy shifts: orders, latte art, rescues, fires',
    'A management meta-layer between shifts',
  ],
};

export interface ProjectTag {
  label: string;
  tone: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  year: string;
  thumb: number;
  blurb: string;
  tags: ProjectTag[];
  featured?: boolean;
  status: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'cat-cafe', code: 'A', title: 'Catastrophe Cafe', year: '2026', thumb: 0,
    blurb: 'A chaotic 2–4 player co-op cafe management game. Cats included. My main project — see the devlog for monthly progress.',
    tags: [{ label: 'Unity', tone: 'helios' }, { label: 'Co-op', tone: 'signal' }, { label: 'In progress', tone: 'quantum' }],
    featured: true, status: 'IN_DEV',
  },
  {
    id: 'agneepath', code: 'B', title: 'Agneepath', year: '2025', thumb: 2,
    blurb: 'A 2D platformer built and shipped in roughly 24 hours. Hand-tuned physics, one boss, no regrets.',
    tags: [{ label: '24h jam', tone: 'helios' }, { label: '2D', tone: 'quantum' }, { label: 'Shipped', tone: 'signal' }],
    status: 'SHIPPED',
  },
  {
    id: 'sol-4', code: 'C', title: 'SOL-4', year: '2024', thumb: 0,
    blurb: 'Browser solar-system simulator. A side experiment in orbital mechanics.',
    tags: [{ label: 'WebGL', tone: 'helios' }, { label: 'TypeScript', tone: 'quantum' }],
    status: 'ARCHIVED',
  },
  {
    id: 'orbit-cli', code: 'D', title: 'orbit-cli', year: '2024', thumb: 3,
    blurb: 'A small CLI that predicts satellite passes from your terminal.',
    tags: [{ label: 'CLI', tone: 'helios' }, { label: 'Rust', tone: 'quantum' }],
    status: 'ARCHIVED',
  },
];

export interface DevlogEntry {
  id: string;
  num: string;
  date: string;
  minutes: number;
  title: string;
  summary: string;
  tags: string[];
  weekOf: string;
}

export const DEVLOG: DevlogEntry[] = [
  { id: 'dl-008', num: '008', date: '2026.05.10', minutes: 7,
    title: 'Cat pathfinding, take four',
    summary: 'Three rewrites in, the cats finally walk around the espresso machine instead of through it. Here\'s the navmesh trick I should have used in March.',
    tags: ['AI', 'tech'], weekOf: 'WEEK 47' },
  { id: 'dl-007', num: '007', date: '2026.04.18', minutes: 5,
    title: 'Network sync for soup',
    summary: 'When two players grab the same bowl across 80ms of latency, who wins? A short note on authoritative kitchens.',
    tags: ['netcode', 'co-op'], weekOf: 'WEEK 44' },
  { id: 'dl-006', num: '006', date: '2026.03.22', minutes: 9,
    title: 'On chaos that is not punishing',
    summary: 'Playtests said the kitchen felt mean. The mechanics didn\'t change. The feedback did. A field report on game-feel.',
    tags: ['design', 'playtest'], weekOf: 'WEEK 40' },
  { id: 'dl-005', num: '005', date: '2026.03.01', minutes: 6,
    title: '30 cats, 30 personalities, one save file',
    summary: 'Designing cats as small state machines. Plus, why one of them refuses to drink from a bowl.',
    tags: ['design', 'cats'], weekOf: 'WEEK 37' },
  { id: 'dl-004', num: '004', date: '2026.02.10', minutes: 4,
    title: 'Latte art with a particle system',
    summary: 'You can make a passable rosetta with eight particles and a curve. Here is the curve.',
    tags: ['art', 'tech'], weekOf: 'WEEK 33' },
  { id: 'dl-003', num: '003', date: '2026.01.20', minutes: 8,
    title: 'Switching the prototype from Godot to Unity',
    summary: 'I love Godot. I also needed multiplayer to just work. The unsentimental version of that decision.',
    tags: ['tech', 'tools'], weekOf: 'WEEK 30' },
  { id: 'dl-002', num: '002', date: '2025.12.30', minutes: 3,
    title: 'Three months in — what the game is now',
    summary: 'A short year-end checkpoint. Things I expected. Things I didn\'t.',
    tags: ['retro'], weekOf: 'WEEK 26' },
  { id: 'dl-001', num: '001', date: '2025.09.18', minutes: 4,
    title: 'Why a cat cafe',
    summary: 'The pitch document, lightly cleaned up. Cats. Friends. Mild incompetence.',
    tags: ['origin'], weekOf: 'WEEK 12' },
];

export interface Note {
  id: string;
  date: string;
  minutes: number;
  title: string;
  summary: string;
}

export const NOTES: Note[] = [
  { id: 'n-02', date: '2026.04.02', minutes: 6, title: 'On the texture of mission paper',
    summary: 'Why every interface I love has the same faint warmth — and what dark UIs miss when they reach for pure white.' },
  { id: 'n-01', date: '2025.11.11', minutes: 8, title: 'Shipping in 24 hours',
    summary: 'What I learned scoping, cutting, and finishing Agneepath in a day. The honest version.' },
];

export interface Commit {
  repo: string;
  branch: string;
  sha: string;
  msg: string;
  when: string;
}

export const COMMITS: Commit[] = [
  { repo: 'catastrophe-cafe', branch: 'main',    sha: 'a8c2f91', msg: 'fix: cats no longer phase through espresso machine', when: '2h' },
  { repo: 'catastrophe-cafe', branch: 'main',    sha: '7e10dc3', msg: 'feat: rosetta latte art curve, v2',                  when: '9h' },
  { repo: 'catastrophe-cafe', branch: 'netcode', sha: '3091b22', msg: 'wip: authoritative bowl handoff',                    when: '1d' },
  { repo: 'agneepath',        branch: 'main',    sha: 'fa5012b', msg: 'chore: itch.io build tag v1.0.1',                    when: '3d' },
  { repo: 'divits-world',     branch: 'main',    sha: '0bdc7e8', msg: 'site: add devlog 008',                               when: '4d' },
  { repo: 'catastrophe-cafe', branch: 'main',    sha: 'c1d72aa', msg: 'design: 4 new cat archetypes',                       when: '6d' },
];

export const CONTACT = {
  email: 'divit.nt@gmail.com',
  github: { handle: 'DivitTas', url: 'https://github.com/DivitTas' },
  linkedin: { handle: 'divit-tasgaonkar', url: 'https://www.linkedin.com/in/divit-tasgaonkar/' },
};
