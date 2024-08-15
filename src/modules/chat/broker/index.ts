import { Broker } from '@src/libs/Broker/Broker';
import { BrokerMethods } from '@src/libs/Broker/types';
import { UserDto } from '../dto/user';
import { ChatDto } from '../dto/chat';
import methods from './methods';
import WebSocket from 'ws';

interface IBroadcastChatMessage {
    method: string,
    [key: string]: any | boolean,
}

export class ChatBroker extends Broker {

    /**
     * List of chats
     */
    private activeChats: ChatDto[] = []

    /**
     * @inheritdoc
     */
    protected get methods(): BrokerMethods {
        return methods;
    }

    /**
     * If user connected to broker, set him online
     * 
     * @param {string} userToken user connection token
     * @param {UserDto} user user info 
     * @returns {void}
     */
    public setOnlineUser(userToken: string, user: UserDto): void {
        const session = this.sessionStore.getSessionByToken(userToken);
        session.setOnline(true).setUser(user);
    }

    /**
     * Returns list of connected users
     * 
     * @param {number[]} users list of user's ID
     * @returns {UserDto[]} list of online users in chat
     */
    public getUsersOnline(users: number[]): UserDto[] {
        const sessions = this.sessionStore.getSessions().filter((session) => {
            return users.indexOf(session.getUser()?.id) != -1 && session.getOnline();
        });

        return sessions.map(session => session.getUser());
    }

    /**
     * Sends all users in chat actual info about it
     * 
     * @param {ChatDto} chat chat info 
     * @param {number[]} onlineUsers list of online user's ID in chat
     * @returns {void}
     */
    public actualizeChatInfo(chat: ChatDto, onlineUsers: number[]): void {
        const sessions = this.sessionStore.getSessions().filter((session) => {
            return onlineUsers.indexOf(session.getUser()?.id) !== -1 && session.getOnline();
        });

        let connections = [];
        sessions.forEach((session) => {
            session.getConnections().forEach((connection) => {
                connections.push(connection.ws);
            })
        });

        this.broadcastForUsers(connections, { 
            method: 'activeChat',
            chat: { online: onlineUsers, ...chat }
        });
    }

    /**
     * If user opened chat, it will be written on session
     * 
     * @param {string} userToken user token
     * @param {ChatDto} chat chat info
     * @returns {ChatBrocker}
     */
    public setActiveChat(userToken: string, chat: ChatDto): ChatBroker {
        const session = this.sessionStore.getSessionByToken(userToken);
        const connection = session.getConnectionByToken(userToken);
        connection.optional.activeChat = chat;
        if (!this.activeChats.filter(activeChat => activeChat.id == chat.id)[0]) {
            this.activeChats.push(chat);
        }
        
        return this;
    }

    /**
     * Shows other users that somebody in chat is typing new message
     * 
     * @param {UserDto} who typing user
     * @param {UserDto[]} users users that will be notified
     * @param {number} chatId chat ID
     * @param {boolean} state typing or no
     * @returns {void}
     */
    public notifyUserTyping(who: UserDto, users: UserDto[], chatId: number, state: Boolean): void {
        const chat = this.activeChats.filter((chat) => chat.id == chatId)[0];
        const userIds = users.map(user => user.id);

        const sessions = this.sessionStore.getSessions().filter((session) => {
            const userId = session.getUser().id;
            return userIds.indexOf(userId) != -1;
        });

        let connections = [];
        sessions.forEach((session) => {
            session.getConnections().forEach((connection) => {
                connections.push(connection.ws);
            })
        });
        
        this.broadcastForUsers(connections, { 
            method: 'userTyping',
            user: who,
            chat,
            state: state 
        });
    }

    /**
     * Notify all users in chat that somebody send new message
     * 
     * @param {WebSocket[]} sessions user's sessions in that will be sended broadcast message
     * @param {IBroadcastChatMessage} message broadcast message info
     * @returns {void}
     */
    protected broadcastForUsers(sessions: WebSocket[], message: IBroadcastChatMessage): void {
        sessions.forEach((session) => {
            session.send(JSON.stringify(message));
        });
    }
}