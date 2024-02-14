import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IFindAllLinksByUnitIdUseCase } from "../../../shared/interfaces/modules/link/useCases/IFindAllLinksByUnitIdUseCase";
import FindAllLinksByUnitIdUseCase from "../useCases/find-all-links-by-unit-id-useCase";

export default class FindAllLinksByUnitIdController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const instanceOfFindAllLinksByUnitIdUseCase = container.resolve<IFindAllLinksByUnitIdUseCase>(FindAllLinksByUnitIdUseCase)

            const links = await instanceOfFindAllLinksByUnitIdUseCase.execute(token, unitId);

            return res.status(200).json(links);
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
