import { ChatDto } from '../../../src/brokers/dto/chat.dto';
import { mockUser_1, mockUser_2, mockUser_3 } from './users'
import { mockMessage_1, mockMessage_2, mockMessage_3, mockMessage_4, mockMessage_5, mockMessage_6 } from './messages';

/**
 * Mock data for chats
 */

export const mockChat_1: ChatDto = {
    id: 1,
    type: 0,
    users: [mockUser_1, mockUser_2],
    messages: [mockMessage_1, mockMessage_2, mockMessage_3, mockMessage_4],
    created_at: new Date('2024-04-03'),
    updated_at: new Date('2024-04-03'),
};

export const mockChat_2: ChatDto = {
    id: 2,
    type: 0,
    users: [mockUser_2, mockUser_3],
    messages: [mockMessage_5, mockMessage_6],
    created_at: new Date('2024-04-03'),
    updated_at: new Date('2024-04-03'),
};
