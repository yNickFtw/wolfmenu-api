import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IUserIsOwnerOfMenuUseCase } from "../../../shared/interfaces/modules/menu/useCases/IUserIsOwnerOfMenuUseCase";
import UserIsOwnerOfMenuUseCase from "../useCases/user-is-owner-of-menu-useCase";

export default class UserIsOwnerOfMenuController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { menuId } = req.params;

            const instanceOfUserIsOwnerOfMenuUseCase = container.resolve<IUserIsOwnerOfMenuUseCase>(UserIsOwnerOfMenuUseCase)

            const result = await instanceOfUserIsOwnerOfMenuUseCase.execute(token, menuId);

            return res.status(200).json({ userIsOwner: result });
        } catch (error: any) {
            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res
                    .status(500)
                    .json({
                        message:
                            "Estamos passando por instabilidades, tente novamente mais tarde!",
                        errorMessage: error.message
                    });
            }
        }
    }
}
