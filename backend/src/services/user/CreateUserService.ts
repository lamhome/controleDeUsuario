import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest";
import emailService from '../../utils/SendEmail';
import { generateToken } from '../../utils/GenerateToken';

class CreateUserService{
    async execute({name, email, password}: UserRequest) {

        const defaultType = await prismaClient.userType.findFirst({
            where: {
                user_default: true
            },
            select: {
                id: true
            }
        });
      
        if (!defaultType) {
            throw new Error('No default user type found.'); // Nenhum tipo padrão de usuário encontrado.
        }
        

        if(!email){
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists){
            throw new Error("Email already exists");
        }

        // Expressão Regular para validar a complexidade da senha
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;

        // Verifica se a senha atende aos critérios
        if (!passwordRegex.test(password)) {
            throw new Error('A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
        }

        // Encriptando a nossa senha do usuário
        const passwordHash = await hash(password, 8);

        // Criando nosso usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                type_id: defaultType.id, // criar sempre como usuário
                image: "171549900.gif", // criar o usuario sempre com uma foto padrao
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        
        const token = generateToken();
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 20);

        await prismaClient.userKey.create({
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

        return user;
    }
}

export { CreateUserService }