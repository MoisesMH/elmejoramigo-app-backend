import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Put, Session, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _authService: AuthService
    ) {}

    @Get('whoami')
    @UseGuards(AuthGuard)
    // Preferred to be loaded on the Users Module as a globally scoped interceptor
    // @InterceptCurrentUser()
    WhoAmI(@CurrentUser() user: User) {
        if(!user) throw new NotFoundException("user not logged in");
        return user;
    }

    @Post('signup')
    signUp(@Body() body: Prisma.UserCreateInput) {
        return this._authService.register(body);
    }

    @Post('login')
    async signIn(@Body() body: Prisma.UserCreateInput, @Session() session: any) {
        const user = await this._authService.login(body);
        session.userId = user.id;
        return user;
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    signOut(@Session() session: any) {
        session.userId = null;
        return;
    }

    @Put('modify')
    @UseGuards(AuthGuard)
    modifyUser(@CurrentUser() user: Prisma.UserWhereUniqueInput, @Body() body: Prisma.UserUpdateInput) {
        return this._usersService.update({ id: user.id }, body);
    }

    @Delete('remove')
    @UseGuards(AuthGuard)
    async removeUser(@CurrentUser() user: Prisma.UserWhereUniqueInput, @Session() session: any) {
        const rUser = await this._usersService.remove({ id: user.id });
        session.userId = null;
        return rUser
    }
}
