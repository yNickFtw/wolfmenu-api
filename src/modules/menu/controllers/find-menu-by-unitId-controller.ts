import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindMenuByUnitIdUseCase } from "../../../shared/interfaces/modules/menu/useCases/IFindMenuByUnitIdUseCase";
import FindMenuByUnitIdUseCase from "../useCases/find-menu-by-unitId-useCase";

export default class FindMenuByUnitIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const instanceOfFindMenuByUnitIdUseCase = container.resolve<IFindMenuByUnitIdUseCase>(FindMenuByUnitIdUseCase)

            const menu = await instanceOfFindMenuByUnitIdUseCase.execute(token, unitId);

            return res.status(200).json(menu);
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
