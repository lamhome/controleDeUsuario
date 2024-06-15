import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { router } from './routes';
import path from "path";

const app = express();
const port = 3333;
app.use(express.json());
app.use(cors());
app.use('/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Erro Interno do Servidor.'
    })
})

app.get('/terms', (request: Request, response: Response) => {
    return response.json({
        message: "Termos de serviço"
    })
});

app.listen(port, () =>{
    console.log("Projeto Gestão de Usuários")
});