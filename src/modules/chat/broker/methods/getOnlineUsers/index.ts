import { ChatBroker } from "../..";
import { IChatBrokerMessage } from "../../message";
import { EChatResponses } from "../../response";

export const getOnlineUsers = (body: IChatBrokerMessage, broker: ChatBroker) => {
    return new Promise((resolve, reject) => {
        const users = broker.getUsersOnline(body.users);
        resolve({ method: EChatResponses.usersOnline, users });
    });
};
