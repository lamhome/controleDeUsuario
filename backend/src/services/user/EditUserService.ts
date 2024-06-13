import prismaClient from "../../prisma";
import { EditUserRequest } from "../../models/interfaces/user/EditUserRequest";

class EditUserService{
    async execute({name, email, image, type_id, user_id}: EditUserRequest){
        const userEdited = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data:{
                name: name,
                email: email,
                image: image,
                type_id: type_id
            }
        });
        return userEdited;
    }
}

export { EditUserService }