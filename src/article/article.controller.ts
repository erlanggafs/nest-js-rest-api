import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { findOneParams } from './dto/find-one.param';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAllArticle();
  }

  @Get('/:id')
  async findOne(@Param() params: findOneParams): Promise<Article> {
    return await this.findOneOrFail(params.id);
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createArticleDto: createArticleDto,
  ): Promise<Article> {
    console.log('🔍 Full req.user:', req.user);

    // Coba berbagai kemungkinan field untuk user ID
    const userId = req.user?.id || req.user?.sub || req.user?.userId;

    console.log('🔍 User ID yang diambil:', userId);

    if (!userId) {
      throw new UnauthorizedException('User ID tidak ditemukan dalam token');
    }

    return await this.articleService.createArticle(
      userId,
      createArticleDto,
      file,
    );
  }

  @Put('/:id')
  async update(
    @Param() params: findOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOneOrFail(params.id);
    return this.articleService.updateArticleByParams(article, updateArticleDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: findOneParams): Promise<void> {
    const article = await this.findOneOrFail(params.id);
    await this.articleService.deleteArticleByParams(article);
  }

  private async findOneOrFail(id: string): Promise<Article> {
    const article = await this.articleService.findOneByParam(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
