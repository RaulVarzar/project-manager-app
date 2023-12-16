module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
        '103': '1.03',
        '98': '0.98'
      },
      height:{
        'svh':'100svh'
      },
      screens: { // remove hover on mobile
        'betterhover': {'raw': '(hover: hover)'},
    },
    fontFamily: {
      'roboto-mono': ['"Roboto Mono"', 'cursive'],
      'press-start': ['"Press Start 2P"', 'cursive'],
    },
    }
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "secondary": "#747fff",
          "neutral": "#0d0f12",
          "info-content": "#0F1115",
          "base-300": "#111418",
        },
        aqua: {
          ...require("daisyui/src/theming/themes")["aqua"],
          "info-content": "#234076",
          "neutral": "#357db1"
        },
        nord: {
          ...require("daisyui/src/theming/themes")["nord"],
          "base-300": "#bec8da",
          "neutral":"#606d85",
          "info-content": "#a6b8c9"
        },
        coffee: {
          ...require("daisyui/src/theming/themes")["coffee"],
          "info-content":"#120c12"
        },
      },
      "autumn","nord","lofi", "dark", "aqua", "coffee"],
  },
}