import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/globals/IController";
import { container } from "tsyringe";
import { IChangeBannerImageUseCase } from "../../../shared/interfaces/modules/menu/useCases/IChangeBannerImageUseCase";
import ChangeBannerImageUseCase from "../useCases/change-banner-image-useCase";

export default class ChangeBannerImageController implements IController {
    public async execute(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers["authorization"] as string;

            const { bannerColor } = req.body
            
            const { menuId } = req.params;

            const file = req.file

            const instanceOfChangeBannerImageUseCase = container.resolve<IChangeBannerImageUseCase>(ChangeBannerImageUseCase)

            await instanceOfChangeBannerImageUseCase.execute(token, bannerColor, file, menuId);

            return res.status(200).json({ message: "Banner alterado com sucesso." });
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
