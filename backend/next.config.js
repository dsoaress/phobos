module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' }
    }
    return config
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
    domains: ['images.unsplash.com', 'res.cloudinary.com']
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en'
  }
}
