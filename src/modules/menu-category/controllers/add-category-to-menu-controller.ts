import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IAddCategoryToMenuUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IAddCategoryToMenuUseCase";
import AddCategoryToMenuUseCase from "../useCases/add-category-to-menu-useCase";

export default class AddCategoryToMenuController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { categoryId } = req.body;

            const { menuId } = req.params;

            const instanceOfAddCategoryToMenuUseCase = container.resolve<IAddCategoryToMenuUseCase>(AddCategoryToMenuUseCase)

            await instanceOfAddCategoryToMenuUseCase.execute(token, categoryId, menuId);

            return res.status(201).json({ message: "Categoria adicionada com sucesso ao cardápio." });
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
