import { Controller, Get, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { SearchMovieQueryDto } from '@dtos/search-movie-query.dto';

@Controller({
  path: 'tmdb',
  version: '1',
})
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('search/movie')
  async searchMovie(@Query() query: SearchMovieQueryDto) {
    const { query: searchQuery, page } = query;
    return this.tmdbService.searchMovie(searchQuery, page);
  }
}
