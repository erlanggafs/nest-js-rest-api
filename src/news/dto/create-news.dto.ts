import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Judul berita' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Isi konten berita' })
  content: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Gambar berita',
  })
  image?: any;
}
