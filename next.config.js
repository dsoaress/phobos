const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
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
