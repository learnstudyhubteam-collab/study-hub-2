import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          DEFAULT: '#0066FF',
          dark: '#004FCC',
          light: '#4D94FF',
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#B8D0FF',
          300: '#8AB4FF',
          400: '#5C99FF',
          500: '#2E7EFF',
          600: '#0066FF',
          700: '#004FCC',
          800: '#003899',
          900: '#002266',
        },
        brand: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#B8D0FF',
          500: '#2E7EFF',
          600: '#0066FF',
          700: '#004FCC',
          800: '#003899',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-ring': 'pulseRingOut 2s ease-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'liquid': 'liquidBlob 20s ease-in-out infinite',
        'liquid-alt': 'liquidBlobAlt 25s ease-in-out infinite',
        'liquid-slow': 'liquidBlobSlow 38s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 1.4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'orbit': 'orbitGlow 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          to: { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,102,255,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(0,102,255,0)' },
        },
        liquidBlob: {
          '0%, 100%': {
            borderRadius: '50%',
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            borderRadius: '44% 56% 54% 46% / 48% 44% 56% 52%',
            transform: 'translate(40px, -40px) scale(1.06)',
          },
          '50%': {
            borderRadius: '58% 42% 42% 58% / 52% 58% 42% 48%',
            transform: 'translate(-30px, 30px) scale(0.94)',
          },
          '75%': {
            borderRadius: '52% 48% 56% 44% / 44% 52% 48% 56%',
            transform: 'translate(20px, 10px) scale(1.03)',
          },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseRingOut: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'electric-gradient': 'linear-gradient(135deg, #1a7aff 0%, #0057e8 50%, #0040cc 100%)',
        'electric-gradient-light': 'linear-gradient(135deg, #4D94FF 0%, #0066FF 100%)',
        'glass-shine': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
      },
      boxShadow: {
        electric: '0 4px 15px rgba(0, 102, 255, 0.35)',
        'electric-lg': '0 8px 25px rgba(0, 102, 255, 0.45)',
        'electric-xl': '0 16px 40px rgba(0, 102, 255, 0.5)',
        glass: '0 8px 32px rgba(0, 102, 255, 0.06), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)',
        'glass-hover': '0 16px 48px rgba(0, 102, 255, 0.1), 0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
        'glass-blue': '0 8px 32px rgba(0, 102, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
}

export default config
