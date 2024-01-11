import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAddProductToMenuCategoryUseCase } from "../../../shared/interfaces/modules/menu-product/useCases/IAddProductToMenuCategoryUseCase";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IMenuProductRepository } from "../../../shared/interfaces/modules/menu-product/repository/IMenuProductRepository";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class AddProductToMenuCategoryUseCase implements IAddProductToMenuCategoryUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService, @inject("ProductRepository")
        private ProductRepository: IProductRepository, @inject("MenuProductRepository")
        private MenuProductRepository: IMenuProductRepository, @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, menuCategoryId: string, productId: string, menuId: string): Promise<void> {
        // Lógica do Caso de Uso
    }
}
