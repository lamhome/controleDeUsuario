import { LinkFirstAccessRequest } from "../../models/interfaces/password/LinkFirstAccessRequest";
import { PrismaClient } from '@prisma/client';
import emailService from '../../utils/SendEmail';
import { generateToken } from '../../utils/GenerateToken';

const prisma = new PrismaClient();

class LinkFirstAccessService {
    async execute({ email }: LinkFirstAccessRequest) {
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

        // Enviar email com link para primeiro acesso
        await emailService.sendMail(
            email, 
            'Validação de Conta', 
            `<html><body><p><b>${user.name}</b>,</p>
            <p>Para validar seu cadastro no sistema de Gestão de Acessos clique <a href="http://localhost:3000/user-validation?token=${token}">aqui.</a></p>
        </body></html>`);

        return { message: 'E-mail enviado com instruções de primeiro acesso.' };
    }
}

export { LinkFirstAccessService }