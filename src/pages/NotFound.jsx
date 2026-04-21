import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        background: '#faf9f7',
        gap: 16,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&family=DM+Serif+Display&display=swap');`}</style>
      <span style={{ fontSize: 13, color: '#ccc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>404</span>
      <h1 style={{
        fontSize: 28,
        fontWeight: 400,
        color: '#0d0d0d',
        letterSpacing: '-0.03em',
        fontFamily: "'DM Serif Display', serif",
      }}>
        Page not found
      </h1>
      <Link
        to="/"
        style={{
          marginTop: 8,
          fontSize: 13,
          color: '#999',
          letterSpacing: '-0.01em',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          paddingBottom: 1,
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#111')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
      >
        ← Back home
      </Link>
    </div>
  )
}