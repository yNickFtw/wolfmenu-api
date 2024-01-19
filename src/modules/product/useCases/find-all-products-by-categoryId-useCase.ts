import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllProductsByCategoryIdUseCase } from "../../../shared/interfaces/modules/product/useCases/IFindAllProductsByCategoryIdUseCase";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IFindAllProductsByCategoryIdDTO } from "../../../shared/interfaces/modules/product/promises/IFindAllProductsByCategoryIdDTO";

@injectable()
export default class FindAllProductsByCategoryIdUseCase implements IFindAllProductsByCategoryIdUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, categoryId: string, page: number, totalRows: number): Promise<IFindAllProductsByCategoryIdDTO> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const category = await this.CategoryRepository.findById(categoryId);

        if(!category) {
            const error: IAppError = {
                statusCode: 404,
                message: "Categoria não encontrada, tente novamente mais tarde."
            };

            throw error;
        }

        if(category.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para acessar os produtos desta categoria."
            };

            throw error;
        }

        const { rows: products, count: totalCount } = await this.ProductRepository.findAllByCategoryId(categoryId, page, totalRows);

        return { products, totalCount };
    }
}