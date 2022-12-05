export class CreatePetDto {
    name: string
    birth?: string | Date
    age?: number
    sex?: string
    height?: number
    type_id?: number
}