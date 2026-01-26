/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind disabled due to CSS generation bug
    // tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
