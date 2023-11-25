/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('tailwindcss-animated'),
    require('tailwindcss-elevation')
  ],
  daisyui: {
    themes: ["light", "dark", "dim", "dark", "luxury", "synthwave", "forest", "black", "aqua", "cyberpunk"],
  },
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ['"Roboto Mono"', 'cursive']
      }
    }
  }
}
