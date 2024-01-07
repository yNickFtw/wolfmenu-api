import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllCategoriesByUnitIdUseCase } from "../../../shared/interfaces/modules/category/useCases/IFindAllCategoriesByUnitIdUseCase";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";
import { FindAllCategoriesByUnitIdDTO } from "../../../shared/interfaces/modules/category/promise/FindAllCategoriesByUnitIdDTO";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";

@injectable()
export default class FindAllCategoriesByUnitIdUseCase implements IFindAllCategoriesByUnitIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string, page: number): Promise<FindAllCategoriesByUnitIdDTO> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const user = await this.UserRepository.findById(userId);

        if(!user) {
            const error: IAppError = {
                statusCode: 401,
                message: "Sessão expirada, faça login novamente"
            };
            
            throw error;
        }

        const unit = await this.UnitRepository.findById(unitId);

        if(unit?.userId !== userId) {
            const error: IAppError = {
                statusCode: 404,
                message: "Você não tem permissão para ver as categorias desta unidade."
            };

            throw error;
        }

        const { rows: categories, count: totalCount } = await this.CategoryRepository.findAllCategoriesByUnitId(unitId, page, 5);

        return { categories, totalCount };
    }
}
