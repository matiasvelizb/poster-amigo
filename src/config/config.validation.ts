import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  TMDB_API_URL: Joi.string().uri().default('https://api.themoviedb.org/3'),
  TMDB_TOKEN: Joi.string().required(),
  TMDB_IMAGE_URL: Joi.string().uri().default('https://image.tmdb.org/t/p/'),
  TMDB_IMAGE_SIZE: Joi.string().default('w500'),
});
