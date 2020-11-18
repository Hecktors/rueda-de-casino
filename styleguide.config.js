module.exports = {
  ignore: ['**/App.js', '**/*.test'],
  defaultExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: 'src/components/[A-Z]*.js',
  styles: {
    StyleGuide: {
      '@global :root': {
        '--primery-color': '#121212',
        '--text-color': 'e5e5e5',
        '--running-header-color': '#e5e5e5',
        '--default-heder-color': 'e5e5e5',
        '--main-button-color': 'transparent',
        '--icon-color': '#e5e5e5',
      },
      '@global *': {
        'box-sizing': 'border-box',
        margin: 0,
      },
      '@global body': {
        'font-family': 'Helvetica',
        'font-size': '112.5%',
        color: '#e5e5e5',
      },
      '@global button': {
        padding: 0,
        cursor: 'pointer',
        'background-color': 'transparent',
      },
    },
  },
}
