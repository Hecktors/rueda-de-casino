module.exports = {
  ignore: ['**/App.js', '**/*.test'],
  defaultExample: true,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: 'src/components/[A-Z]*.js',
  styles: {
    StyleGuide: {
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
        'background-color': '#16191d',
        margin: '20px',
      },
    },
  },
}
