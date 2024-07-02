import prismaClient from "../../prisma";

class DetailActivityService {
    async execute(activity_id: string) {

        if (!activity_id) {
            throw new Error("Atividade ID não fornecido");
        }

        const activity = await prismaClient.activityItem.findFirst({
            where: {
                id: activity_id
            },
            select: {
                id: true,
                description: true,
                dt_inicial: true,
                dt_final: true,
                category_id: true,
                category: {
                    select: {
                        description: true
                    }
                }
            }
        })

        if (!activity) {
            throw new Error("Atividade não encontrado");
        }
        
        return activity;
    }
}

export { DetailActivityService };