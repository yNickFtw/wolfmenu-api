import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreatePlanUseCase } from "../../../shared/interfaces/modules/plan/useCases/ICreatePlanUseCase";
import CreatePlanUseCase from "../useCases/create-plan-useCase";

export default class CreatePlanController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            // Lógica do Controller
            const { name, price } = req.body;

            const instanceOfCreatePlanUseCase = container.resolve<ICreatePlanUseCase>(CreatePlanUseCase)

            await instanceOfCreatePlanUseCase.execute(name, price);

            return res.status(201).json({ message: "Plano criado com sucesso" });
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
