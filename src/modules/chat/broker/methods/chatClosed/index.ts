import { getChatInfo } from "../../../api/chat/get-chat-info";
import { IChatBrokerMessage } from "../../message";
import { EChatResponses } from "../../response";

/**
 * not implemented
 */
export const chatClosed = (body: IChatBrokerMessage) => {
    return new Promise((resolve, reject) => {
        getChatInfo({ chatId: body.chat.id })
            .then((response) => {
                if (response.isSuccess) {
                    resolve({ 
                        method: EChatResponses.ok
                    });
                }
            });
    });
};
