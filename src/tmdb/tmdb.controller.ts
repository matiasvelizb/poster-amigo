import { Controller, Get, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { SearchMovieQueryDto } from '@dtos/search-movie-query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tmdb')
@ApiBearerAuth()
@Controller({
  version: '1',
})
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @ApiOperation({
    summary:
      'Search for movies by their original, translated and alternative titles.',
  })
  @Get('search/movie')
  async searchMovie(@Query() searchMovieQuery: SearchMovieQueryDto) {
    return this.tmdbService.searchMovie(searchMovieQuery);
  }
}
