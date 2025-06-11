import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';
import { AuthGuardCost } from 'src/auth/guard/auth.guard';
import { User } from 'src/auth/entities/user.entity';

@Controller('profile')
@UseGuards(AuthGuardCost)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async updateOrCreateProfile(
    @Request() req,
    @Body() createOrUpdateProfileDto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.profileService.updateOrCreateProfile(
      req.user.id,
      createOrUpdateProfileDto,
    );
  }

  @Get()
  async getUserProfile(@Request() req): Promise<User | null> {
    return this.profileService.getUserProfileByToken(req.user.id);
  }
}
