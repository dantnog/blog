import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from 'src/post/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/posts',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${Math.floor(
            Math.random() * 1000,
          )}${extname(file.originalname)}`;

          callback(null, filename);
        },
      }),
    }),
  )
  createPost(
    @Body() dto: PostDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2_000_000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.postService.createPost(dto, req.user, image);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(
    @Body() dto: PostDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.postService.update(id, dto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(@Param('id') id: string, @Req() req: Request) {
    return this.postService.deletePost(id, req.user);
  }
}
