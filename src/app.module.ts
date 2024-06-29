import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TmdbModule } from './tmdb/tmdb.module';
import tmdbConfig from './config/tmdb.config';
import { configValidationSchema } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [tmdbConfig],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TmdbModule,
  ],
})
export class AppModule {}
