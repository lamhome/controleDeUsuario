import prismaClient from "../../prisma";
import { DeleteActivityRequest } from "../../models/interfaces/activity/DeleteActivityRequest";

export class DeleteActivityService {
    async execute({ activity_id }: DeleteActivityRequest){
        if (!activity_id){
            throw new Error("Id da atividade não foi enviado!");
        }

        const removeActivity = await prismaClient.activityItem.delete({
            where: {
                id: activity_id
            },
        });
        return removeActivity;
    }
}