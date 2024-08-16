import { UserDto } from "@src/modules/chat/dto/user";
import { ChatBroker } from "../..";
import { EChatResponses } from "../../response";
import { TSetTypingBrokerMessage } from "./message";
import { TSetTypingBrokerResponse } from "./response";

/**
 * This method show all active users in chat, who is writing some message
 */
export const setTyping = (
    body: TSetTypingBrokerMessage,
    broker: ChatBroker
): Promise<TSetTypingBrokerResponse> => {
    return new Promise((resolve, reject) => {
        const users = body.chat.users.filter((userInChat: UserDto) => userInChat.id !== body.user.id);
        broker.notifyUserTyping(body.user, users as UserDto[], body.chat.id, body.typing);

        resolve({
            method: EChatResponses.ok
        });
    });
};
