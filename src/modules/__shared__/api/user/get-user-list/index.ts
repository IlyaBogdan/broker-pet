import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserListResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TGetUserListResponse, any>;

/**
 * Method for creating chat between users
 * 
 * @returns {Promise<Response>}
 */
export const getUserList = (): Promise<Response> => {
    return request('/user/list', {}, ERequestMethods.GET);
};
