import { registerAs } from '@nestjs/config';

export default registerAs('tmdb', () => ({
  apiUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3',
  token: process.env.TMDB_TOKEN,
  imageUrl: process.env.TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/',
  imageSize: process.env.TMDB_IMAGE_SIZE || 'w500',
}));
