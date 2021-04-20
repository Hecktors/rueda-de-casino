const path = require('path')

module.exports = {
  ignore: [
    'src/App.js',
    '**/**/components/GlobalStyle.js',
    '**/**/components/Overlay.js',
    '**/**/BackgroundVideo.js',
    '**/**/YoutubeVideo.js',
    '**/*.test.js',
  ],
  defaultExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: [
    'src/components/buttons/[A-Z]*/[A-Z]*s.js',
    'src/components/ErrorMsg/[A-Z]*.js',
    'src/components/Navigation/[A-Z]*.js',
    'src/home/InputLevel/[A-Z]*.js',
    'src/settings/InputPlaySong/[A-Z]*.js',
    'src/settings/InputRunThroughSelection/[A-Z]*.js',
    'src/settings/InputSongSpeed/[A-Z]*.js',
    'src/session/CurrentMove/[A-Z]*.js',
    'src/session/SelectedMoveList/[A-Z]*.js',
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styles/StyleWrapper'),
  },
}
