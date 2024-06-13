import express, { Request, Response, NextFunction } from "express";
import { router } from './routes';
import "express-async-errors";

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);
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

app.listen(port, () =>{
    console.log("Projeto Gestão de Usuários")
});