import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PosterService } from './poster.service';

@Module({
  imports: [HttpModule],
  providers: [PosterService],
  exports: [PosterService],
})
export class PosterModule {}
