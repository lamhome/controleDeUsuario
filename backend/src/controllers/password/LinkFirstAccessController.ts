import { Request, Response } from 'express';
import { LinkFirstAccessRequest } from '../../models/interfaces/password/LinkFirstAccessRequest';
import { LinkFirstAccessService } from '../../services/password/LinkFirstAccessService';

class LinkFirstAccessController {
    async handle(request: Request, response: Response) {
        try {
            const { email }: LinkFirstAccessRequest = request.body;
            const linkFirstAccessService = new LinkFirstAccessService();
            const requestData: LinkFirstAccessRequest = { email };
            const result = await linkFirstAccessService.execute(requestData);
            response.status(200).json(result);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export { LinkFirstAccessController }