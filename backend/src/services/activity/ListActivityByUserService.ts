import prismaClient from "../../prisma";

export class ListActivityByUserService {
    async execute( user_id: string) {
        if (!user_id) {
            throw new Error("User ID não fornecido");
        }
        
        const listActivity = await prismaClient.activityItem.findMany({
            where: {
                user_id: user_id
            },
            select: {
                id: true,
                description: true,
                dt_inicial: true,
                dt_final: true,
                category: {
                    select: {
                        description: true
                    },
                },
                finalized: true,
                created_at: true
            },
            orderBy: [
                {
                    finalized: 'asc' // false values come first
                },
                {
                    dt_inicial: 'asc' // then sort by dt_inicial
                }
            ]
        });

        return listActivity;
    }
}