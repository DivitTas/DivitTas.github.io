import { useState } from 'react';

interface DevlogEntry {
  id: string;
  num: string;
  date: string;
  minutes: number;
  title: string;
  summary: string;
  tags: string[];
  weekOf?: string;
}

interface Props {
  entries: DevlogEntry[];
}

type ViewMode = 'cards' | 'timeline' | 'terminal';

export default function DevlogHub({ entries }: Props) {
  const [view, setView] = useState<ViewMode>('cards');

  return (
    <div>
      {/* View toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, marginBottom: 24, alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)' }}>
          ENTRIES
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--star)' }}>
            {entries.length} mission-log entries · most recent first
          </h2>
          <div style={{ display: 'flex', gap: 10 }}>
            {(['cards', 'timeline', 'terminal'] as ViewMode[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: view === v ? 'var(--helios)' : 'var(--star-faint)',
                  background: 'none',
                  border: 'none',
                  borderBottom: view === v ? '1px dotted var(--helios)' : '1px dotted transparent',
                  cursor: 'pointer',
                  paddingBottom: 1,
                  transition: 'color 140ms ease',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Entries body */}
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24 }}>
        <div />
        <div>
          {view === 'cards' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              {entries.map(e => <CardView key={e.id} entry={e} />)}
            </div>
          )}
          {view === 'terminal' && <TerminalView entries={entries} />}
          {view === 'timeline' && (
            <div>
              {entries.map(e => <TimelineView key={e.id} entry={e} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardView({ entry: e }: { entry: DevlogEntry }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`/devlog/${e.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderBottom: 'none',
        borderRadius: 10,
        background: 'var(--deep-space)',
        padding: '20px 22px',
        boxShadow: hover
          ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px color-mix(in oklab, var(--star) 18%, transparent)'
          : 'var(--shadow-card)',
        transition: 'box-shadow 220ms ease',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--helios)' }}>
          DEVLOG.{e.num}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)', whiteSpace: 'nowrap' }}>
          {e.date} · {e.weekOf}
        </span>
      </div>
      <h3 style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, letterSpacing: '-0.012em', color: hover ? 'var(--helios)' : 'var(--star)', transition: 'color 140ms ease' }}>
        {e.title}
      </h3>
      <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--star-dim)' }}>{e.summary}</p>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {e.tags.map(t => (
            <span key={t} style={{ display: 'inline-flex', padding: '3px 8px', borderRadius: 4, background: 'var(--orbit)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-mute)' }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: hover ? 'var(--helios)' : 'var(--star-faint)', transition: 'color 140ms ease' }}>
          {e.minutes} MIN ↗
        </span>
      </div>
    </a>
  );
}

function TimelineView({ entry: e }: { entry: DevlogEntry }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`/devlog/${e.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 24px 1fr auto',
        gap: 16,
        alignItems: 'baseline',
        padding: '20px 0',
        borderBottom: '1px dashed var(--rule)',
        textDecoration: 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        color: 'inherit',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)' }}>
        {e.date}
      </span>
      <div style={{ position: 'relative' }}>
        <span style={{
          display: 'block',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: hover ? 'var(--helios)' : 'var(--star-faint)',
          boxShadow: hover ? '0 0 0 4px color-mix(in oklab, var(--helios) 30%, transparent)' : 'none',
          marginTop: 6,
        }} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--helios)' }}>DEVLOG.{e.num}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--star-faint)' }}>· {e.tags.join(' · ')}</span>
        </div>
        <div style={{ marginTop: 4, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: hover ? 'var(--helios)' : 'var(--star)', transition: 'color 140ms ease' }}>
          {e.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: 'var(--star-mute)', lineHeight: 1.55 }}>{e.summary}</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: hover ? 'var(--helios)' : 'var(--star-faint)', transition: 'color 140ms ease', whiteSpace: 'nowrap' }}>
        {e.minutes} MIN ↗
      </span>
    </a>
  );
}

function TerminalView({ entries }: { entries: DevlogEntry[] }) {
  return (
    <div style={{
      border: '1px solid var(--hairline)',
      borderRadius: 10,
      background: '#03050a',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.65,
      padding: '18px 22px',
      color: 'var(--star-dim)',
    }}>
      <div style={{ color: 'var(--signal)', marginBottom: 14 }}>
        <span style={{ color: 'var(--star-mute)' }}>$</span> devlog --list --project=CAT-1 --order=desc
      </div>
      {entries.map(e => (
        <div key={e.id} style={{ marginBottom: 10 }}>
          <div>
            <span style={{ color: 'var(--star-faint)' }}>[{e.date}]</span>
            {' '}
            <span style={{ color: 'var(--helios)' }}>devlog.{e.num}</span>
            {' '}
            <a href={`/devlog/${e.id}`} style={{ color: 'var(--star)', borderBottom: '1px dotted var(--star-mute)', textDecoration: 'none' }}>
              {e.title}
            </a>
            {' '}
            <span style={{ color: 'var(--star-faint)' }}>· {e.minutes}m · [{e.tags.join(',')}]</span>
          </div>
          <div style={{ paddingLeft: 28, color: 'var(--star-mute)' }}>↳ {e.summary}</div>
        </div>
      ))}
      <div style={{ marginTop: 14, color: 'var(--signal)' }}>
        <span style={{ color: 'var(--star-mute)' }}>$</span>{' '}
        <span style={{ animation: 'divit-blink 1s steps(1,end) infinite' }}>█</span>
      </div>
    </div>
  );
}
