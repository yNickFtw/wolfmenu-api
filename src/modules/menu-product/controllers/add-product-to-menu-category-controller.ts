import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IAddProductToMenuCategoryUseCase } from "../../../shared/interfaces/modules/menu-product/useCases/IAddProductToMenuCategoryUseCase";
import AddProductToMenuCategoryUseCase from "../useCases/add-product-to-menu-category-useCase";

export default class AddProductToMenuCategoryController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfAddProductToMenuCategoryUseCase = container.resolve<IAddProductToMenuCategoryUseCase>(AddProductToMenuCategoryUseCase)

            return res.status(200).json();
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
