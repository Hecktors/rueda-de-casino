const path = require('path')

module.exports = {
  ignore: [
    '**/App.js',
    '**/*.test.js',
    '**/GlobalStyle.js',
    '**/components/Icons.js',
    '**/components/MessageOverlay.js',
    '**/components/BackgroundVideo.js',
    '**/components/YoutubeVideo.js',
  ],
  defaultExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: ['src/components/[A-Z]*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styles/StyleWrapper'),
  },
}
