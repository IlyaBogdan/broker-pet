import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TSaveMessageParams } from "./dto/request";
import { TSaveMessageResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TSaveMessageResponse, any>;

/**
 * Save new message to chat
 * 
 * @param {TSaveMessageParams} params 
 * @returns {Promise<Response>}
 */
export const saveMessage = async (params: TSaveMessageParams): Promise<Response> => {
    return request(`/chat/${params.chatId}/save-message`, params.message, ERequestMethods.PUT);
};
