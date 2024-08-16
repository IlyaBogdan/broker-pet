import { getChatInfo } from "../../../api/chat/get-chat-info";
import { EChatResponses } from "../../response";

/**
 * not implemented
 */
export const chatClosed = (body) => {
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
