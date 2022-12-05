import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './create-post.dto';
import { PetService } from './pet.service';

type PetDto = {
    petData: Prisma.PetCreateInput,
    petPhotos: Array<Express.Multer.File>,
    petType: Prisma.Pet_TypeWhereUniqueInput
}

@Injectable()
export class PostsService {
    constructor(private readonly _prismaService: PrismaService,
                private readonly _petService: PetService) {}

    async find(where: Prisma.PostWhereUniqueInput) {
        return await this._prismaService.post.findUniqueOrThrow({
            where
        })
    }

    async findMany() {

    }

    async create(
        user: Prisma.UserWhereUniqueInput, 
        {
            pet,
            ...data
        }: CreatePostDto,
        photos: Array<Express.Multer.File>
    ) {
        const petType = { id: pet.type_id }
        const addedPet = await this._petService.create(pet, petType, photos)

        return await this._prismaService.post.create({
            data: {
                ...data,
                user: {
                    connect: user
                },
                pet: {
                    connect: addedPet
                }
            },
            // Populate user
            include: {
                user: true,
                pet: true
            }
        })
    }

    async update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
        return await this._prismaService.post.update({
            where,
            data
        })
    }

    async remove(where: Prisma.UserWhereUniqueInput, data: Prisma.PostWhereUniqueInput) {
        return await this._prismaService.user.update({
            where,
            data: {
                posts: {
                    delete: data
                }
            }
        })
    }

    // async remove(where: Prisma.PostWhereUniqueInput) {
    //     await this._prismaService.post.update({
    //         where,
    //         data: {
    //             user: {
    //                 disconnect: true
    //             }
    //         }
    //     })

    //     return await this._prismaService.post.delete({
    //         where
    //     })
    // }
}
