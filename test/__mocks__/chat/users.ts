import { UserDto } from '../../../src/brokers/dto/user.dto';

/**
 * Mock data for users
 */

export const mockUser_1: UserDto = {
    id: 1,
    email: 'someuser@gmail.com',
    first_name: 'John',
    last_name: 'Snow',
    created_at: new Date('2024-04-03')
};

export const mockUser_2: UserDto = {
    id: 2,
    email: 'someuser2@gmail.com',
    first_name: 'John',
    last_name: 'Cooper',
    created_at: new Date('2024-05-04')
};

export const mockUser_3: UserDto = {
    id: 2,
    email: 'someuser3@gmail.com',
    first_name: 'Alice',
    last_name: 'Cooper',
    created_at: new Date('2024-06-07')
};

