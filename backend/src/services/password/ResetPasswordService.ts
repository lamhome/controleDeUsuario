import { ResetPasswordRequest } from '../../models/interfaces/password/ResetPasswordRequest';
import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

class ResetPasswordService{

    async execute({user_id, newPassword}: ResetPasswordRequest) {
        
        const valide = await prisma.userKey.findFirst({
            where: { 
                user_id: user_id,
                activated: true,
                validated: true
            }
        });

        if (!valide) {
            throw new Error('Token invalido');
        }

        // Expressão Regular para validar a complexidade da senha
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;

        // Verifica se a senha atende aos critérios
        if (!passwordRegex.test(newPassword)) {
            throw new Error('A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
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

export { ResetPasswordService }
