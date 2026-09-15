import nextConfig from 'eslint-config-next'

const config = [
  ...nextConfig,
  {
    rules: {
      // This project intentionally uses plain <img> instead of next/image:
      // BlurImg implements a custom blurhash placeholder + IntersectionObserver
      // lazy-load, and photo URLs come from Unsplash's external domain.
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
