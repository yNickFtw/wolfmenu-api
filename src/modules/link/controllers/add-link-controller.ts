import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IAddLinkUseCase } from "../../../shared/interfaces/modules/link/useCases/IAddLinkUseCase";
import AddLinkUseCase from "../useCases/add-link-useCase";

export default class AddLinkController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params;

            const { title, url } = req.body;

            const instanceOfAddLinkUseCase = container.resolve<IAddLinkUseCase>(AddLinkUseCase)

            await instanceOfAddLinkUseCase.execute(token, unitId, title, url);

            return res.status(201).json({ message: "Link adicionado com sucesso." });
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
