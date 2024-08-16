import { UserDto } from "@chat/dto/user";
import { mockUser_1, mockUser_2, mockUser_3 } from "@mocks/chat/users";
import { Response } from "../get-user-list";

/**
 * Mock data for getUserList
 */
export const mockGetUserList: UserDto[] = [mockUser_1, mockUser_2, mockUser_3];

export const mockUserListSuccessfullyAccepted: Response = {
    isSuccess: true,
    payload: mockGetUserList
};
