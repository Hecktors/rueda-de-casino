const path = require('path')

module.exports = {
  ignore: [
    '**/App.js',
    '**/*.test.js',
    '**/app/buttons/Buttons/Button.js',
    'src/app/buttons/IconButtons/IconButton.js',
    'src/app/buttons/Buttons/Button.js',
    '**/GlobalStyle.js',
    '**/components/MessageOverlay.js',
    '**/components/BackgroundVideo.js',
    '**/components/YoutubeVideo.js',
    'src/app/Icons/*.js',
  ],
  defaultExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: ['src/app/buttons/[A-Z]*/[A-Z]*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styles/StyleWrapper'),
  },
}
