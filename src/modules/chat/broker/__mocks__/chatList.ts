import { ChatDto } from "@chat/dto/chat";
import { mockChat_1, mockChat_2 } from "@mocks/chat/chats";
import { mockUser_1, mockUser_2 } from "@mocks/chat/users";
import { UserDto } from "@chat/dto/user";

/**
 * Mock data for chat list
 */
export const mockChatList: ChatDto[] = [mockChat_1, mockChat_2];

export const mockOnlineUsers: UserDto[] = [mockUser_1, mockUser_2];
