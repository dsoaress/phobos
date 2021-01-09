const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: prod ? false : true,
    dest: 'public'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true
      }
    ]
  },
  images: {
    domains: ['images.unsplash.com']
  }
})
