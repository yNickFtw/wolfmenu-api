import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IReorderMenuCategoriesUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IReorderMenuCategoriesUseCase";
import ReorderMenuCategoriesUseCase from "../useCases/reorder-menu-categories-useCase";

export default class ReorderMenuCategoriesController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const menu_categories = req.body

            const instanceOfReorderMenuCategoriesUseCase = container.resolve<IReorderMenuCategoriesUseCase>(ReorderMenuCategoriesUseCase)

            await instanceOfReorderMenuCategoriesUseCase.execute(menu_categories, token, unitId);

            return res.status(200).json({ message: "Posições trocadas com sucesso." });
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
