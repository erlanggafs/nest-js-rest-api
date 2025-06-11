import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { User } from 'src/auth/entities/user.entity';
import { findOneParams } from './dto/find-one.param';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  // async updateRole(user: User, updateRoleDto: { role: Role }): Promise<User> {
  //   return await this.userService.updateRoleUser(user, updateRoleDto);
  // }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async update(
    @Param() params: findOneParams,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string }> {
    const userData = await this.findOneOrFail(params.id);
    await this.userService.updateRoleUser(userData, updateRoleDto);
    return {
      message: 'Change Role Successfully',
    };
  }

  private async findOneOrFail(id: string): Promise<User> {
    const user = await this.userService.findByParams(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
