import postcssPlugin from 'postcss'

/** Custom plugin to remove malformed directionality selectors */
const stripDirectionalityPlugin = {
  postcssPlugin: 'strip-directionality',
  Once(root) {
    root.walkRules(rule => {
      if (rule.selector.includes(':where(:dir(')) {
        rule.remove()
      }
    })
  },
}
stripDirectionalityPlugin.postcss = true

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    [stripDirectionalityPlugin.postcssPlugin]: stripDirectionalityPlugin,
  },
}

export default config
