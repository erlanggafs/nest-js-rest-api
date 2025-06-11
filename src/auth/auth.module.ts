import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { jwtConstants } from './constants';
import { Profile } from 'src/profile/entities/profile.entity';

config(); // Load environment variables from .env file

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.register({
      secret: jwtConstants.secret, // Secret key for signing JWTs, should be stored in .env file
      signOptions: { expiresIn: '7d' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // Export AuthService and JwtModule for use in other modules
})
export class AuthModule {}
