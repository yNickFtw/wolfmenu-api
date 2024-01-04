import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateCategoryUseCase } from "../../../shared/interfaces/modules/category/useCases/ICreateCategoryUseCase";
import CreateCategoryUseCase from "../useCases/create-category-useCase";

export default class CreateCategoryController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { name } = req.body
            
            const { unitId } = req.params;

            const instanceOfCreateCategoryUseCase = container.resolve<ICreateCategoryUseCase>(CreateCategoryUseCase)

            await instanceOfCreateCategoryUseCase.execute(name, unitId, req.headers["authorization"]!);

            return res.status(201).json({ message: "Categoria criada com sucesso" });
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
