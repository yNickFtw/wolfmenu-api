import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllCategoriesByUnitIdUseCase } from "../../../shared/interfaces/modules/category/useCases/IFindAllCategoriesByUnitIdUseCase";
import FindAllCategoriesByUnitIdUseCase from "../useCases/find-all-categories-by-unitId-useCase";

export default class FindAllCategoriesByUnitIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { unitId, page } = req.params
            const token = req.headers["authorization"] as string;

            const instanceOfFindAllCategoriesByUnitIdUseCase = container.resolve<IFindAllCategoriesByUnitIdUseCase>(FindAllCategoriesByUnitIdUseCase)

            const categories = await instanceOfFindAllCategoriesByUnitIdUseCase.execute(token, unitId, parseInt(page));

            return res.status(200).json(categories);
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
