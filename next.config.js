/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
  },
  images:{
    domains: [
      'lh3.googleusercontent.com', 
      'oaidalleapiprodscus.blob.core.windows.net',
      'world-of-ai-zburleastefan.vercel.app',
      'localhost',
      'firebasestorage.googleapis.com',
      'image.lexica.art',
      'replicate.delivery'
    ],
  },
  experimental: {
    appDir: true,
  }, 
};
