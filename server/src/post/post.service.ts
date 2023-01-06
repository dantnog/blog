import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(dto, decodedToken, image) {
    try {
      if (await this.checkIfUserNotExists(decodedToken.id)) {
        throw new UnauthorizedException('User not found');
      }
      const result = await this.prisma.post.create({
        data: {
          title: dto.title,
          desc: dto.desc,
          text: dto.text,
          slug: this.createSlug(dto.title),
          user_id: decodedToken.id,
          image: image.filename,
        },
      });
      console.log(
        `[${new Date(Date.now()).toLocaleTimeString()}] [CREATE POST] Post created.`,
      );
      return result;
    } catch (err) {
      console.log('[CREATE POST] Error.\n', err);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async getAll() {
    try {
      const result = await this.prisma.post.findMany({
        take: 20,
        orderBy: {
          updatedAt: 'desc',
        },
      });
      console.log(
        `[${new Date(Date.now()).toLocaleTimeString()}] [GET ALL POSTS] All posts fetched.`,
      );
      return result;
    } catch (err) {
      console.log('[GET ALL POSTS] Error.\n', err);
      throw new InternalServerErrorException('Failed to get all posts');
    }
  }

  async getOne(id: string) {
    try {
      const result = await this.prisma.post.findUnique({
        where: { id: Number(id) },
      });
      console.log(
        `[${new Date(Date.now()).toLocaleTimeString()}] [GET POST] Post fetched.`,
      );
      return result;
    } catch (err) {
      console.log('[GET ALL POSTS] Error.\n', err);
      throw new InternalServerErrorException('Failed to get post');
    }
  }

  async update(id: string, dto, decodedToken) {
    try {
      if (await this.checkIfUserNotExists(decodedToken.id)) {
        throw new UnauthorizedException('User not found');
      }
      const result = await this.prisma.post.update({
        where: { id: Number(id) },
        data: {
          title: dto.title,
          desc: dto.desc,
          text: dto.text,
          slug: this.createSlug(dto.title),
        },
      });
      console.log(
        `[${new Date(Date.now()).toLocaleTimeString()}] [UPDATE POST] Post updated.`,
      );
      return result;
    } catch (err) {
      console.log('[GET ALL POSTS] Error.\n', err);
      throw new InternalServerErrorException('Failed to get post');
    }
  }

  async deletePost(id: string, decodedToken) {
    try {
      if (await this.checkIfUserNotExists(decodedToken.id)) {
        throw new UnauthorizedException('User not found');
      }
      await this.prisma.post.delete({ where: { id: Number(id) } });
      console.log(
        `[${new Date(Date.now()).toLocaleTimeString()}] [DELETE POST] Post deleted.`,
      );
      return this.getAll();
    } catch (err) {
      console.log('[DELETE POST] Error.\n', err);
      throw new InternalServerErrorException('Failed to delete post');
    }
  }

  createSlug(str: string): string {
    str = str.toLowerCase();
    // remove accents
    str = str.normalize('NFD').replace(/\p{Mn}/gu, '');
    // change spaces
    str = str.replace(/\W+/g, '-');
    return str;
  }

  async checkIfUserNotExists(id) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) return true;
    return false;
  }
}
