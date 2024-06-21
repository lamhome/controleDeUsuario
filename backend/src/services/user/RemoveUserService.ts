import prismaClient from "../../prisma";
import { RemoveUserRequest } from "../../models/interfaces/user/RemoveUserRequest";

class RemoveUserService {
    async execute({ user_id }: RemoveUserRequest){

        if (user_id){
            const validaKey = await prismaClient.userKey.findMany({
                where: {
                    user_id: user_id
                }
            })

            if (validaKey){
                await prismaClient.userKey.deleteMany({
                    where: {
                        user_id: user_id
                    }
                })
            }
        }else{
            throw new Error("Id do usuário não foi enviado!");
        }

        await prismaClient.user.delete({
            where: {
                id: user_id
            }
        })
        return { message: 'Usuário removido com sucesso!' };
    }
}

export { RemoveUserService };