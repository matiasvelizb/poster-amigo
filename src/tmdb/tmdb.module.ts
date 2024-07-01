import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TmdbController } from './tmdb.controller';
import { TmdbService } from './tmdb.service';
import { PosterModule } from 'src/poster/poster.module';

@Module({
  imports: [HttpModule, PosterModule],
  controllers: [TmdbController],
  providers: [TmdbService],
})
export class TmdbModule {}
