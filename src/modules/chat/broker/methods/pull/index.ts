import { getUserInfo } from '@shared/api/user/get-user-info';
import { ChatBroker } from "../..";
import { UserDto } from '@chat/dto/user';
import { EChatResponses } from '../../response';
import { TPullBrokerMessageFormat } from './message';
import { TPullResponse } from './response';

/**
 * This method set user online and notify all users, who has opened
 * chats with this user
 * 
 * @param {TPullBrokerMessageFormat} body
 * @param {ChatBroker} broker
 * @returns {Promise<TPullResponse>}
 */
export const pull = (body: TPullBrokerMessageFormat, broker: ChatBroker): Promise<TPullResponse> => {
    return new Promise((resolve, reject) => {
        getUserInfo({ token: body.token })
            .then((response) => {
                if (response.isSuccess) {
                    broker.setOnlineUser(body.token, response.payload);
                    resolve({
                        method: EChatResponses.setUser,
                        user: response.payload
                    });
                } else {
                    //
                }
            });
    });
};
