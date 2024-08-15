import { getUserInfo } from "@src/modules/__shared__/api/user/get-user-info";
import { TPullBrokerMessageFormat } from "../../../types";
import { ChatBroker } from "../..";
import { UserDto } from "../../../dto/user";
import { EChatResponses } from "../../response";

/**
 * This method set user online and notify all users, who has opened
 * chats with this user
 */
export const pull = (body: TPullBrokerMessageFormat, broker: ChatBroker) => {
    return new Promise((resolve, reject) => {
        getUserInfo({ token: body.token })
            .then((response: UserDto) => {
                broker.setOnlineUser(body.token, response);
                resolve({
                    method: EChatResponses.setUser,
                    user: response
                });
            });
    });
};
