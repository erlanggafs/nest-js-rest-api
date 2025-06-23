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

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query() query: ArticleQueryDto) {
    return await this.articleService.findAllArticle(query);
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/user')
  async findArticleUser(@Request() req, @Query() query: ArticleQueryDto) {
    const article = await this.articleService.articleByUser(req.user.id, query);
    return article;
  }

  @Get('/:id')
  async findOne(@Param() params: findOneParams): Promise<Article> {
    return await this.findOneOrFail(params.id);
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Article',
    type: createArticleDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createArticleDto: createArticleDto,
  ): Promise<Article> {
    // Coba berbagai kemungkinan field untuk user ID
    const userId = req.user?.id || req.user?.sub || req.user?.userId;

    if (!userId) {
      throw new UnauthorizedException('User ID tidak ditemukan dalam token');
    }

    return await this.articleService.createArticle(
      userId,
      createArticleDto,
      file,
    );
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Article',
    type: createArticleDto,
  })
  @Put('/:id')
  async update(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Param() params: findOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOneOrFail(params.id);
    return this.articleService.updateArticleByParams(
      req.user.id,
      article,
      updateArticleDto,
      file,
    );
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req, @Param() params: findOneParams): Promise<void> {
    const article = await this.findOneOrFail(params.id);
    await this.articleService.deleteArticleByParams(req.user.id, article);
  }

  private async findOneOrFail(id: string): Promise<Article> {
    const article = await this.articleService.findOneByParam(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
