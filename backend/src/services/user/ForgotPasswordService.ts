import { ForgotPasswordRequest } from '../../models/interfaces/user/password/ForgotPasswordRequest';
import { PrismaClient } from '@prisma/client';
import emailService from '../../utils/SendEmail';
import { generateToken } from '../../utils/GenerateToken';

const prisma = new PrismaClient();

class ForgotPasswordService {
    async execute({ email }: ForgotPasswordRequest) {
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const token = generateToken();
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 20);

        // Desativar todos os tokens anteriores do usuário
        await prisma.userKey.updateMany({
            where: { user_id: user.id, activated: true },
            data: { activated: false },
        });

        await prisma.userKey.create({
            data: {
                key: token,
                created_at: new Date(),
                expired_at: expirationTime,
                activated: true,
                user_id: user.id,
            },
        });

        // Enviar email com link de recuperação
        await emailService.sendMail(user.email, 'Link de Recuperação', `Clique aqui para recuperar sua senha: http://localhost:3333/v1/validate-token?token=${token}`);
    
        return { message: 'E-mail enviado com instruções de recuperação.' };
    }
}

export { ForgotPasswordService }