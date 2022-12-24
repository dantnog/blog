import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/post/dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() dto: PostDto) {
    return this.postService.createPost(dto)
  }
}
