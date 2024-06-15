import { ResetPasswordWithTokenRequest } from '../../models/interfaces/user/password/ResetPasswordWithTokenRequest';
import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

class ResetPasswordWithTokenService{

    async execute({user_id, newPassword}: ResetPasswordWithTokenRequest) {
        
        const validated = await prisma.userKey.findFirst({
            where: { 
                user_id: user_id,
                activated: true,
                validated: true
            },
            select: {
                validated: true
            }
        });

        if (!validated) {
            throw new Error('Token não validado');
        }
    
        const hashedPassword = await hash(newPassword, 8); // Usando bcryptjs para hash da nova senha

        await prisma.user.update({
            where: { id: user_id },
            data: { password: hashedPassword },
        });

        // Desativar todos os tokens do usuário
        await prisma.userKey.updateMany({
            where: { user_id: user_id, activated: true },
            data: { activated: false },
        });

        return { message: 'Senha atualizada com sucesso!' };
    }

}

export { ResetPasswordWithTokenService }
