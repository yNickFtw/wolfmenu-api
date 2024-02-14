import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IUpdatePositionsUseCase } from "../../../shared/interfaces/modules/link/useCases/IUpdatePositionsUseCase";
import UpdatePositionsUseCase from "../useCases/update-positions-useCase";

export default class UpdatePositionsController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const links = req.body;

            const { unitId } = req.params;

            const instanceOfUpdatePositionsUseCase = container.resolve<IUpdatePositionsUseCase>(UpdatePositionsUseCase)

            await instanceOfUpdatePositionsUseCase.execute(token, unitId, links);

            return res.status(200).json({ message: "Posição trocada com sucesso" });
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
