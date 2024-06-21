import { ResetForgotPasswordRequest } from '../../models/interfaces/password/ResetForgotPasswordRequest';
import prisma from "../../prisma";
import { hash } from "bcryptjs";

class ResetForgotPasswordService{

    async execute({token, password}: ResetForgotPasswordRequest) {

        const userKey = await prisma.userKey.findFirst({
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

        const user = await prisma.user.findFirst({
            where: { 
                id: userKey.user_id
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
            where: { id: userKey.user_id },
            data: { password: hashedPassword },
        });

        await prisma.userKey.updateMany({
            where:{ user_id: userKey.user_id},
            data: { activated: false}
        })

        return true;
    }

}

export { ResetForgotPasswordService }
