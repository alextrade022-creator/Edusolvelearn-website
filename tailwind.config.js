/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d20321',
          'red-dark': '#a80019',
          green: '#a7c957',
          'green-light': '#b7d76a',
          'green-dark': '#4a8a1f',
          ink: '#161a1d',
        },
        whatsapp: '#25d366',
        // Neutral / surface tones lifted from the original design
        surface: {
          mint: '#f7f9f2',
          leaf: '#f4f7ec',
          blush: '#fdeef0',
        },
        body: '#3f474c',
        muted: '#8b9298',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(22,26,29,.05)',
        'card-lg': '0 18px 40px rgba(22,26,29,.1)',
        cta: '0 10px 24px rgba(210,3,33,.3)',
      },
      keyframes: {
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,.55)' },
          '70%': { boxShadow: '0 0 0 16px rgba(37,211,102,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'pulse-ring': 'pulseRing 2.4s infinite',
        marquee: 'marquee 55s linear infinite',
        'fade-up': 'fadeUp .6s ease-out both',
      },
    },
  },
  plugins: [],
};
