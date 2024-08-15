import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TCreateChatParams } from "./dto/request";
import { TCreateChatResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TCreateChatResponse, any>;

/**
 * Method for creating chat between users
 * 
 * @param {TCreateChatParams} params 
 * @returns {Promise<Response>}
 */
export const createChat = (params: TCreateChatParams): Promise<Response> => {
    return request(`/chat`, params, ERequestMethods.POST);
};
