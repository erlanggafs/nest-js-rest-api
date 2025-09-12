import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';

export class createOrUpdateProfileDto {
  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  kelas?: string;

  @IsOptional()
  @IsString()
  jurusan?: string;

  @IsOptional()
  @IsNumber()
  tahunLulus?: number;

  @IsOptional()
  @IsEnum(['aktif', 'lulus'])
  status?: 'aktif' | 'lulus';

  @IsOptional()
  @IsNumber()
  followersCount?: number;

  @IsOptional()
  @IsNumber()
  followingCount?: number;
}
