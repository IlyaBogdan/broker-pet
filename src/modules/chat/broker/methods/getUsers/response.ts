import { UserDto } from "@src/modules/chat/dto/user";
import { EChatResponses } from "../../response";

export type TGetUsersBrokerResponse = {
    method: EChatResponses.setUserList,
    users: UserDto[]
};
