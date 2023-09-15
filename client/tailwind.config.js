/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    colors: {
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      }
      // sky: {
      //   50: '#f0f9ff',
      //   100: '#e0f2fe',
      //   200: '#bae6fd',
      //   300: '#7dd3fc',
      //   400: '#38bdf8',
      //   500: '#0ea5e9',
      //   600: '#0284c7',
      //   700: '#0369a1',
      //   800: '#075985',
      //   900: '#0c4a6e'
      // },
      // primary: {
      //   50: '#eff6ff',
      //   100: '#dbeafe',
      //   200: '#bfdbfe',
      //   300: '#93c5fd',
      //   400: '#60a5fa',
      //   500: '#3b82f6',
      //   600: '#2563eb',
      //   700: '#1d4ed8',
      //   800: '#1e40af',
      //   900: '#1e3a8a',
      //   950: '#172554'
      // }
    },
    fontFamily: {
      default: [
        'Inter',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Helvetica Neue',
        'Noto Sans',
        'Liberation Sans',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    extend: {}
  },
  plugins: []
});
