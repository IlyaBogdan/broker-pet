import { EChatTypes } from "@src/modules/chat/dto/chat"

/**
 * Params for creating chat
 */
export type TCreateChatParams = {

    /**
     * List of user ID
     */
    users: number[],

    /**
     * Chat type
     * @example EChatTypes.DIALOG
     */
    type: EChatTypes
}