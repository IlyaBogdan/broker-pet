import { request } from "@src/utils/backendRequest";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetChatInfoParams } from "./dto/request";
import { TGetChatInfoResponse } from "./dto/response";

/**
 * Returns info about chat by ID
 * 
 * @param {TCreateChatParams} params 
 * @returns {Promise<TGetChatInfoResponse>}
 */
export const getChatInfo = (params: TGetChatInfoParams): Promise<TGetChatInfoResponse> => {
    return request(`/chat/${params.chatId}`, params, ERequestMethods.GET);
};
