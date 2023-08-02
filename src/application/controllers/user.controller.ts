import { Request, Response } from "express";
import { userService } from "../../services/user.service";

class UserController {

    login = async (req: Request, res: Response) => {
        const result = await userService.login(req.body);

        if (result instanceof Error) {
            return res.status(500).json({
                error: result.message
            });
        };

        res.status(200).json(result);
    };

    register = async (req: Request, res: Response) => {
        const result = await userService.register(req.body);

        if (result instanceof Error) {
            return res.status(500).json({
                error: result.message
            });
        };

        res.status(200).json('Usuário cadastrado com sucesso!');
    };
}

export const userController = new UserController();