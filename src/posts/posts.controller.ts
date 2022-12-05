import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Post as UserPost, Prisma } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private readonly _postsService: PostsService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    addPost(
        @CurrentUser() user: Prisma.UserWhereUniqueInput,
        @Body() body: CreatePostDto,
        @UploadedFiles() files: Array<Express.Multer.File>   
    ) {
        return this._postsService.create({ id: user.id }, body, files)
    }

    @Get(':id')
    getPostInfo(@Param('id') id: string) {
        const post = { id: +id }
        return this._postsService.find(post)
    }

    @Put(':id')
    updatePost(@Param('id') id: string, @Body() body: Prisma.PostUpdateInput) {
        const post = { id: +id }
        return this._postsService.update(post, body)
    }

    @Delete(':id')
    removePost(@Param('id') id: string, @CurrentUser() user: Prisma.UserWhereUniqueInput) {
        const post = { id: +id }
        return this._postsService.remove({ id: user.id }, post)
    }

    
}
