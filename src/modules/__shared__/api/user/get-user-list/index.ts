import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserListResponse } from "./dto/response";

/**
 * Method for creating chat between users
 * 
 * @returns {Promise<TGetUserListResponse>}
 */
export const getUserList = (): Promise<TGetUserListResponse> => {
    return request('/user/list', {}, ERequestMethods.GET);
};
