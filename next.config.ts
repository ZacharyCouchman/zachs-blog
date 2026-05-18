import {type NextConfig} from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // If hosted at https://username.github.io/repo-name/
  basePath: process.env.NODE_ENV === 'production' ? '/zachs-blog' : '',
  trailingSlash: true, // GitHub Pages prefers this
};

module.exports = nextConfig;