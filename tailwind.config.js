/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        array: {
          bg: '#EADFFF',
          grid: '#795ADF',
          purple: '#2A107E',
          purpleMuted: '#795ADF',
          green: '#52EE9B',
          red: '#FF625A',
          cyan: '#02BACE',
          yellow: '#FBBD00',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
}

