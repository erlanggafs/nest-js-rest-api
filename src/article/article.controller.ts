import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
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
import { ArticleQueryDto } from './dto/article-query.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@UseGuards(AuthGuardCost, RolesGuard)
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query: ArticleQueryDto) {
    const data = await this.articleService.findAllArticle(query);
    return {
      status: 'success',
      message: 'Daftar artikel berhasil diambil',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @Get('/user')
  async findArticleUser(@Request() req, @Query() query: ArticleQueryDto) {
    const article = await this.articleService.articleByUser(req.user.id, query);
    return article;
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('/:id')
  async findOne(@Param() params: findOneParams) {
    const data = await this.findOneOrFail(params.id);
    return {
      status: 'success',
      message: 'Detail artikel berhasil diambil',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Create Article', type: createArticleDto })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createArticleDto: createArticleDto,
  ) {
    const userId = req.user?.id || req.user?.sub || req.user?.userId;
    if (!userId)
      throw new UnauthorizedException('User ID tidak ditemukan dalam token');

    const data = await this.articleService.createArticle(
      userId,
      createArticleDto,
      file,
    );
    return {
      status: 'success',
      message: 'Artikel berhasil dibuat',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Update Article', type: UpdateArticleDto })
  @Put('/:id')
  async update(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Param() params: findOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.findOneOrFail(params.id);
    const data = await this.articleService.updateArticleByParams(
      req.user.id,
      article,
      updateArticleDto,
      file,
    );
    return {
      status: 'success',
      message: 'Artikel berhasil diupdate',
      data,
    };
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async delete(@Request() req, @Param() params: findOneParams) {
    const article = await this.findOneOrFail(params.id);
    await this.articleService.deleteArticleByParams(req.user.id, article);
    return {
      status: 'success',
      message: 'Artikel berhasil dihapus',
      data: null,
    };
  }

  private async findOneOrFail(id: string): Promise<Article> {
    const article = await this.articleService.findOneByParam(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
