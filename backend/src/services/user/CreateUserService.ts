import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

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

        // Encriptando a nossa senha do usuário
        const passwordHash = await hash(password, 8);


        // Criando nosso usuário
        const user = prismaClient.user.create({
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

        return user;
    }
}

export { CreateUserService }