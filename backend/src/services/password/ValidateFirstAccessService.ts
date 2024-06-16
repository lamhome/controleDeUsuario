import prismaClient from "../../prisma";

class ValidateFirstAccessService {
    async execute({token}) {
    
        const userKey = await prismaClient.userKey.findFirst({
            where: {
              key: token, // Usa o operador equals para comparar o token
              activated: true, // Verifica se o token esta ativo
              validated: false, // Verifica se o token ja foi usado
              expired_at: {
                gt: new Date(), // Verifica se expired_at é maior que a data atual
              },
            },
        });

        if (!userKey) {
            throw new Error('Token inválido ou expirado');
        }

        // marcar como ativado
        await prismaClient.user.updateMany({
            where: { id: userKey.user_id },
            data: { 
                activated: true,
                update_at: new Date()
            },
          });

        // marcar como validado
        await prismaClient.userKey.updateMany({
          where: { key: token },
          data: { validated: true },
        });

        return (userKey.user_id);
    }
}

export { ValidateFirstAccessService }