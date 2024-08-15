import { mockChat_1 } from "@mocks/chat/chats";
import { ChatDto } from "@chat/dto/chat";
import { Response } from "../message/save";

/**
 * Mock data for saveMessage
 */
export const mockSaveMessage: ChatDto = mockChat_1

export const mockMessageSuccesfullySaved: Response = {
    isSuccess: true,
    payload: mockSaveMessage
};
