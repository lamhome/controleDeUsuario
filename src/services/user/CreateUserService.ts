import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserService{
    async execute({name, email, password}: UserRequest) {
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
                type_id: "031f1003-42e8-4bf9-b6ba-6362ea48422a", // criar sempre como usuário
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