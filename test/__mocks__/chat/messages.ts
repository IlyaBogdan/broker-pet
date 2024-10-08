import { MessageDto } from '@chat/dto/message';
import { mockUser_1, mockUser_2, mockUser_3 } from './users'

/**
 * Mock data for messages in chats
 */

export const mockMessage_1: MessageDto = {
    id: 1,
    author: mockUser_1,
    message: 'Hello',
    created_at: new Date('2024-05-03T16:48:00')
};

export const mockMessage_2: MessageDto = {
    id: 2,
    author: mockUser_2,
    message: 'Hello',
    created_at: new Date('2024-05-03T16:48:15')
};

export const mockMessage_3: MessageDto = {
    id: 3,
    author: mockUser_1,
    message: 'How are you?',
    created_at: new Date('2024-05-03T16:49:00')
};

export const mockMessage_4: MessageDto = {
    id: 4,
    author: mockUser_2,
    message: 'Good',
    created_at: new Date('2024-05-03T16:50:00')
};

export const mockMessage_5: MessageDto = {
    id: 5,
    author: mockUser_2,
    message: 'Hello',
    created_at: new Date('2024-05-03T16:48:00')
};

export const mockMessage_6: MessageDto = {
    id: 6,
    author: mockUser_3,
    message: 'Goodbye',
    created_at: new Date('2024-05-03T16:49:00')
};
