/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium LUMEN Color Palette
        bg: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2d2d2d',
          card: '#1a1410',
          'card-hover': '#2d2416',
        },
        gold: {
          50: '#fef9e7',
          100: '#fdf3cf',
          200: '#fbe79f',
          300: '#f8db70',
          400: '#f6cf40',
          500: '#f4d03f',
          600: '#d4af37',
          700: '#c9a961',
          800: '#b8924f',
          900: '#947a3e',
        },
        luxe: {
          gold: '#d4af37',
          amber: '#c9a961',
          bronze: '#cd7f32',
          muted: '#b8924f',
        },
        slate: {
          DEFAULT: '#2d2d2d',
          light: '#404040',
          dark: '#1a1a1a',
        },
        // Semantic Colors
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#ef4444',
        info: '#60a5fa',
        // Legacy support
        cyan: {
          DEFAULT: '#00D9FF',
          dark: '#0EA5E9',
        },
        purple: {
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
        danger: '#EF4444',
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
          tertiary: '#737373',
          gold: '#d4af37',
        },
        glass: {
          bg: 'rgba(45, 45, 45, 0.6)',
          border: 'rgba(212, 175, 55, 0.2)',
          'border-light': 'rgba(212, 175, 55, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4.5rem)',
        'section': 'clamp(2rem, 4vw, 3rem)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
      },
      borderRadius: {
        'glass': '16px',
        'glass-lg': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-hover': '0 12px 48px rgba(0, 0, 0, 0.5)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.4)',
        'gold-glow-strong': '0 0 40px rgba(212, 175, 55, 0.6)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'slide-down': 'slideDown 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(2deg)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px) rotate(-2deg)' },
          '75%': { transform: 'translateY(-30px) translateX(5px) rotate(1deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #0a0a0a 0%, #2d2416 50%, #1a1410 100%)',
        'gradient-gold': 'linear-gradient(45deg, #d4af37, #f4d03f)',
        'gradient-card': 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)',
        'shimmer-gold': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
