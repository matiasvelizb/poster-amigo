import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SearchMovie } from '@interfaces/search-movie.interface';
import { SearchMovieQueryDto } from '@dtos/search-movie-query.dto';
import { PosterService } from 'src/poster/poster.service';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);

  private readonly apiUrl: string;
  private readonly token: string;
  private readonly imageUrl: string;
  private readonly imageSize: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly posterService: PosterService,
  ) {
    this.apiUrl = this.configService.get<string>('tmdb.apiUrl');
    this.token = this.configService.get<string>('tmdb.token');
    this.imageUrl = this.configService.get<string>('tmdb.imageUrl');
    this.imageSize = this.configService.get<string>('tmdb.imageSize');
  }

  private async makeGetRequest<T>(
    endpoint: string,
    params: any = {},
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, { headers, params }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error making GET request to ${url}`, error.stack);
      throw new Error(`Failed to fetch data from TMDB API: ${error.message}`);
    }
  }

  private buildPosterImageUrl(posterPath: string) {
    return `${this.imageUrl}/${this.imageSize}/${posterPath}`;
  }

  async searchMovie(
    searchMovieQuery: SearchMovieQueryDto,
  ): Promise<SearchMovie> {
    return this.makeGetRequest<SearchMovie>('/search/movie', {
      ...searchMovieQuery,
    });
  }

  async getMoviePoster(baseUrl: string, searchMovieQuery: SearchMovieQueryDto) {
    const { results } = await this.searchMovie(searchMovieQuery);
    if (results.length === 0) {
      throw new Error(
        `No movies found with the given title: ${searchMovieQuery.query}`,
      );
    }

    const { poster_path, id } = results[0];
    const posterUrl = this.buildPosterImageUrl(poster_path);
    const servingUrl = await this.posterService.downloadImage(posterUrl, id);

    return `${baseUrl}${servingUrl}`;
  }
}
