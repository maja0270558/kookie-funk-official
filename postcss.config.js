module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(true ? { cssnano: { preset: 'default',} } : {})
  },
}
