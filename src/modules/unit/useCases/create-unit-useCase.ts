import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateUnitUseCase } from "../../../shared/interfaces/modules/unit/useCases/ICreateUnitUseCase";
import { ISMTPService } from "../../../shared/services/SMTPService/ISMTPService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { container } from "tsyringe";
import { IUnit } from "../../../shared/interfaces/modules/unit/IUnit";

@injectable()
export default class CreateUnitUseCase implements ICreateUnitUseCase, IAppError {
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

    public async execute(name: string, slug: string, token: string): Promise<void> {
        if(!token) {
            const error: IAppError = {
                statusCode: 401,
                message: "Token expirado, faça login novamente!"
            };

            throw error;
        }
        
        if(!name || !slug) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos!"
            };

            throw error;
        }

        if(name.length > 35) {
            const error: IAppError = {
                statusCode: 400,
                message: "O nome da unidade não pode ser maior que 20 caracteres."
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);
        
        if(!userId) {
            const error: IAppError = {
                statusCode: 401,
                message: "Token expirado, faça login novamente!"
            };

            throw error;
        }

        const user = await this.UserRepository.findById(userId)
        
        if(!user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Token expirado, faça login novamente!"
            };

            throw error;
        }

        const unit = await this.UnitRepository.findBySlug(slug)

        if(unit) {
            const error: IAppError = {
                statusCode: 400,
                message: "Já existe uma unidade com esta identificação."
            };

            throw error;
        }

        const unitCreated: Partial<IUnit> = {
            name: name,
            slug: slug,
            userId: userId
        }
        
        await this.UnitRepository.create(unitCreated);

        return;
    }
}
