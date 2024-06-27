import prismaClient from "../../prisma";
import { CreateActivityRequest } from "../../models/interfaces/activity/CreateActivityRequest";

export class CreateActivityService {
    async execute({ description, category_id, dt_inicial, dt_final, user_id }: CreateActivityRequest) {
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

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true
            }
        });
      
        if (!user) {
            throw new Error('Invalid User.'); 
        }

        const final = new Date(dt_final);
        const inicial = new Date(dt_inicial);

        if (final < inicial) {
            throw new Error('Data inicial maior que data final.'); 
        }

        const activity = await prismaClient.activityItem.create({
            data: {
                description: description,
                category_id: category.id,
                dt_inicial: inicial,
                dt_final: final,
                user_id: user.id
            },
            select: {
                id: true,
                description: true,
                category_id: true,
                dt_inicial: true,
                dt_final: true,
                user_id: true
            }
            
        })

        return activity;
    }
}