import { PrismaClient } from '@prisma/client';
import emailService from '../../utils/SendEmail';
import { generateToken } from '../../utils/GenerateToken';
import { ForgotPasswordRequest } from '../../models/interfaces/password/ForgotPasswordRequest';

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
        await emailService.sendMail(
            user.email, 
            'Link de Recuperação', 
            `<html><body><p><b>${user.name}</b>,</p>
            <p>Foi solicitado a recuperação de senha de seu usuário no sistema Gestão de Acessos. Para redefinir sua senha acesse <a href="http://localhost:3000/change-password?token=${token}">aqui.</a></p>
            <p>Caso você não tenha realizado esse pedido, favor desconsiderar esse e-mail.</p>
            </body></html>`
        );
    
        return { message: 'E-mail enviado com instruções.' };
    }
}

export { ForgotPasswordService }