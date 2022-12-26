import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(dto) {
    try {
      const result = await this.prisma.post.create({
        data: {
          title: dto.title,
          desc: dto.desc,
          text: dto.text,
          slug: this.createSlug(dto.title)
        },
      })
      return result
    } catch(err) {
      throw new InternalServerErrorException('Failed to create post')
    }
  }

  async getAll() {
    try {
      const result = await this.prisma.post.findMany({take: 20})
      console.log(result)
      return result
    } catch(err) {
      throw new InternalServerErrorException('Failed to get all posts')
    }
  }

  createSlug(str: string) {
    str = str.toLowerCase()
    // remove accents
    str = str.normalize('NFD').replace(/\p{Mn}/gu, '');
    // change spaces
    str = str.replace(/\W+/g, '-')
    return str
  }
}
