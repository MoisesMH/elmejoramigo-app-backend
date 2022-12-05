import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { plainToInstance, ClassConstructor } from "class-transformer"
// import { UserDto } from "src/users/dtos/user.dto";

export function Serialize<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private readonly _dto: ClassConstructor<T>) {}
    
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> | Promise<Observable<T>> {
        return next
            .handle()
            .pipe(
                map((data: T) => {
                    return plainToInstance(this._dto, data, { excludeExtraneousValues: true })
                }),
            );
    }
    
}