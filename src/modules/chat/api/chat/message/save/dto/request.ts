import { MessageDto } from "@src/modules/chat/dto/message";

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
    message: MessageDto
};
