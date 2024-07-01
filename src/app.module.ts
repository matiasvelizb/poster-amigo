import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { configValidationSchema } from './config/config.validation';
import tmdbConfig from './config/tmdb.config';
import { TmdbModule } from './tmdb/tmdb.module';
import { PosterModule } from './poster/poster.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      load: [tmdbConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    TmdbModule,
    PosterModule,
  ],
})
export class AppModule {}
