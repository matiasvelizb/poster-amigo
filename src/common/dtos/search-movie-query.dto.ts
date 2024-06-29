import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class SearchMovieQueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  include_adult?: boolean = true;

  @IsOptional()
  @IsString()
  language?: string = 'en-US';

  @IsOptional()
  @IsString()
  primary_release_year?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsString()
  year?: string;
}
