import { getUserList } from "@src/modules/__shared__/api/user/get-user-list";
import { IChatBrokerMessage } from "../../message";
import { UserDto } from "../../../dto/user";
import { EChatResponses } from "../../response";

/**
 * Return list of all users
 */
export const getUsers = (body: IChatBrokerMessage) => {
    return new Promise((resolve, reject) => {
        getUserList()
            .then((response: UserDto[]) => {
                resolve({ method: EChatResponses.setUserList, users: response });
            });
    });
};
