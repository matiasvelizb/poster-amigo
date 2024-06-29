import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SearchMovie } from '@interfaces/search-movie.interface';
import { SearchMovieQueryDto } from '@dtos/search-movie-query.dto';

@Injectable()
export class TmdbService {
  private readonly apiUrl: string;
  private readonly token: string;
  private readonly logger = new Logger(TmdbService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('tmdb.apiUrl');
    this.token = this.configService.get<string>('tmdb.token');
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

  async searchMovie(
    searchMovieQuery: SearchMovieQueryDto,
  ): Promise<SearchMovie> {
    return this.makeGetRequest<SearchMovie>('/search/movie', {
      ...searchMovieQuery,
    });
  }
}
