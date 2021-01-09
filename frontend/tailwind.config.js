module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem'
        }
      },
      backgroundColor: {
        DEFAULT: '#212121',
        highlight: '#4ADE80',
        muted: '#262626'
      },
      borderColor: {
        DEFAULT: '#808080',
        highlight: '#4ADE80'
      },
      fontFamily: {
        body: 'Roboto, sans-serif',
        logo: 'Anton, sans-serif'
      },
      gradientColorStops: {
        primary: '#4ADE80',
        secondary: '#3B82F6'
      },
      textColor: {
        highlight: '#4ADE80',
        DEFAULT: '#FAFAFA'
      }
    }
  },
  variants: {
    extend: {
      gridColumn: ['first'],
      height: ['first']
    }
  }
}
