import { ChatBroker } from "../..";
import { ChatDto } from "../../../dto/chat";
import { IChatBrokerMessage } from "../../message";
import { createChat as createChatRequest } from "../../../api/chat/create";
import { EChatResponses } from "../../response";

/**
 * This method create new chat with user and sends it to backend.
 * From backend we accept actual info about chat
 */
export const createChat = (body: IChatBrokerMessage, broker: ChatBroker) => {
    const users: number[] = body.users;
    const chatInfo = {
        users,
        type: users.length > 2 ? 1 : 0
    };

    return new Promise((resolve, reject) => {
        createChatRequest(chatInfo)
            .then((response: ChatDto) => {
                broker.setActiveChat(body.token, response);
                const users = broker.getUsersOnline(body.users);
                resolve({ method: EChatResponses.activeChat, chat: Object.assign(response, {online: users})})
            });
    });
};
