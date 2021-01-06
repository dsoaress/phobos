module.exports = {
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
}
