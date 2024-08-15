import { getUserChats } from "@chat/api/chat/get-user-chats";
import { EChatResponses } from "../../response";
import { TChatListParams } from "./message";
import { TChatListResponse } from "./response";

/**
 * This method return chat list for current user
 * 
 * @param {TChatListParams} body
 * @returns {Promise<TChatListResponse>}
 */
export const chatList = (body: TChatListParams): Promise<TChatListResponse> => {
    return new Promise((resolve, reject) => {
        getUserChats({ userId: body.user.id })
            .then((response) => {
                if (response.isSuccess) {
                    resolve({ 
                        method: EChatResponses.userDialogs,
                        chats: response.payload
                    });
                } else {
                    //
                }
            });
    });
};
