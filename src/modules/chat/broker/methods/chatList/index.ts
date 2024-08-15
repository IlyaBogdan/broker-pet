import { getUserChats } from "../../../api/chat/get-user-chats";
import { ChatDto } from "../../../dto/chat";
import { IChatBrokerMessage } from "../../message";
import { EChatResponses } from "../../response";

/**
 * This method return chat list for current user
 */
export const chatList = (body: IChatBrokerMessage) => {
    return new Promise((resolve, reject) => {
        getUserChats({ userId: body.user.id })
            .then((chats: ChatDto[]) => {
                resolve({ method: EChatResponses.userDialogs, chats });
            });
    });
};
