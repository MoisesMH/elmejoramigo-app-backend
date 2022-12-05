import { Inject, NestMiddleware } from "@nestjs/common";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";

// Fixing Typescript error
declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

export class CurrentUserMiddleware implements NestMiddleware {
    constructor(@Inject(UsersService) private readonly _usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        // console.log(userId)

        if(userId) {
            // const user: User = { 
            //     id: 2,
            //     name: 'alonso',
            //     email: 'alonso@hotmail.com',
            //     password: '$argon2i$v=19$m=16,t=2,p=1$Rkw2V0c0OGVlTVVDWHJMWQ$7zJs6NEWnDiEBj/XgWdhZg'
            // }
            // const user: User = await this._prismaService.$queryRaw`SELECT \* FROM users WHERE id = ${userId}`;
            const user: User = await this._usersService.findOne({ id: userId })
            req.currentUser = user;
        }

        next();
    }
}