import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAddLinkUseCase } from "../../../shared/interfaces/modules/link/useCases/IAddLinkUseCase";
import { ILinkRepository } from "../../../shared/interfaces/modules/link/repository/ILinkRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { ILink } from "../../../shared/interfaces/modules/link/ILink";

@injectable()
export default class AddLinkUseCase implements IAddLinkUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("LinkRepository")
        private LinkRepository: ILinkRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string, title: string, url: string): Promise<void> {
        if (!title || !url) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            }

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        const countLinksByUnitId = await this.LinkRepository.countLinksByUnitId(unitId);

        console.log(countLinksByUnitId);

        const newLink: Partial<ILink> = {
            title: title,
            url: url,
            position: countLinksByUnitId + 1,
            userId: userId,
            unitId: unitId
        }

        await this.LinkRepository.create(newLink);

        return;
    }
}
