/****
 * Tailwind configuration for IdeaChain frontend.
 */
import defaultTheme from 'tailwindcss/defaultTheme';
import animatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        secondary: {
          50: '#f2fbfa',
          100: '#cbf4ee',
          200: '#99eadf',
          300: '#63d9cb',
          400: '#32c0af',
          500: '#14a896',
          600: '#0c887c',
          700: '#0b6b64',
          800: '#0d564f',
          900: '#0b4743'
        },
        midnight: '#0f172a',
        surface: 'rgba(15, 23, 42, 0.6)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at top, rgba(139, 92, 246, 0.25), transparent 65%)',
        mesh: 'radial-gradient(at 20% 20%, rgba(139, 92, 246, 0.35) 0px, transparent 60%), radial-gradient(at 80% 40%, rgba(14, 165, 233, 0.35) 0px, transparent 55%), radial-gradient(at 50% 80%, rgba(16, 185, 129, 0.25) 0px, transparent 50%)'
      },
      boxShadow: {
        glass: '0 16px 50px -25px rgba(139, 92, 246, 0.65)',
        glow: '0 0 40px rgba(14, 165, 233, 0.35)',
        elevated: '0 20px 45px -20px rgba(15, 23, 42, 0.55)'
      },
      dropShadow: {
        glow: '0 0 15px rgba(99, 102, 241, 0.45)'
      },
      borderRadius: {
        xl: '1.25rem',
        '3xl': '1.75rem'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.01)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards'
      }
    }
  },
  plugins: [animatePlugin]
};
