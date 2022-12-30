import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
