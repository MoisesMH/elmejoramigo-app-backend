import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PicturesService } from "src/pictures/pictures.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PetService {
    constructor(private readonly _prismaService: PrismaService,
                private readonly _picturesService: PicturesService) {}

    async findType(where: Prisma.Pet_TypeWhereUniqueInput) {
        return await this._prismaService.pet_Type.findUniqueOrThrow({
            where
        })
    }

    async create(data: Prisma.PetCreateInput, petType: Prisma.Pet_TypeWhereUniqueInput, files: Array<Express.Multer.File>) {
        const photos = await this._picturesService.bulkCreatePictures(files)
        const type = await this.findType(petType)

        return await this._prismaService.pet.create({
            data: {
                ...data,
                type: {
                    connect: type
                },
                photos: {
                    connect: photos
                }
            },
            include: {
                type: true,
                photos: true
            }
        })
    }
}