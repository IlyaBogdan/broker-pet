import { EventEmitter } from 'events';

import { ChatDto } from "../../dto/chat.dto";
import { UserDto } from "../../dto/user.dto";

export class UserTyping extends EventEmitter {

    constructor(user: UserDto, chat: ChatDto, typing: Boolean) {
        super();
        const signature = `user_${user.id}_typing_in_chat_${chat.id}_${ typing ? 'start' : 'stop' }`;
    }

}