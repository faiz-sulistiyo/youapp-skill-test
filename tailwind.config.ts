import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-down': 'fadeDown 500ms ease-in-out',
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: "0", transform: 'translateY(-50px)' },
          '100%': { opacity: "1", transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'primary-gradient': 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
        'primary-button-gradient': 'linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)',
        'gradient-gold': 'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
        'gradient-blue': 'linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)'
      },
      colors: {
        'primary-1':'#09141A',
        'primary-2': '#162329',
        'primary-3':'#0E191F',
        'gray-4': '#5e6569'
      },
      padding: {
        '4.5': '1.125rem'
      },
      gap: {
        '4.5': '1.125rem'
      }
    },
  },
  plugins: [],
}
export default config
