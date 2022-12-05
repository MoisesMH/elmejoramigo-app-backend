import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PicturesService {
    constructor(private readonly _prismaService: PrismaService) {}

    async bulkCreatePictures(files: Array<Express.Multer.File>) {
        return await this._prismaService.$transaction(
            files.map((f) => this._prismaService.photo.create({
                data: {
                    name: f.filename,
                    uri: f.path
                }
            }))
        );
    }

    async deletePictures() {

    }
}
