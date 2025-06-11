import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { AuthGuardCost } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Role } from './enum/role.enum';
import { Roles } from './decolator/role.decolator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUser(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return await this.authService.loginUser(loginDto);
  }

  @UseGuards(AuthGuardCost)
  @Get('get-user')
  async getUser(@Request() request): Promise<User | null> {
    return await this.authService.getUser(request.user.id);
  }

  @UseGuards(AuthGuardCost, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test-role')
  getTest(): { message: string } {
    return { message: 'Role Acces Success' };
  }
}
