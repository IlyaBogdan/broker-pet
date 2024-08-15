import { request } from "@src/utils/backendRequest";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserInfoRequest } from "./dto/request";
import { TGetUserInfoResponse } from "./dto/response";

/**
 * Method for creating chat between users
 * 
 * @param {TGetUserInfoRequest} params
 * @returns {Promise<TGetUserInfoResponse>}
 */
export const getUserInfo = (params: TGetUserInfoRequest): Promise<TGetUserInfoResponse> => {
    const { token } = params;
    return request(`/user?token=${token}`, {}, ERequestMethods.GET);
};
