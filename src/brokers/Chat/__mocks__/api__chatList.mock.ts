import { ChatDto } from "../../dto/chat.dto";
import { mockChat_1, mockChat_2 } from "../../../../test/__mocks__/chat/chats";
import { mockUser_1, mockUser_2 } from "../../../../test/__mocks__/chat/users";
import { UserDto } from "../../dto/user.dto";

/**
 * Mock data for chat list
 */
export const mockChatList: Array<ChatDto> = [mockChat_1, mockChat_2];

export const mockOnlineUsers: Array<UserDto> = [mockUser_1, mockUser_2];
