import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await argon.hash(dto.password),
        },
      });
      delete user.password;

      user['token'] = this.signToken(user.id, user.email);

      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await argon.verify(user.password, dto.password))) {
        throw new ForbiddenException('Incorrect password');
      }
      delete user.password;

      user['token'] = this.signToken(user.id, user.email);

      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  signToken(id: number, email: string) {
    return this.jwt.sign(
      { id, email },
      {
        expiresIn: '1d',
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }
}
