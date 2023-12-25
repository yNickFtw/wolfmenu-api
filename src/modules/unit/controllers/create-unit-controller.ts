import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateUnitUseCase } from "../../../shared/interfaces/modules/unit/useCases/ICreateUnitUseCase";
import CreateUnitUseCase from "../useCases/create-unit-useCase";

export default class CreateUnitController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;
            
            const { name, slug } = req.body
            
            const instanceOfCreateUnitUseCase = container.resolve<ICreateUnitUseCase>(CreateUnitUseCase);

            await instanceOfCreateUnitUseCase.execute(name, slug, token);

            return res.status(201).json({ message: "Unidade criada com sucesso" });
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
