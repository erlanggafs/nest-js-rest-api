/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
    private CloudinaryService: CloudinaryService,
  ) {}

  async createArticle(
    userId: string,
    createArticleDto: createArticleDto,
    file?: Express.Multer.File,
  ): Promise<Article> {
    let image: string | undefined;

    if (file) {
      image = await this.CloudinaryService.uploadImageStream(file);
    }
    const newArticle = await this.ArticleRepository.create({
      ...createArticleDto,
      image,
      userId,
    });
    return this.ArticleRepository.save(newArticle);
  }
  async findAllArticle(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOneByParam(id: string): Promise<Article | null> {
    return await this.ArticleRepository.findOne({
      where: { id },
    });
  }

  async updateArticleByParams(
    article: IArticle,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    Object.assign(article, updateArticleDto);
    return await this.ArticleRepository.save(article);
  }

  async deleteArticleByParams(articleData: IArticle): Promise<void> {
    await this.ArticleRepository.delete(articleData.id);
  }
}
