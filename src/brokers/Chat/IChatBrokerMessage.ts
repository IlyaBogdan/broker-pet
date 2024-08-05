import { MessageDto } from "../dto/message.dto";
import { UserDto } from "../dto/user.dto";

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
