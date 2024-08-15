import { ChatBroker } from "../..";
import { IChatBrokerMessage } from "../../message";
import { EChatResponses } from "../../response";

/**
 * This method show all active users in chat, who is writing some message
 */
export const setTyping = (body: IChatBrokerMessage, broker: ChatBroker) => {
    return new Promise((resolve, reject) => {
        const users = body.chat.users.filter((userInChat) => userInChat.id != body.user.id);
        broker.notifyUserTyping(body.user, users, body.chat.id, body.typing);

        resolve({ method: EChatResponses.ok });
    });
};
