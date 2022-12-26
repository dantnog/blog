import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/post/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @Body() dto: PostDto,
    @Req() req: Request
  ) {
    return this.postService.createPost(dto, req.user)
  }

  @Get()
  getAll() {
    return this.postService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getOne(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(
    @Body() dto: PostDto,
    @Param('id') id: string,
    @Req() req: Request
  ) {
    return this.postService.update(id, dto, req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    return this.postService.deletePost(id, req.user)
  }
}
