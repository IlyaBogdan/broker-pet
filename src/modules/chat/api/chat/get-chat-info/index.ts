import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetChatInfoParams } from "./dto/request";
import { TGetChatInfoResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TGetChatInfoResponse, any>;

/**
 * Returns info about chat by ID
 * 
 * @param {TCreateChatParams} params 
 * @returns {Promise<Response>}
 */
export const getChatInfo = (params: TGetChatInfoParams): Promise<Response> => {
    return request(`/chat/${params.chatId}`, {}, ERequestMethods.GET);
};
