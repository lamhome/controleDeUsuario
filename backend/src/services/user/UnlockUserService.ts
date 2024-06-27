import prismaClient from "../../prisma";
import { UnlockUserRequest } from "../../models/interfaces/user/UnlockUserRequest";

class UnlockUserService {
    async execute({ user_id }: UnlockUserRequest){

        const user = await prismaClient.user.update({
            where: { id: user_id },
            data: { 
                blocked: false,
                update_at: new Date()
            },
        });
        return user;
    }
}

export { UnlockUserService };