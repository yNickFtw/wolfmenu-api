import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllProductsByUnitIdUseCase } from "../../../shared/interfaces/modules/product/useCases/IFindAllProductsByUnitIdUseCase";
import FindAllProductsByUnitIdUseCase from "../useCases/find-all-product-by-unitId-useCase";

export default class FindAllProductsByUnitIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { unitId, page, totalRows } = req.params

            const token = req.headers["authorization"] as string;

            const instanceOfFindAllProductsByUnitIdUseCase = container.resolve<IFindAllProductsByUnitIdUseCase>(FindAllProductsByUnitIdUseCase)

            const products = await instanceOfFindAllProductsByUnitIdUseCase.execute(token, unitId, parseInt(page), parseInt(totalRows));

            return res.status(200).json(products);
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
