import { Prisma } from "@prisma/client"
import { CreatePetDto } from "./create-pet.dto"

export class CreatePostDto {
    title: string
    content?: string
    pet?: CreatePetDto
}