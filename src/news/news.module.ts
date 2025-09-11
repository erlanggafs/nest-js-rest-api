import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { News } from './entities/news.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([News]), JwtModule],
  controllers: [NewsController],
  providers: [NewsService, CloudinaryService],
})
export class NewsModule {}
