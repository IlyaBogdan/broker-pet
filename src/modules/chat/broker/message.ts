import { MessageDto } from "../dto/message";
import { UserDto } from "../dto/user";

interface IUserIncomming {
    id: number,
};

interface IChatIncomming {
    users: any,
    id: number,
};

export interface IChatBrokerMessage {
    user?: UserDto,
    dst?: IUserIncomming,
    token: string,
    chat?: IChatIncomming,
    content?: string,
    users?: Array<number>,
    message?: MessageDto,
    typing?: Boolean
};
