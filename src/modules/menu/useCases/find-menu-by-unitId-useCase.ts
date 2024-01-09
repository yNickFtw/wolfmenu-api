import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindMenuByUnitIdUseCase } from "../../../shared/interfaces/modules/menu/useCases/IFindMenuByUnitIdUseCase";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IMenu } from "../../../shared/interfaces/modules/menu/IMenu";

@injectable()
export default class FindMenuByUnitIdUseCase implements IFindMenuByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService, 
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository, 
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string): Promise<IMenu> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada"
            };

            throw error;
        }

        if(unit.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para criar uma categoria nesta unidade."
            };

            throw error;
        }

        const menu = await this.MenuRepository.findByUnitId(unitId);

        return menu;
    }
}
