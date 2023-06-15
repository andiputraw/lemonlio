/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./routes/**/*.{tsx,ts}",
    "./islands/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "markdown-body": "#2a303c",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#111827",

          "secondary": "#f3f4f6",

          "accent": "#1FB2A5",

          "neutral": "#191D24",

          "base-100": "#2A303C",

          "info": "#67e8f9",

          "success": "#84cc16",

          "warning": "#fef08a",

          "error": "#be123c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
