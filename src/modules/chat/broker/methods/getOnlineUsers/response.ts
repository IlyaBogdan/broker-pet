import { UserDto } from "@src/modules/chat/dto/user"
import { EChatResponses } from "../../response"

export type TGetOnlineUsersBrokerResponse = {
    method: EChatResponses.usersOnline,
    users: UserDto[]
};
