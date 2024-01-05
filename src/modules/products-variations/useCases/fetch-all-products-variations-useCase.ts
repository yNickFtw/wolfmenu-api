import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFetchAllProductsVariationsUseCase } from "../../../shared/interfaces/modules/products-variations/useCases/IFetchAllProductsVariationsUseCase";
import { IProductsVariations } from "../../../shared/interfaces/modules/products-variations/IProductsVariations";
import { IProductsVariationsRepository } from "../../../shared/interfaces/modules/products-variations/repository/IProductsVariationsRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FetchAllProductsVariationsUseCase implements IFetchAllProductsVariationsUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("ProductsVariationsRepository")
        private ProductsVariationsRepository: IProductsVariationsRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string): Promise<IProductsVariations[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const productsVariations = await this.ProductsVariationsRepository.findAllByUserId(userId);

        return productsVariations;
    }
}
