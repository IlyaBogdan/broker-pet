import { mockChat_1 } from "../../../../test/__mocks__/chat/chats";
import { mockUser_1, mockUser_2 } from "../../../../test/__mocks__/chat/users";
import { ChatDto } from "../../dto/chat.dto";
import { UserDto } from "../../dto/user.dto";

/**
 * Mock data for chat info
 */
export const mockSendMessage: ChatDto = mockChat_1

export const mockOnlineUsers: Array<UserDto> = [mockUser_1, mockUser_2];