import { UserDto } from "@src/modules/chat/dto/user";

export type TGetUsersMessage = {
    token: string,
    user: UserDto
};
