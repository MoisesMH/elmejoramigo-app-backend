import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // req, request, is destructured in session, also has currentUser attribute
        const { session } = context.switchToHttp().getRequest<Request>();
        // Verify if session.userId is truthy or falsey
        return session.userId;
    }
}