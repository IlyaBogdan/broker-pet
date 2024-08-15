import { ChatDto } from "@src/modules/chat/dto/chat";
import { UserDto } from "@src/modules/chat/dto/user";

export type TNewMessage = {
    /**
     * Message date in ISO
     * @example 2024-08-15T15:02:17.080Z
     */
    date: string,

    /**
     * Message content
     * @example 'Hello!'
     */
    message: string,

    /**
     * Message author
     */
    author: UserDto
}

export type TSendMessageType = {
    method: 'sendMessage',
    token: string,
    chat: ChatDto,
    message: TNewMessage,
    date: string
};
