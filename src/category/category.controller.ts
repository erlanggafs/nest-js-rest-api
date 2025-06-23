import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { findOneParams } from './dto/find-one.param';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decolator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    const category = await this.findOneOrFail(id);
    return category;
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param() params: findOneParams,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrFail(params.id);
    return this.categoryService.update(category, updateCategoryDto);
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: findOneParams) {
    const category = await this.findOneOrFail(params.id);
    return this.categoryService.remove(category);
  }

  private async findOneOrFail(id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
}
