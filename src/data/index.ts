export const GAME = {
  codename: 'CAT-1',
  title: 'Catastrophe Cafe',
  tagline: 'Run a cat cafe with your friends. Try not to let the cats win.',
  status: 'IN_DEVELOPMENT',
  classification: 'IMPERIAL ARCHIVE · UNRESTRICTED',
  version: 'v0.1',
  build: 'WIP · 2025.09',
  players: '2–4 · ONLINE CO-OP',
  engine: 'Unity',
  startedOn: '2025.09',
  longBlurb: 'You and your friends are running a cat cafe. Serve customers, manage the cats, keep things from falling apart. It sounds fine until the orange cats show up.',
  pitch: [
    '2–4 player online co-op',
    'A cat cafe that gets chaotic fast',
    'Cats with their own needs and zero respect for yours',
    'Built with friends, for friends',
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
    id: 'cat-cafe', code: 'A', title: 'Catastrophe Cafe', year: '2025', thumb: 0,
    blurb: 'A 2–4 player co-op game about running a cat cafe. Serve customers, manage the cats, try to keep things together.',
    tags: [{ label: 'Unity', tone: 'helios' }, { label: 'Co-op', tone: 'signal' }, { label: 'In progress', tone: 'quantum' }],
    featured: true, status: 'IN_DEV',
  },
  {
    id: 'agneepath', code: 'B', title: 'Agneepath', year: '2025', thumb: 2,
    blurb: 'A 2D platformer built and shipped in roughly 24 hours. Hand-tuned physics, one boss, no regrets.',
    tags: [{ label: '24h jam', tone: 'helios' }, { label: '2D', tone: 'quantum' }, { label: 'Shipped', tone: 'signal' }],
    status: 'SHIPPED',
  },
];


export interface Note {
  id: string;
  date: string;
  minutes: number;
  title: string;
  summary: string;
}

export const NOTES: Note[] = [];

export interface Commit {
  repo: string;
  branch: string;
  sha: string;
  msg: string;
  when: string;
}

export const COMMITS: Commit[] = [
  { repo: 'catastrophe-cafe', branch: 'main', sha: 'a8c2f91', msg: 'init: project setup',         when: '2d' },
  { repo: 'catastrophe-cafe', branch: 'main', sha: '7e10dc3', msg: 'feat: basic scene and camera', when: '2d' },
  { repo: 'catastrophe-cafe', branch: 'main', sha: '3091b22', msg: 'feat: player movement',        when: '3d' },
  { repo: 'divits-world',     branch: 'main', sha: 'fa5012b', msg: 'site: launch',                 when: '1d' },
  { repo: 'agneepath',        branch: 'main', sha: '0bdc7e8', msg: 'chore: itch.io build',          when: '5d' },
  { repo: 'catastrophe-cafe', branch: 'main', sha: 'c1d72aa', msg: 'wip: cat placeholder model',   when: '1d' },
];

export const CONTACT = {
  email: 'divit.nt@gmail.com',
  github: { handle: 'DivitTas', url: 'https://github.com/DivitTas' },
  linkedin: { handle: 'divit-tasgaonkar', url: 'https://www.linkedin.com/in/divit-tasgaonkar/' },
};
