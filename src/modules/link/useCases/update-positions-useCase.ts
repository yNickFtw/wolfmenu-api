import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IUpdatePositionsUseCase } from "../../../shared/interfaces/modules/link/useCases/IUpdatePositionsUseCase";
import { OrderLinkDTO } from "../../../shared/interfaces/modules/link/useCases/OrderLinkDTO";
import { ILinkRepository } from "../../../shared/interfaces/modules/link/repository/ILinkRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";

@injectable()
export default class UpdatePositionsUseCase implements IUpdatePositionsUseCase, IAppError {
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

    public async execute(token: string, unitId: string, links: OrderLinkDTO[]): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            }

            throw error;
        }

        if(userId !== unit.userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão de trocar links de posições nesta unidade."
            }

            throw error;
        }

        links.forEach(async (link) => {
            await this.LinkRepository.updatePositionByLinkId(link.id, link.position)
        })

        return
    }
}
