import prismaClient from "../../prisma";
import { DeleteActivityRequest } from "../../models/interfaces/activity/DeleteActivityRequest";

export class DeleteActivityService {
    async execute({ activity_id }: DeleteActivityRequest){
        if (!activity_id){
            throw new Error("Id da atividade não foi enviado!");
        }

        const removeActivity = await prismaClient.activityItem.update({
            where: {
                id: activity_id
            },
            data: { 
                finalized: true,
                update_at: new Date()
            },
        });
        return removeActivity;
    }
}