import { request } from "../backendRequest";
import { ChatDto } from "../../brokers/dto/chat.dto";
import { MessageDto } from "../../brokers/dto/message.dto";
import { ERequestMethods } from "../ERequestMethods";

/**
 * Module for real-time chat
 */
export default {
    /**
     * Method for creating chat between users
     * 
     * @param {ChatDto} chatInfo 
     * @returns {Promise<ChatDto>}
     */
    createChat: (chatInfo: ChatDto): Promise<ChatDto> => {
        return new Promise((resolve, reject) => {
            request(`/chat`, chatInfo, ERequestMethods.POST)
                .then((response) => { resolve(response) });
        });
    },

    /**
     * Returns info about chat by ID
     * 
     * @param {number} chatId chat ID
     * @returns {Promise<ChatDto>}
     */
    getChatInfo: (chatId: number): Promise<ChatDto> => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}`, {}, ERequestMethods.GET)
                .then((response) => { resolve(response) });
        });
    },

    /**
     * Save new message to chat
     * 
     * @param {number} chatId chat ID
     * @param {MessageDto} message message content
     * @returns {Promise<MessageDto>}
     */
    saveMessage: (chatId: number, message: MessageDto): Promise<MessageDto> => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}/save-message`, message, ERequestMethods.PUT)
                .then((response) => { resolve(response) });
        });
    },

    /**
     * Delete message from chat
     * 
     * @param {number} chatId chat ID
     * @param {number} messageId message ID
     * @returns {Promise<MessageDto>}
     */
    deleteMessage: (chatId: number, messageId: number): Promise<MessageDto> => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}?message=${messageId}`, {}, ERequestMethods.DELETE)
                .then((response) => { resolve(response) });
        });
    },

    /**
     * Update message info in chat
     * 
     * @param {number} chatId chat ID
     * @param {MessageDto} message message content
     * @returns {Promise<MessageDto>}
     */
    updateMessage: (chatId: number, message: MessageDto): Promise<MessageDto> => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}?message=${message.id}`, message, ERequestMethods.PATCH)
                .then((response) => { resolve(response) });
        });
    },

    /**
     * Returns all users chats
     * 
     * @param {number} userId user ID
     * @returns {Promise<[ChatDto]>}
     */
    getUsersChats: (userId: number): Promise<[ChatDto]> => {
        return new Promise((resolve, reject) => {
            request(`/chat/list?user=${userId}`, {}, ERequestMethods.GET)
                .then((response) => { resolve(response) });
        });
    }
}