import { UserDto } from "./dto/user"

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
