import { ChatDto } from "@chat/dto/chat";
import { mockChat_1 } from "@mocks/chat/chats";
import { Response } from "../create";

/**
 * Mock data for creating chat
 */
export const mockCreateChat: ChatDto = mockChat_1;

export const mockChatSuccessfullyCreated: Response = {
    isSuccess: true,
    payload: mockCreateChat
};
