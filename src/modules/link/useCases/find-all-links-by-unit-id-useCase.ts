import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllLinksByUnitIdUseCase } from "../../../shared/interfaces/modules/link/useCases/IFindAllLinksByUnitIdUseCase";
import { ILink } from "../../../shared/interfaces/modules/link/ILink";
import { ILinkRepository } from "../../../shared/interfaces/modules/link/repository/ILinkRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";

@injectable()
export default class FindAllLinksByUnitIdUseCase implements IFindAllLinksByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("LinkRepository")
        private LinkRepository: ILinkRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string): Promise<ILink[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        if(userId !== unit.userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão de acessar os links desta unidade."
            };

            throw error;
        }

        return await this.LinkRepository.findAllLinksByUnitId(unitId);
    }
}
