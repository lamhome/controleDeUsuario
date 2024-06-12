import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Verificar se o token contém o ID do usuário
    if (!decodedToken.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Buscar o tipo de usuário na tabela user
    const user = await prismaClient.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        type_id: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar se o tipo de usuário é administrador
    const userType = await prismaClient.userType.findFirst({
      where: {
        id: user.type_id,
        admin_default: true,
      },
    });

    if (!userType) {
      return res.status(403).json({ message: 'Access denied. User is not an administrator.' });
    }

    next(); // Usuário é administrador, continuar para a rota
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export { isAdmin };