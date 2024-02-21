import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IDashboardInfoUseCase } from "../../../shared/interfaces/modules/unit/useCases/IDashboardInfoUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { DashboardInfoDTO } from "../../../shared/interfaces/modules/unit/promises/DashboardInfoDTO";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { ILinkRepository } from "../../../shared/interfaces/modules/link/repository/ILinkRepository";

@injectable()
export default class DashboardInfoUseCase implements IDashboardInfoUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("LinkRepository")
        private LinkRepository: ILinkRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, unitId: string): Promise<DashboardInfoDTO> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if(!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        if(unit.userId !== userId) {
            const error: IAppError = {
                statusCode: 404,
                message: "Você não tem permissão para ver os dados desta unidade."
            };

            throw error;
        }

        const categories = await this.CategoryRepository.countCategoriesByUnitId(unitId);

        const products = await this.ProductRepository.countAllProductsByUnitId(unitId);

        const links = await this.LinkRepository.countLinksByUnitId(unitId);

        return { categories, products, links };
    }
}
