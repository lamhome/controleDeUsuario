import prismaClient from "../../prisma";

class ValidateTokenService {

    async execute({token}) {
    
        const userKey = await prismaClient.userKey.findFirst({
            where: {
              key: token, // Verifica se o token existe
              activated: true, // Verifica se o token esta ativo
              expired_at: {
                gt: new Date(), // Verifica se expired_at é maior que a data atual
              },
            },
          });

        if (!userKey || userKey.expired_at < new Date()) {
            throw new Error('Token inválido ou expirado');
        }

        // marcar como validado
        await prismaClient.userKey.updateMany({
          where: { key: token },
          data: { validated: true },
        });

        return (userKey.user_id);
    }
}

export { ValidateTokenService }