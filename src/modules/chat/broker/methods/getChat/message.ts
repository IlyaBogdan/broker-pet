import { UserDto } from "@src/modules/chat/dto/user"

export type TGetChatMessageFormat = {
    token: string,
    user: UserDto,
    chat: {
        id: number
    },
    date: string
}