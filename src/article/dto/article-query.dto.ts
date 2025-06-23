import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ArticleQueryDto {
  @ApiPropertyOptional({
    description: 'Search by article title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Search by category ID',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Page number for now pagination',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of articles per page (default is 3)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 3;

  @ApiPropertyOptional({
    description: 'Sort by',
    enum: ['title', 'category, createdAt'],
  })
  @IsOptional()
  @IsIn(['title', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort By ',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
