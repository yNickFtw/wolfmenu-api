import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IChangePositionByMenuCategoryUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IChangePositionByMenuCategoryUseCase";
import ChangePositionByMenuCategoryUseCase from "../useCases/change-position-by-menu-category-useCase";

export default class ChangePositionByMenuCategoryController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { menuId, menuCategoryId, menuCategoryIdToChange } = req.params

            const { arrow } = req.body;

            const instanceOfChangePositionByMenuCategoryUseCase = container.resolve<IChangePositionByMenuCategoryUseCase>(ChangePositionByMenuCategoryUseCase)

            instanceOfChangePositionByMenuCategoryUseCase.execute(token, menuCategoryId, menuCategoryIdToChange, menuId, arrow);

            return res.status(200).json({ message: "Posição alterada com sucesso" });
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
