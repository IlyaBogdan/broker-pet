import { ChatDto } from "./dto/chat.dto"
import { UserDto } from "./dto/user.dto"

export type TPullBrokerMessageFormat = {
    token: string,
    user: UserDto,
    date: Date
}

export type TGetChatMessageFormat = {
    token: string,
    user: UserDto,
    chat: {
        id: number
    },
    date: Date
}
