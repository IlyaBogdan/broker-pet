import { request } from "@src/utils/backendRequest";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TCreateChatParams } from "./dto/request";
import { TCreateChatResponse } from "./dto/response";

/**
 * Method for creating chat between users
 * 
 * @param {TCreateChatParams} params 
 * @returns {Promise<TCreateChatResponse>}
 */
export const createChat = (params: TCreateChatParams): Promise<TCreateChatResponse> => {
    return request(`/chat`, params, ERequestMethods.POST);
};
