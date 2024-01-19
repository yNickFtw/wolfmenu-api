import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllProductsByCategoryIdUseCase } from "../../../shared/interfaces/modules/product/useCases/IFindAllProductsByCategoryIdUseCase";
import FindAllProductsByCategoryIdUseCase from "../useCases/find-all-products-by-categoryId-useCase";

export default class FindAllProductsByCategoryIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { categoryId, page, totalRows } = req.params

            const instanceOfFindAllProductsByCategoryIdUseCase = container.resolve<IFindAllProductsByCategoryIdUseCase>(FindAllProductsByCategoryIdUseCase)

            const data = await instanceOfFindAllProductsByCategoryIdUseCase.execute(token, categoryId, parseInt(page), parseInt(totalRows));

            return res.status(200).json(data);
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
