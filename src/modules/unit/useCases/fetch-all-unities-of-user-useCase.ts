import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFetchAllUnitiesOfUserUseCase } from "../../../shared/interfaces/modules/unit/useCases/IFetchAllUnitiesOfUserUseCase";
import { IUnit } from "../../../shared/interfaces/modules/unit/IUnit";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FetchAllUnitiesOfUserUseCase implements IFetchAllUnitiesOfUserUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository, 
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("JWTService")
        private JWTService: IJWTService,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<IUnit[] | []> {
        // Lógica do Caso de Uso
        const { userId } = this.JWTService.decodeToken(token, true);

        const unities = await this.UnitRepository.findAllByUserId(userId);

        return unities;
    }
}
