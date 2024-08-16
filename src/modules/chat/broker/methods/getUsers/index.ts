import { getUserList } from "@src/modules/__shared__/api/user/get-user-list";
import { EChatResponses } from "../../response";
import { TGetUsersBrokerResponse } from "./response";
import { TGetUsersMessage } from "./message";

/**
 * Return list of all users
 * 
 * @param {TGetUsersMessage} body
 * @returns {Promise<TGetUsersBrokerResponse>}
 */
export const getUsers = (body: TGetUsersMessage): Promise<TGetUsersBrokerResponse> => {
    return new Promise((resolve) => {
        getUserList()
            .then((response) => {
                if (response.isSuccess) {
                    resolve({
                        method: EChatResponses.setUserList,
                        users: response.payload
                    });
                }
            });
    });
};
