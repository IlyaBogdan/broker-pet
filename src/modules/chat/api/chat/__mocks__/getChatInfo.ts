import { mockChat_1 } from "@mocks/chat/chats";
import { ChatDto } from "@src/modules/chat/dto/chat";
import { Response } from "../get-chat-info";

/**
 * Mock data for getChatInfo
 */
export const mockGetChatInfo: ChatDto = mockChat_1;

export const mockChatInfoSuccesfullyAccepted: Response = {
    isSuccess: true,
    payload: mockGetChatInfo
};
