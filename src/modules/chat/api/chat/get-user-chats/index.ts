import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserChatsParams } from "./dto/request";
import { TGetUserChatsResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TGetUserChatsResponse, any>;

/**
 * Returns all users chats
 * 
 * @param {TGetUserChatsParams} params 
 * @returns {Promise<Response>}
 */
export const getUserChats = (params: TGetUserChatsParams): Promise<Response> => {
    return request(`/chat/list?user=${params.userId}`, {}, ERequestMethods.GET);
};
