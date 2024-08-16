import { ChatDto } from "@src/modules/chat/dto/chat"
import { UserDto } from "@src/modules/chat/dto/user"

export type TSetTypingBrokerMessage = {
    method: string,
    token: string,
    chat: ChatDto,
    user: UserDto
    typing: boolean,
    date: string,
};
