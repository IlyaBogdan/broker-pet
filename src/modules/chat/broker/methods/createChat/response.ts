import { ChatDto } from "@src/modules/chat/dto/chat"
import { EChatResponses } from "../../response"
import { UserDto } from "@src/modules/chat/dto/user";

export type TChatCreated = {
    method: EChatResponses.activeChat,
    chat: ChatDto & {
        online: UserDto[]
    }
};
