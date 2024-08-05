import { ChatDto } from "../../dto/chat.dto";
import { UserDto } from "../../dto/user.dto";

export class UserSendMessage extends Event {

    constructor(user: UserDto, chat: ChatDto) {
        const id = `user_${user.id}_send_message_to_chat_${chat.id}`;
        super(id);
    }
}