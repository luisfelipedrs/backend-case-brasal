import { Request, Response } from "express";
import { userService } from "../../services/user.service";
import { ApiError, BadRequestError } from "../util/api-error";

class UserController {

    login = async (req: Request, res: Response) => {
        if (!req.body.username) {
            throw new BadRequestError('O campo Usuário deve ser informado');
        }

        if (!req.body.password) {
            throw new BadRequestError('O campo Senha deve ser informado');
        }

        const result = await userService.login(req.body);

        if (result instanceof Error) {
            throw new ApiError(result.message, 500);
        }

        res.status(200).json(result);
    }

    register = async (req: Request, res: Response) => {
        if (!req.body.username) {
            throw new BadRequestError('O campo Usuário deve ser informado');
        }

        if (!req.body.password) {
            throw new BadRequestError('O campo Senha deve ser informado');
        }

        if (!req.body.confirmPassword) {
            throw new BadRequestError('O campo Confirmar Senha deve ser informado');
        }

        const password = req.body.password as string;
        const confirmPassword = req.body.confirmPassword as string;

        if (!(password === confirmPassword)) {
            throw new BadRequestError('As senhas devem ser iguais'); 
        }

        const result = await userService.register(req.body);

        if (result instanceof Error) {
            throw new ApiError(result.message, 500);
        }

        res.status(200).json({ message: 'Usuário cadastrado com sucesso!'});
    }
}

export const userController = new UserController();