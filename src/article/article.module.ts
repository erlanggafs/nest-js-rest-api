import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';
import { ArticleTag } from 'src/articletag/entities/articletag.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, ArticleTag]), JwtModule],
  controllers: [ArticleController],
  providers: [ArticleService, CloudinaryService],
})
export class ArticleModule {}
