import { TNewMessage } from "@src/modules/chat/broker/methods/sendMessage/message";
import { MessageDto } from "@src/modules/chat/dto/message";
import { UserDto } from "@src/modules/chat/dto/user";

/**
 * Params for saving message
 */
export type TSaveMessageParams = {

    /**
     * Chat ID
     * @example 123
     */
    chatId: number,

    /**
     * Message content
     */
    message: TNewMessage
};
