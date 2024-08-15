import { UserDto } from "@chat/dto/user";
import { mockUser_1 } from "@mocks/chat/users";
import { Response } from "../get-user-info";

/**
 * Mock data for getUserInfo
 */
export const mockGetUserInfo: UserDto = mockUser_1;

export const mockUserInfoSuccessfullyAccepted: Response = {
    isSuccess: true,
    payload: mockGetUserInfo
};
