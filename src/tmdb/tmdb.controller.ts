import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TmdbService } from './tmdb.service';
import { SearchMovieQueryDto } from '@dtos/search-movie-query.dto';

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

  @ApiOperation({
    summary:
      'Returns a movie poster by searching for their original, translated and alternative titles.',
  })
  @Get('search/poster')
  async getMoviePoster(
    @Req() request: Request,
    @Query() searchMovieQuery: SearchMovieQueryDto,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    return this.tmdbService.getMoviePoster(baseUrl, searchMovieQuery);
  }
}
