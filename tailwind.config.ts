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
      backgroundImage: {
        'primary-gradient': 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
        'primary-button-gradient': 'linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)'
      },
      padding: {
        '4.5': '1.1rem'
      }
    },
  },
  plugins: [],
}
export default config
