import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { ICreateMenuByUnitIdUseCase } from "../../../shared/interfaces/modules/menu/useCases/ICreateMenuByUnitIdUseCase";
import CreateMenuByUnitIdUseCase from "../useCases/create-menu-by-unitId-useCase";

export default class CreateMenuByUnitIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const { description, bannerColor } = req.body

            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const file = req.file;

            const instanceOfCreateMenuByUnitIdUseCase = container.resolve<ICreateMenuByUnitIdUseCase>(CreateMenuByUnitIdUseCase)

            await instanceOfCreateMenuByUnitIdUseCase.execute(token, description, bannerColor, file, unitId);

            return res.status(201).json({ message: "Cardápio criado com sucesso." });
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
