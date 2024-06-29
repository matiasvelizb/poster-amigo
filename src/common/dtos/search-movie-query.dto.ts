import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

enum Language {
  EN_US = 'en-US',
  ES_CL = 'es-CL',
}

export class SearchMovieQueryDto {
  @ApiProperty({
    description:
      'Movie title to search for, including original, translated, and alternative titles',
  })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiPropertyOptional({ description: 'Year of release (YYYY format)' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiPropertyOptional({
    description: 'Language of the search',
    enum: Language,
    default: Language.ES_CL,
  })
  @IsOptional()
  @IsEnum(Language)
  language?: Language = Language.ES_CL;

  @ApiPropertyOptional({ description: 'Include adult content', default: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  include_adult?: boolean = true;

  @ApiPropertyOptional({
    description: 'Page number for paginated results',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
}
