export default function StatusCapsule() {
  return (
    <div
      aria-label="Status: Transmitting from Mumbai"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 40,
        padding: '10px 14px',
        borderRadius: 9999,
        background: 'color-mix(in oklab, var(--deep-space) 90%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--hairline)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: 'var(--star)',
        boxShadow: 'var(--shadow-pop)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'var(--plasma)',
          animation: 'divit-pulse 1.6s infinite',
          flexShrink: 0,
        }}
      />
      Status · Transmitting from Mumbai
    </div>
  );
}
