import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllMenuCategoriesUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IFindAllMenuCategoriesUseCase";
import FindAllMenuCategoriesUseCase from "../useCases/find-all-menu-categories-useCase";

export default class FindAllMenuCategoriesController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;
            const { menuId } = req.params;

            const instanceOfFindAllMenuCategoriesUseCase = container.resolve<IFindAllMenuCategoriesUseCase>(FindAllMenuCategoriesUseCase);
            const categories = await instanceOfFindAllMenuCategoriesUseCase.execute(token, menuId);

            return res.status(200).json(categories);
        } catch (error: any) {
            console.error('Erro no controlador:', error);

            if (error.statusCode && error.message) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res.status(500).json({
                    message: "Estamos passando por instabilidades, tente novamente mais tarde!",
                    errorMessage: error.message || "Erro interno no servidor",
                });
            }
        }
    }

}
