import { Controller, Get, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller({
  path: 'tmdb',
  version: '1',
})
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('authentication')
  async getAuthentication() {
    return this.tmdbService.getAuthentication();
  }

  @Get('search/movie')
  async searchMovie(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    return this.tmdbService.searchMovie(query, page);
  }
}
