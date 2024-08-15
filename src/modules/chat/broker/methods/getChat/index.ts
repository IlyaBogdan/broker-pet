import { ChatBroker } from "../..";
import { getChatInfo } from "../../../api/chat/get-chat-info";
import { ChatDto } from "../../../dto/chat";
import { UserDto } from "../../../dto/user";
import { TGetChatMessageFormat } from "../../../types";
import { EChatResponses } from "../../response";

/**
 * This method retrives actual information about chat
 * 
 * User opened chat. After this method we push event listener
 * to current session and session will be listening next events:
 * 
 * - user_${userId}_typing_in_chat_${chatId}
 * - user_${userId}_send_message_to_chat_${chatId}
 */
export const getChat = (body: TGetChatMessageFormat, broker: ChatBroker) => {
    return new Promise((resolve, reject) => {
        getChatInfo({ chatId: body.chat.id })
            .then((response: ChatDto) => {
                broker.setActiveChat(body.token, response);
                const userIdList = response.users.map((user: UserDto) => user.id);
                const onlineUsers = broker.getUsersOnline(userIdList).map(user => user.id);
                broker.actualizeChatInfo(response, onlineUsers);
                resolve({ 
                    method: EChatResponses.activeChat,
                    chat: { online: onlineUsers, ...response }
                });
            });
    });
};
