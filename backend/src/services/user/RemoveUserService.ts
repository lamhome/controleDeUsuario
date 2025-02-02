import prismaClient from "../../prisma";
import { RemoveUserRequest } from "../../models/interfaces/user/RemoveUserRequest";

class RemoveUserService {
    async execute({ user_id }: RemoveUserRequest){

        const user = await prismaClient.user.update({
            where: { id: user_id },
            data: { 
                blocked: true,
                update_at: new Date()
            },
        });
        return user;
    }
}

export { RemoveUserService };