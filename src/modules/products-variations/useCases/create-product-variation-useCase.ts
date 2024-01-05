import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { ICreateProductVariationUseCase } from "../../../shared/interfaces/modules/products-variations/useCases/ICreateProductVariationUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IProductsVariationsRepository } from "../../../shared/interfaces/modules/products-variations/repository/IProductsVariationsRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IProductsVariations } from "../../../shared/interfaces/modules/products-variations/IProductsVariations";

@injectable()
export default class CreateProductVariationUseCase implements ICreateProductVariationUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("ProductsVariationsRepository")
        private ProductsVariationsRepository: IProductsVariationsRepository,
        @inject("JWTService")
        private JWTService: IJWTService
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(name: string, description: string, price: string, productId: string, token: string): Promise<void> {
        if(!name || !description || !price || !productId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos!"
            };

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const product = await this.ProductRepository.findById(productId);

        if(!product) {
            const error: IAppError = {
                statusCode: 404,
                message: "Produto não encontrado, verifique se você selecionou o produto corretamente!"
            };

            throw error;
        }

        const newVariation: Partial<IProductsVariations> = {
            name,
            description,
            price,
            productId,
            userId
        }

        await this.ProductsVariationsRepository.create(newVariation);

        return;
    }
}
