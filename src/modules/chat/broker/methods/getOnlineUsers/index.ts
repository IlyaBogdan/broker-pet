import { ChatBroker } from "../..";
import { EChatResponses } from "../../response";
import { TGetOnlineUsersMessage } from "./message";
import { TGetOnlineUsersBrokerResponse } from "./response";

/**
 * Returns list of online users
 * 
 * @param {TGetOnlineUsersMessage} body 
 * @param {ChatBroker} broker 
 * @returns {Promise<TGetOnlineUsersBrokerResponse>}
 */
export const getOnlineUsers = (
    body: TGetOnlineUsersMessage,
    broker: ChatBroker
): Promise<TGetOnlineUsersBrokerResponse> => {
    return new Promise((resolve) => {
        const users = broker.getUsersOnline(body.users);
        resolve({ 
            method: EChatResponses.usersOnline,
            users
        });
    });
};
