import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateProductUseCase } from "../../../shared/interfaces/modules/product/useCases/ICreateProductUseCase";
import CreateProductUseCase from "../useCases/create-product-useCase";

export default class CreateProductController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const instanceOfCreateProductUseCase = container.resolve<ICreateProductUseCase>(CreateProductUseCase)

            if(!req.file) {
                return res.status(400).json({ message: "Coloque uma imagem para teste" })
            }

            await instanceOfCreateProductUseCase.execute('oi', 'test', '532', '53425', req.file)

            return res.status(200).json({ message: "Produto criado com sucesso!" });
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
