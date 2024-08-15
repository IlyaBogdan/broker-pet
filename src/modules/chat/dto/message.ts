import { UserDto } from "./user"

export type MessageDto = {
    id?: number,
    author: UserDto,
    message: string,
    created_at: Date,
    updated_at?: Date
}