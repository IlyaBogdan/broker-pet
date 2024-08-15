import { UserDto } from "./user"

export type MessageDto = {
    id?: number,
    user: UserDto,
    message: string,
    created_at: Date,
    updated_at?: Date
}