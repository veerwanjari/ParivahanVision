/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080B10',
        surface: '#10141C',
        surface2: '#161B25',
        hairline: 'rgba(244,246,248,0.08)',
        hairline2: 'rgba(244,246,248,0.14)',
        fog: '#8A93A3',
        mist: '#5C6577',
        paper: '#F4F6F8',
        amber: {
          DEFAULT: '#FFB020',
          soft: '#FFD180',
        },
        scan: {
          DEFAULT: '#4CC9F0',
          soft: '#9FE7FB',
        },
        violet: {
          DEFAULT: '#A78BFA',
        },
        alert: {
          DEFAULT: '#FB4141',
          soft: '#FF8A8A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.4vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.1rem, 3.4vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.2vw, 2.1rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(244,246,248,0.06) inset, 0 20px 60px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(76,201,240,0.25), 0 0 24px rgba(76,201,240,0.18)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(244,246,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,248,0.05) 1px, transparent 1px)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.25 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        blink: 'blink 1.6s var(--ease-in-out, ease-in-out) infinite',
        scanline: 'scanline 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
