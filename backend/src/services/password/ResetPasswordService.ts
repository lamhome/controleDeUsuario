import { ResetPasswordRequest } from '../../models/interfaces/password/ResetPasswordRequest';
import prisma from "../../prisma";
import { hash } from "bcryptjs";

class ResetPasswordService{

    async execute({user_id, password}: ResetPasswordRequest) {
        
        const user = await prisma.user.findFirst({
            where: { 
                id: user_id,
                blocked: false
            }
        });

        if (!user) {
            throw new Error('Usuário Invalido');
        }

        // Expressão Regular para validar a complexidade da senha
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;

        // Verifica se a senha atende aos critérios
        if (!passwordRegex.test(password)) {
            throw new Error('A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
        }

        const hashedPassword = await hash(password, 8); // Usando bcryptjs para hash da nova senha

        await prisma.user.update({
            where: { id: user_id },
            data: { password: hashedPassword },
        });

        return { message: 'Senha atualizada com sucesso!' };
    }

}

export { ResetPasswordService }
