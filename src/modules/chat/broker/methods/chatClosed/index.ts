import { getChatInfo } from "../../../api/chat/get-chat-info";
import { ChatDto } from "../../../dto/chat";
import { IChatBrokerMessage } from "../../message";
import { EChatResponses } from "../../response";

export const chatClosed = (body: IChatBrokerMessage) => {
    return new Promise((resolve, reject) => {
        getChatInfo({ chatId: body.chat.id })
            .then((response: ChatDto) => {
                resolve({ 
                    method: EChatResponses.ok
                });
            });
    });
};
