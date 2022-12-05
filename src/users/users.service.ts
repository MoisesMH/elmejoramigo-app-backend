import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly _prismaService: PrismaService) {}

    async findOne(where: Prisma.UserWhereUniqueInput) {
        const user = await this._prismaService.user.findUnique({
            where
        })
        console.log(user);
        return user
    }

    async findFirst(where: Prisma.UserWhereInput) {
        return await this._prismaService.user.findFirstOrThrow({
            where
        })
    }

    async create(data: Prisma.UserCreateInput) {
        return await this._prismaService.user.create({
            data
        })
    }

    async update(
        where: Prisma.UserWhereUniqueInput, 
        data: Prisma.UserUpdateInput
    ) {
        return this._prismaService.user.update({
            where,
            data,
        })
    }

    async remove(where: Prisma.UserWhereUniqueInput) {
        return await this._prismaService.user.delete({
            where
        })
    }
}
