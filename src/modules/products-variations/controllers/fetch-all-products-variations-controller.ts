import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFetchAllProductsVariationsUseCase } from "../../../shared/interfaces/modules/products-variations/useCases/IFetchAllProductsVariationsUseCase";
import FetchAllProductsVariationsUseCase from "../useCases/fetch-all-products-variations-useCase";

export default class FetchAllProductsVariationsController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const instanceOfFetchAllProductsVariationsUseCase = container.resolve<IFetchAllProductsVariationsUseCase>(FetchAllProductsVariationsUseCase)

            const productsVariations = await instanceOfFetchAllProductsVariationsUseCase.execute(token);

            return res.status(200).json(productsVariations);
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
