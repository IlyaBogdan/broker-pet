import { request } from "@src/utils/backendRequest";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TSaveMessageParams } from "./dto/request";
import { TSaveMessageResponse } from "./dto/response";

/**
 * Save new message to chat
 * 
 * @param {TSaveMessageParams} params 
 * @returns {Promise<TSaveMessageResponse>}
 */
export const saveMessage = (params: TSaveMessageParams): Promise<TSaveMessageResponse> => {
    return request(`/chat/${params.chatId}/save-message`, params.message, ERequestMethods.PUT);
};
