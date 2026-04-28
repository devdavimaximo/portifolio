/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050508',
          secondary: '#0d0d14',
          tertiary: '#12121e',
        },
        border: {
          DEFAULT: '#1a1a2e',
          light: '#252540',
        },
        primary: {
          DEFAULT: '#7c3aed',
          light: '#9f6aff',
          dark: '#5b21b6',
        },
        accent: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9',
        },
        text: {
          DEFAULT: '#f8fafc',
          muted: '#64748b',
          subtle: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(124,58,237,0.25), 0 0 60px rgba(124,58,237,0.1)',
        'glow-purple-sm': '0 0 15px rgba(124,58,237,0.2)',
        'glow-cyan': '0 0 20px rgba(34,211,238,0.2)',
        'glow-cyan-sm': '0 0 10px rgba(34,211,238,0.15)',
      },
    },
  },
  plugins: [],
}
