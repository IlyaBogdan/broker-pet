import { ChatDto } from "@chat/dto/chat";
import { mockChat_1 } from "@mocks/chat/chats";
import { mockUser_1, mockUser_2 } from "@mocks/chat/users";
import { UserDto } from "@chat/dto/user";

/**
 * Mock data for creating chat
 */
export const mockCreateChat: ChatDto = mockChat_1;

export const mockOnlineUsers: UserDto[] = [mockUser_1, mockUser_2];
