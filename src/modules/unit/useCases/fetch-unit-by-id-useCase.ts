import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFetchUnitByIdUseCase } from "../../../shared/interfaces/modules/unit/useCases/IFetchUnitByIdUseCase";
import { IUnit } from "../../../shared/interfaces/modules/unit/IUnit";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FetchUnitByIdUseCase implements IFetchUnitByIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string): Promise<IUnit | null> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada"
            }

            throw error;
        }

        if(unit?.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não é o dono desta unidade."
            }

            throw error;
        }

        return unit;
    }
}
