import { TNewMessage } from "@src/modules/chat/broker/methods/sendMessage/message";

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
