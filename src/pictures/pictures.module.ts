import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { MulterConfigService } from './multer.service';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService
    }),
    PrismaModule,
    UsersModule
  ],
  controllers: [PicturesController],
  providers: [PicturesService, PrismaService, UsersService]
})
export class PicturesModule {}
