import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {

        if (!user_id) {
            throw new Error("User ID não fornecido");
        }

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                type_id: true,
                type: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        
        return user;
    }
}

export { DetailUserService };