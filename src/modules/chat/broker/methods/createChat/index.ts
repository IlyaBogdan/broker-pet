import { ChatBroker } from "../..";
import { createChat as createChatRequest } from "../../../api/chat/create";
import { EChatResponses } from "../../response";
import { TCreateChatMessage } from "./message";
import { TChatCreated } from "./response";

/**
 * This method create new chat with user and sends it to backend.
 * From backend we accept actual info about chat
 * 
 * @param {TCreateChatMessage} body
 * @param {ChatBroker} broker
 * @returns {Promise<TChatCreated>}
 */
export const createChat = (body: TCreateChatMessage, broker: ChatBroker): Promise<TChatCreated> => {
    const users: number[] = body.users;
    const chatInfo = {
        users,
        type: users.length > 2 ? 1 : 0
    };

    return new Promise((resolve, reject) => {
        createChatRequest(chatInfo)
            .then((response) => {
                if (response.isSuccess) {
                    broker.setActiveChat(body.token, response.payload);
                    const users = broker.getUsersOnline(body.users);
                    resolve({
                        method: EChatResponses.activeChat,
                        chat: {
                            online: users,
                            ...response.payload
                        }
                    });
                } else {
                    //
                }
            });
    });
};
