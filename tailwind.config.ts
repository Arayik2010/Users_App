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
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        success_text: "#34BA59",
        modal_title: "#535454",
        delete_text: "#fff",
        cancel_text: "#000000"
        
      },
      backgroundColor: {
        delete_button: 'rgb(239 68 68)'
      }
    },
  },
  plugins: [],
}
export default config
