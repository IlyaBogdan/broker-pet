import { UserDto } from "./user.dto";
import { MessageDto } from "./message.dto";

enum ChatTypes { 
    CHAT = 1,
    DIALOG = 0 
}

export type ChatDto = {
    id?: number,
    title?: String,
    type: ChatTypes,
    users: Array<UserDto | number>,
    messages?: Array<MessageDto>,
    created_at?: Date,
    updated_at?: Date
}