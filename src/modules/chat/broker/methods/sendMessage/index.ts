import { ChatBroker } from "../..";
import { saveMessage } from "../../../api/chat/message/save";
import { UserDto } from "../../../dto/user";
import { EChatResponses } from "../../response";
import { TSendMessageType } from "./message";
import { TSendMessageResponse } from "./response";

/**
 * This method accepts message from client and sends it to backend.
 * From backend we accept actual info about chat.
 * And then we send it to all active users
 * 
 * @param {TSendMessageType} body
 * @param {ChatBroker} broker
 * @returns {Promise<TSendMessageResponse>}
 */
export const sendMessage = (body: TSendMessageType, broker: ChatBroker): Promise<TSendMessageResponse> => {
    return new Promise((resolve) => {
        saveMessage({ chatId: body.chat.id, message: body.message })
            .then((response) => {
                if (response.isSuccess) {
                    const onlineUsers = broker.getUsersOnline(response.payload.users.map((user: UserDto) => user.id));
                    broker.actualizeChatInfo(response.payload, onlineUsers.map((user: UserDto) => user.id));
                    resolve({ 
                        method: EChatResponses.activeChat,
                        chat: {
                            online: onlineUsers.map((user: UserDto) => user.id),
                            ...response.payload
                        }
                    });
                } else {
                    //
                }
            });
    });
};
