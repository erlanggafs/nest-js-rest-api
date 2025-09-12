import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { createNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

import { News } from './entities/news.entity';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@UseGuards(AuthGuardCost, RolesGuard) // ✅ Semua endpoint wajib token & role
@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll() {
    const data = await this.newsService.findAll();
    return {
      status: 'success',
      message: 'Daftar news berhasil diambil',
      data,
    };
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.findOneOrFail(id);
    return {
      status: 'success',
      message: 'Detail news berhasil diambil',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Create News', type: createNewsDto })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: createNewsDto,
  ) {
    const data = await this.newsService.createNews({
      createNewsDto,
      file,
    });

    return {
      status: 'success',
      message: 'News berhasil dibuat',
      data,
    };
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Update News', type: UpdateNewsDto })
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    const data = await this.newsService.update(id, {
      news: updateNewsDto,
      file,
    });

    return {
      status: 'success',
      message: 'News berhasil diupdate',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.newsService.remove(id);

    return {
      status: 'success',
      message: 'News berhasil dihapus',
      data: null,
    };
  }

  private async findOneOrFail(id: string): Promise<News> {
    const news = await this.newsService.findOne(id);
    if (!news) {
      throw new NotFoundException(`News dengan ID ${id} tidak ditemukan`);
    }
    return news;
  }
}
