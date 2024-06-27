import prismaClient from "../../prisma";
import { EditActivityRequest } from "../../models/interfaces/activity/EditActivityRequest";

export class EditActivityService {
    async execute({ activity_id, description, category_id, dt_inicial, dt_final }: EditActivityRequest){

        const activity = await prismaClient.activityItem.findFirst({
            where: {
                id: activity_id
            },
            select: {
                id: true
            }
        });
        
        
        if(!activity){
            throw new Error('Invalid Activity.');
        }

        const category = await prismaClient.activityCategory.findFirst({
            where: {
                id: category_id
            },
            select: {
                id: true
            }
        });
      
        if (!category) {
            throw new Error('Invalid Category.');
        }

        const final = new Date(dt_final);
        const inicial = new Date(dt_inicial);

        if (dt_final < dt_inicial) {
            throw new Error('Data inicial maior que data final.'); 
        }

        const activityEdited = await prismaClient.activityItem.update({
            where: {
                id: activity_id
            },
            data: {
                description: description,
                category_id: category.id,
                dt_inicial: inicial,
                dt_final: final
            }            
        });

        return activityEdited;
    }
}