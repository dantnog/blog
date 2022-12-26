import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await argon.hash(dto.password)
        }
      })
      delete user.password

      user['token'] = this.signToken(user.id, user.email)

      return user
    } catch(err) {
      throw new InternalServerErrorException('Failed to register user')
    }
  }

  signToken(id: number, email: string) {
    return this.jwt.sign(
      {id, email},
      {
        expiresIn: '1d', 
        secret: this.config.get('JWT_SECRET')
      }
    )
  }
}
