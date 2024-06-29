import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly apiUrl = 'https://api.themoviedb.org/3';
  private readonly token: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.token = this.configService.get<string>('TMDB_ACCESS_TOKEN');
  }

  private async makeGetRequest(endpoint: string, params: any = {}) {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, params }),
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  async getAuthentication() {
    return this.makeGetRequest('/authentication');
  }

  async searchMovie(query: string, page: number = 1) {
    return this.makeGetRequest('/search/movie', { query, page });
  }
}
