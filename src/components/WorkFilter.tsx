import { useState } from 'react';
import type { Project } from '../data/index';

interface Props {
  projects: Project[];
}

const FILTERS = ['All', 'Games', 'Tools', 'Shipped', 'In dev'] as const;

function filterProjects(projects: Project[], filter: string) {
  if (filter === 'All') return projects;
  if (filter === 'Games') return projects.filter(p => p.tags.some(t => ['Co-op', '2D', 'Game'].includes(t.label)));
  if (filter === 'Tools') return projects.filter(p => p.tags.some(t => ['CLI', 'WebGL', 'TypeScript'].includes(t.label)));
  if (filter === 'Shipped') return projects.filter(p => p.status === 'SHIPPED' || p.status === 'ARCHIVED');
  if (filter === 'In dev') return projects.filter(p => p.status === 'IN_DEV');
  return projects;
}

const toneMap: Record<string, string> = {
  helios: 'var(--helios)',
  signal: 'var(--signal)',
  quantum: 'var(--quantum)',
};
const badgeBgMap: Record<string, string> = {
  helios: 'color-mix(in oklab, var(--helios) 14%, transparent)',
  signal: 'rgba(109,255,174,0.12)',
  quantum: 'rgba(94,228,255,0.12)',
};

export default function WorkFilter({ projects }: Props) {
  const [filter, setFilter] = useState('All');
  const visible = filterProjects(projects, filter);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24 }}>
      <div>
        <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)', marginBottom: 8 }}>
          FILTER
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FILTERS.map(f => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 13,
                  color: active ? 'var(--star)' : 'var(--star-mute)',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '1px dotted var(--helios)' : '1px dotted transparent',
                  paddingBottom: 1,
                  cursor: 'pointer',
                  width: 'fit-content',
                  textAlign: 'left',
                  padding: '0 0 1px 0',
                  fontFamily: 'inherit',
                  transition: 'color 140ms ease',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, alignContent: 'start' }}>
        {visible.map((p, i) => {
          const statusColor = p.status === 'IN_DEV' ? 'var(--helios)' : p.status === 'SHIPPED' ? 'var(--signal)' : 'var(--star-faint)';
          return (
            <a
              key={p.id}
              href={`/work/${p.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                borderBottom: 'none',
                borderRadius: 10,
                background: 'var(--deep-space)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
                color: 'inherit',
                transition: 'box-shadow 220ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px color-mix(in oklab, var(--star) 18%, transparent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; }}
            >
              <div style={{ aspectRatio: '16/9', borderBottom: '1px solid var(--hairline)', position: 'relative', background: 'var(--nebula)' }}>
                <span style={{ position: 'absolute', top: 10, left: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)' }}>
                  {String(i + 1).padStart(2, '0')}.{p.code}
                </span>
                <span style={{ position: 'absolute', top: 10, right: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: statusColor }}>
                  {p.status.replace('_', ' ')}
                </span>
              </div>
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--star)' }}>{p.title}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)', whiteSpace: 'nowrap' }}>{p.year}</span>
                </div>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'var(--star-dim)' }}>{p.blurb}</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--rule)', flexWrap: 'wrap' }}>
                  {p.tags.map(t => (
                    <span key={t.label} style={{ display: 'inline-flex', padding: '3px 8px', borderRadius: 4, background: badgeBgMap[t.tone] || 'var(--orbit)', color: toneMap[t.tone] || 'var(--star-mute)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
