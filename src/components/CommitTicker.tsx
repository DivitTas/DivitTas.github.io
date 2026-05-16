import { useState, useEffect } from 'react';
import type { Commit } from '../data/index';

interface Props {
  commits: Commit[];
}

export default function CommitTicker({ commits }: Props) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % commits.length);
        setVisible(true);
      }, 160);
    }, 3200);
    return () => clearInterval(t);
  }, [commits.length, prefersReduced]);

  const c = commits[idx];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto 1fr auto auto',
        alignItems: 'center',
        gap: 14,
        padding: '10px 16px',
        border: '1px solid var(--hairline)',
        borderRadius: 8,
        background: 'var(--deep-space)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        overflow: 'hidden',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--signal)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 10 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--signal)', animation: 'divit-pulse 1.6s infinite', flexShrink: 0 }} />
        LIVE
      </span>

      <span style={{ color: 'var(--star-mute)', whiteSpace: 'nowrap' }}>
        git/{c.repo}
      </span>

      <span
        style={{
          color: 'var(--star)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 160ms ease, transform 160ms ease',
        }}
      >
        <span style={{ color: 'var(--helios)' }}>{c.sha}</span>
        {' '}
        <span style={{ color: 'var(--star-mute)' }}>· {c.branch} ·</span>
        {' '}{c.msg}
      </span>

      <span style={{ color: 'var(--star-faint)', whiteSpace: 'nowrap' }}>{c.when} ago</span>

      <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {commits.map((_, i) => (
          <span
            key={i}
            style={{
              width: 14,
              height: 2,
              background: i === idx ? 'var(--helios)' : 'var(--star-faint)',
              transition: 'background 240ms ease',
            }}
          />
        ))}
      </span>
    </div>
  );
}
