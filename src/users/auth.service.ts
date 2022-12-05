import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service";
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly _usersService: UsersService) {}

    async login(body: Prisma.UserCreateInput) {
        const user = await this._usersService.findOne({ email: body.email })
        if(!user) throw new NotFoundException("username or password incorrect")
        const isPassword = await argon2.verify(user.password, body.password)
        if(!isPassword) throw new NotFoundException("username or password incorrect")
        return user
    }

    async register(body: Prisma.UserCreateInput) {
        const user = await this._usersService.findOne({ email: body.email })
        if(user) throw new BadRequestException("email in use")
        const hashedPw = await argon2.hash(body.password)
        body.password = hashedPw
        return await this._usersService.create(body)
    }
}