import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma/index";
import { AuthRequest } from "../../models/interfaces/auth/AuthRequest";

class AuthUserService {
    async execute({ email, password }: AuthRequest){
        if (!email){
            throw new Error("Email precisa ser enviado!");
        }

        if (!password){
            throw new Error("A senha precisa ser enviada!");
        }
        
        //Verificar no banco de dados se existe um usuario com o email passado
        const user = await prismaClient.user.findFirst(
            {
                where: {
                    email: email
                }
            }
        );

        if (!user){
            throw new Error("Wrong username or password!");
        }

        // Verificar se o usuario esta ativo
        if (!user.activated){
            throw new Error("Inactive user!")
        }

        // Verificar se a senha do usuario esta correta
        const passwordMatch = await compare(password, user?.password)

        if (!passwordMatch){
            throw new Error("Wrong password");
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            userType: user?.type_id,
            token: token
        }
    }
}

export { AuthUserService }