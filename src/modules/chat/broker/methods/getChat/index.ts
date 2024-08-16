import { ChatBroker } from "../..";
import { getChatInfo } from "@chat/api/chat/get-chat-info";
import { UserDto } from "@chat/dto/user";
import { EChatResponses } from "../../response";
import { TGetChatMessageFormat } from "./message";
import { TGetChatResponse } from "./response";

/**
 * This method retrives actual information about chat
 * 
 * User opened chat. After this method we push event listener
 * to current session and session will be listening next events:
 * 
 * - user_${userId}_typing_in_chat_${chatId}
 * - user_${userId}_send_message_to_chat_${chatId}
 * 
 * @param {TGetChatMessageFormat} body
 * @param {ChatBroker} broker
 * @returns {Promise<TGetChatResponse>}
 */
export const getChat = (
    body: TGetChatMessageFormat,
    broker: ChatBroker
): Promise<TGetChatResponse> => {
    return new Promise((resolve) => {
        getChatInfo({ chatId: body.chat.id })
            .then((response) => {
                if (response.isSuccess) {
                    console.log(response.payload);
                    const chat = response.payload;
                    broker.setActiveChat(body.token, chat);
                    const userIdList = chat.users.map((user: UserDto) => user.id);
                    const onlineUsers = broker.getUsersOnline(userIdList).map(user => user.id);
                    broker.actualizeChatInfo(chat, onlineUsers);
                    resolve({ 
                        method: EChatResponses.activeChat,
                        chat: {
                            online: onlineUsers,
                            ...chat
                        }
                    });
                } else {
                    //
                }
            });
    });
};
