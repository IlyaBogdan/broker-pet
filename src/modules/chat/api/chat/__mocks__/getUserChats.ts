import { mockChat_1, mockChat_2 } from "@mocks/chat/chats";
import { ChatDto } from "@src/modules/chat/dto/chat";
import { Response } from "../get-user-chats";

/**
 * Mock data for getUserChats
 */
export const mockGetUserChats: ChatDto[] = [mockChat_1, mockChat_2];

export const mockUserChatsSuccessfullyAccepted: Response = {
    isSuccess: true,
    payload: mockGetUserChats
};
