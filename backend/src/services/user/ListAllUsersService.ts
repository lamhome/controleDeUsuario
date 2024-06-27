import prismaClient from "../../prisma";

export class ListAllUsersService {
    async execute() {
        // Cria um objeto de filtros

        const listUsers = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                type_id: true,
                type: {
                    select: {
                        name: true
                    }
                },
                activated: true,
                created_at: true,
                blocked: true
            }
        });

        // Adiciona status ao usuário
        (listUsers as any[]).forEach(user => {
            user.status = user.activated ? 'Ativo' : 'Inativo';
        });

        return listUsers;
    }
}