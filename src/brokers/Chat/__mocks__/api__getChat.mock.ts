import { ChatDto } from "../dto/chat.dto";
import { mockChat_1 } from "../../../../test/__mocks__/chat/chats";
import { mockUser_1, mockUser_2 } from "../../../../test/__mocks__/chat/users";
import { UserDto } from "../dto/user.dto";

/**
 * Mock data for chatInfo
 */
export const mockGetChat: ChatDto = mockChat_1;

export const mockOnlineUsers: UserDto[] = [mockUser_1, mockUser_2];
