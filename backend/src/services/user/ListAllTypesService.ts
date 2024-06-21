import prismaClient from "../../prisma";

class ListAllTypesService {
    async execute() {
        try {
            const types = await prismaClient.userType.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return types;
        } catch (error) {
            console.error('Erro ao buscar tipos de usuário:', error);
            throw new Error('Erro ao buscar tipos de usuário');
        }
    }
}

export { ListAllTypesService };
