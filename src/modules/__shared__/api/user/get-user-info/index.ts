import { request } from "@src/libs/request/request";
import { ERequestMethods } from "@src/utils/ERequestMethods";
import { TGetUserInfoRequest } from "./dto/request";
import { TGetUserInfoResponse } from "./dto/response";
import { TResponse } from "@src/libs/request/types";

export type Response = TResponse<TGetUserInfoResponse, any>;

/**
 * Method for creating chat between users
 * 
 * @param {TGetUserInfoRequest} params
 * @returns {Promise<Response>}
 */
export const getUserInfo = (params: TGetUserInfoRequest): Promise<Response> => {
    const { token } = params;
    return request(`/user?token=${token}`, {}, ERequestMethods.GET);
};
