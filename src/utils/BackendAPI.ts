import { request } from "./backendRequest";
import chatModule from "./chat/chatModule";
import { ERequestMethods } from "./ERequestMethods";

const BackendAPI: any = {
    getUserByToken: (token: String) => {
        return new Promise((resolve, reject) => {
            request(`/user?token=${token}`, {}, ERequestMethods.GET)
                .then((response) => { resolve(response) });
        });
    },
    getUsers: () => {
        return new Promise((resolve, reject) => {
            request(`/user/list`, {}, ERequestMethods.GET)
                .then((response) => { resolve(response) });
        });
    }
};

Object.assign(BackendAPI, chatModule);

export { BackendAPI }