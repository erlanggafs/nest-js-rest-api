import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolator/role.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { User } from 'src/auth/entities/user.entity';

@UseGuards(AuthGuardCost, RolesGuard) // ✅ Semua endpoint wajib token & role
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // CREATE profile (hanya buat pertama kali)
  @Post()
  async createProfile(
    @Request() req,
    @Body() dto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.profileService.updateOrCreateProfile(req.user.id, dto);
  }

  // UPDATE profile (kalau sudah ada, diupdate)
  @Roles(Role.ADMIN, Role.USER)
  @Put()
  async updateProfile(
    @Request() req,
    @Body() dto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.profileService.updateOrCreateProfile(req.user.id, dto);
  }

  @Roles(Role.ADMIN, Role.USER) // hanya admin boleh update user lain
  @Put(':userId')
  async updateProfileByUserId(
    @Request() req,
    @Param('userId') userId: string,
    @Body() dto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return this.profileService.updateOrCreateProfile(userId, dto);
  }

  // GET profile user yang login
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getUserProfile(@Request() req): Promise<User | null> {
    // 💡 Gunakan userId sesuai payload JWT
    const userId = req.user.userId;
    console.log('Fetching profile for userId:', userId);
    return this.profileService.getUserProfileByToken(userId);
  }
}
