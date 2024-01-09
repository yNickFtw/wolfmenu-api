import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllProductsByUnitIdUseCase } from "../../../shared/interfaces/modules/product/useCases/IFindAllProductsByUnitIdUseCase";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { FindAllProductsByUnitIdDTO } from "../../../shared/interfaces/modules/product/promises/FindAllProductsByUnitIdDTO";

@injectable()
export default class FindAllProductsByUnitIdUseCase implements IFindAllProductsByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string, page: number, totalRows: number): Promise<FindAllProductsByUnitIdDTO> {
        const { userId } = this.JWTService.decodeToken(token, true);
        
        const user = await this.UserRepository.findById(userId)

        if(!user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente!"
            };

            throw error;
        }

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
                message: "Você não tem permissão nesta unidade"
            };

            throw error;
        }

        const { rows: products, count: totalCount  } = await this.ProductRepository.findAndCountAll(unitId, page, totalRows);
        
        return { products, totalCount };
    }
}
