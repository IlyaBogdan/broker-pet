import { UserDto } from "@src/modules/chat/dto/user"
import { EChatResponses } from "../../response"

export type TPullResponse = {
    method: EChatResponses.setUser,
    user: UserDto
}