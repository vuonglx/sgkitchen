import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5bb55b',
          500: '#3a9a3a',
          600: '#2d7d2d',
          700: '#256325',
          800: '#1f4f1f',
          900: '#1a421a',
        },
        secondary: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4ddb2',
          300: '#ecc481',
          400: '#e3a54e',
          500: '#dc8b2a',
          600: '#cd7220',
          700: '#ab571c',
          800: '#89461d',
          900: '#6f3a1a',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdecd9',
          200: '#fad5b2',
          300: '#f6b881',
          400: '#f1934e',
          500: '#ed7328',
          600: '#de571e',
          700: '#b8431a',
          800: '#93371b',
          900: '#762f19',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'pt-sans': ['PT Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
