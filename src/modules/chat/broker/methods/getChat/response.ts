import { ChatDto } from "@src/modules/chat/dto/chat";
import { EChatResponses } from "../../response";

export type TGetChatResponse = {
    method: EChatResponses.activeChat,
    chat: ChatDto & {
        online: number[],
    }
};
