import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateProductUseCase } from "../../../shared/interfaces/modules/product/useCases/ICreateProductUseCase";
import CreateProductUseCase from "../useCases/create-product-useCase";

export default class CreateProductController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, categoryId } = req.body;

            const token = req.headers["authorization"] as string;
            
            const instanceOfCreateProductUseCase = container.resolve<ICreateProductUseCase>(CreateProductUseCase)
            
            const file: Express.Multer.File | undefined = req.file;

            if(!file) {
                return res.status(400).json({ message: "Você precisa adicionar uma imagem para este produto!" })
            }

            await instanceOfCreateProductUseCase.execute(name, description, categoryId, file, token)

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
