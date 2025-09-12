import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { createNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    private CloudinaryService: CloudinaryService,
  ) {}

  findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  findOne(id: string): Promise<News | null> {
    return this.newsRepository.findOneBy({ id });
  }

  async createNews(params: {
    createNewsDto: createNewsDto;
    file?: Express.Multer.File;
  }): Promise<News> {
    const { createNewsDto, file } = params;

    let image: string | undefined;

    if (file) {
      // Pastikan CloudinaryService punya method uploadImageStream
      // yang menerima file.buffer atau file.path
      image = await this.CloudinaryService.uploadImageStream(file, 'news');
    }

    const newNews = this.newsRepository.create({
      ...createNewsDto,
      image,
    });

    await this.newsRepository.save(newNews);
    return newNews;
  }

  async update(
    id: string,
    params: { news: Partial<News>; file?: Express.Multer.File },
  ): Promise<News> {
    const { news, file } = params;

    // Cari data lama
    const existingNews = await this.findOne(id);
    if (!existingNews) {
      throw new Error(`News with id ${id} not found`);
    }

    let image = existingNews.image;

    if (file) {
      // Upload image baru ke Cloudinary
      image = await this.CloudinaryService.uploadImageStream(file, 'news');

      // if (existingNews.image) {
      //   await this.CloudinaryService.deleteImage(existingNews.image);
      // }
    }

    // Update entity
    await this.newsRepository.update(id, {
      ...news,
      image,
    });

    const updatedNews = await this.findOne(id);
    if (!updatedNews) {
      throw new Error(`Failed to update news with id ${id}`);
    }

    return updatedNews;
  }

  async remove(id: string): Promise<void> {
    await this.newsRepository.delete(id);
  }
}
