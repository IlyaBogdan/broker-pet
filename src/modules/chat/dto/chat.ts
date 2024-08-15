import { UserDto } from "./user";
import { MessageDto } from "./message";

export enum EChatTypes { 
    CHAT = 1,
    DIALOG = 0 
}

export type ChatDto = {
    id?: number,
    title?: String,
    type: EChatTypes,
    users: Array<UserDto | number>,
    messages?: Array<MessageDto>,
    created_at?: Date,
    updated_at?: Date
}