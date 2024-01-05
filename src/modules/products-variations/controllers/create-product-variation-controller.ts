import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateProductVariationUseCase } from "../../../shared/interfaces/modules/products-variations/useCases/ICreateProductVariationUseCase";
import CreateProductVariationUseCase from "../useCases/create-product-variation-useCase";

export default class CreateProductVariationController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, price, productId } = req.body

            const token = req.headers["authorization"] as string;

            const instanceOfCreateProductVariationUseCase = container.resolve<ICreateProductVariationUseCase>(CreateProductVariationUseCase)

            await instanceOfCreateProductVariationUseCase.execute(name, description, price, productId, token);

            return res.status(200).json({ message: "Variação de produto criada com sucesso!" });
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
