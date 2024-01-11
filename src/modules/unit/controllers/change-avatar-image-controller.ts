import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IChangeAvatarImageUseCase } from "../../../shared/interfaces/modules/unit/useCases/IChangeAvatarImageUseCase";
import ChangeAvatarImageUseCase from "../useCases/change-avatar-image-useCase";

export default class ChangeAvatarImageController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { unitId } = req.params

            const instanceOfChangeAvatarImageUseCase = container.resolve<IChangeAvatarImageUseCase>(ChangeAvatarImageUseCase)

            const file = req.file

            await instanceOfChangeAvatarImageUseCase.execute(token, file, unitId);

            return res.status(200).json({ message: "Avatar alterado com sucesso." });
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
