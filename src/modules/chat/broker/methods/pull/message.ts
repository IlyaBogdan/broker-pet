import { UserDto } from "@src/modules/chat/dto/user"

export type TPullBrokerMessageFormat = {
    token: string,
    user: UserDto,
    date: Date
};
