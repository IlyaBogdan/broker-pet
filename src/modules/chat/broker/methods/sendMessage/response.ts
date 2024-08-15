import { ChatDto } from "@src/modules/chat/dto/chat";
import { EChatResponses } from "../../response";

export type TSendMessageResponse = {
    method: EChatResponses.activeChat,
    chat: ChatDto & {
        online: number[],
    }
};
