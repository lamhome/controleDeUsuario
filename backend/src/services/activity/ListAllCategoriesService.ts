import prismaClient from "../../prisma";

class ListAllCategoriesService {
    async execute() {
        try {
            const types = await prismaClient.activityCategory.findMany({
                select: {
                    id: true,
                    description: true,
                },
            });
            return types;
        } catch (error) {
            console.error('Erro ao buscar categorias de atividades:', error);
            throw new Error('Erro ao buscar categorias de atividades:');
        }
    }
}

export { ListAllCategoriesService };
