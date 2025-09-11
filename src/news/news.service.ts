import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  findOne(id: string): Promise<News | null> {
    return this.newsRepository.findOneBy({ id });
  }

  create(news: Partial<News>): Promise<News> {
    const newNews = this.newsRepository.create(news);
    return this.newsRepository.save(newNews);
  }

  async update(id: string, news: Partial<News>): Promise<News> {
    await this.newsRepository.update(id, news);
    const updatedNews = await this.findOne(id);
    if (!updatedNews) {
      throw new Error(`News with id ${id} not found`);
    }
    return updatedNews;
  }

  async remove(id: string): Promise<void> {
    await this.newsRepository.delete(id);
  }
}
