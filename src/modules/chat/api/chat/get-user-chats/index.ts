import { request } from "@src/utils/backendRequest";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserChatsParams } from "./dto/request";
import { TGetUserChatsResponse } from "./dto/response";

/**
 * Returns all users chats
 * 
 * @param {TGetUserChatsParams} params 
 * @returns {Promise<TGetUserChatsResponse>}
 */
export const getUserChats = (params: TGetUserChatsParams): Promise<TGetUserChatsResponse> => {
    return request(`/chat/list?user=${params.userId}`, {}, ERequestMethods.GET);
};
