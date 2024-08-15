import { BrokerApi } from "@src/libs/Broker/BrokerApi";
import { IChatBrokerMessage } from "./broker/message";
import { BackendAPI } from "@src/utils/BackendAPI";
import { UserDto } from "./dto/user";
import { ChatDto } from "./dto/chat";
import { ChatBroker } from "./broker";
import { EChatResponses } from "./broker/response";
import { TGetChatMessageFormat, TPullBrokerMessageFormat } from "./types";

/**
 * API methods for chat broker
 */
export const api: BrokerApi = {

    /**
     * This method set user online and notify all users, who has opened
     * chats with this user
     */
    pull: (body: TPullBrokerMessageFormat, broker: ChatBroker) => {
        return new Promise((resolve, reject) => {
            BackendAPI.getUserByToken(body.token)
                .then((response: UserDto) => {
                    broker.setOnlineUser(body.token, response);
                    resolve({
                        method: EChatResponses.setUser,
                        user: response
                    });
                });
        });
    },

    /**
     * This method show all active users in chat, who is writing some message
     */
    setTyping: (body: IChatBrokerMessage, broker: ChatBroker) => {
        return new Promise((resolve, reject) => {
            const users = body.chat.users.filter((userInChat) => userInChat.id != body.user.id);
            broker.notifyUserTyping(body.user, users, body.chat.id, body.typing);

            resolve({ method: EChatResponses.ok });
        });
    },

    /**
     * This method create new chat with user and sends it to backend.
     * From backend we accept actual info about chat
     */
    createChat: (body: IChatBrokerMessage, broker: ChatBroker) => {
        const users: Array<number> = body.users;
        const chat = {
            users,
            type: users.length > 2 ? 1 : 0
        };

        return new Promise((resolve, reject) => {
            BackendAPI.createChat(chat)
                .then((response: ChatDto) => {
                    broker.setActiveChat(body.token, response);
                    const users = broker.getUsersOnline(body.users);
                    resolve({ method: EChatResponses.activeChat, chat: Object.assign(response, {online: users})})
                });
        });
    },

    /**
     * This method retrives actual information about chat
     * 
     * User opened chat. After this method we push event listener
     * to current session and session will be listening next events:
     * 
     * - user_${userId}_typing_in_chat_${chatId}
     * - user_${userId}_send_message_to_chat_${chatId}
     */
    getChat: (body: TGetChatMessageFormat, broker: ChatBroker) => {
        return new Promise((resolve, reject) => {
            BackendAPI.getChatInfo(body.chat.id)
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
    },

    chatClosed: (body: IChatBrokerMessage) => {
        return new Promise((resolve, reject) => {
            BackendAPI.getChatInfo(body.chat.id)
                .then((response: ChatDto) => {
                    resolve({ 
                        method: EChatResponses.ok
                    });
                });
        });
    },

    /**
     * This method accepts message from client and sends it to backend.
     * From backend we accept actual info about chat.
     * And then we send it to all active users
     * 
     * 
     */
    sendMessage: (body: IChatBrokerMessage, broker: ChatBroker) => {
        return new Promise((resolve, reject) => {
            BackendAPI.saveMessage(body.chat.id, body.message)
                .then((response: ChatDto) => {
                    const onlineUsers = broker.getUsersOnline(response.users.map((user: UserDto) => user.id));
                    broker.actualizeChatInfo(response, onlineUsers.map((user: UserDto) => user.id));
                    resolve({ 
                        method: EChatResponses.activeChat,
                        chat: {
                            online: onlineUsers.map((user: UserDto) => user.id),
                            ...response
                        }
                    });
                });
        });
    },

    /**
     * This method return chat list for current user
     */
    chatList: (body: IChatBrokerMessage) => {
        return new Promise((resolve, reject) => {
            BackendAPI.getUsersChats(body.user.id, body.token)
                .then((chats: Array<ChatDto>) => {
                    resolve({ method: EChatResponses.userDialogs, chats });
                });
        });
    },

    /**
     * Return list of all users
     */
    getUsers: (body: IChatBrokerMessage) => {
        return new Promise((resolve, reject) => {
            BackendAPI.getUsers()
                .then((response: Array<UserDto>) => {
                    resolve({ method: EChatResponses.setUserList, users: response });
                });
        });
    },

    getOnlineUsers: (body: IChatBrokerMessage, broker: ChatBroker) => {
        return new Promise((resolve, reject) => {
            const users = broker.getUsersOnline(body.users);
            resolve({ method: EChatResponses.usersOnline, users });
        });
    },

    /**
     * Set user online
     */
    setOnline: (user: Object) => {
        //user.active = true;
        //broadCast.emit('broadcast', { method: 'setUserList', users: broker.users });
    }
}