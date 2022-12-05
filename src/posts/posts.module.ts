import { Module } from '@nestjs/common';
import { PicturesModule } from 'src/pictures/pictures.module';
import { PicturesService } from 'src/pictures/pictures.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PetService } from './pet.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [PrismaModule, PicturesModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PetService, PicturesService]
})
export class PostsModule {}
