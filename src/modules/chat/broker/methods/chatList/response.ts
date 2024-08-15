import { ChatDto } from "@src/modules/chat/dto/chat"
import { EChatResponses } from "../../response"

export type TChatListResponse = {
    method: EChatResponses.userDialogs,
    chats: ChatDto[]
};
