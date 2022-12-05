import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "@prisma/client"
import { Request } from "express"

export const CurrentUser = createParamDecorator<never, ExecutionContext, User>(
    // Factory. Data argument is not goint to be used
    (data: never, context: ExecutionContext) => {
        // @Get http request
        const { currentUser } = context.switchToHttp().getRequest<Request>()
        // Then, request session cookie
        return currentUser
    }
)