import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAddProductToMenuCategoryUseCase } from "../../../shared/interfaces/modules/menu-product/useCases/IAddProductToMenuCategoryUseCase";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IMenuProductRepository } from "../../../shared/interfaces/modules/menu-product/repository/IMenuProductRepository";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMenuProduct } from "../../../shared/interfaces/modules/menu-product/IMenuProduct";

@injectable()
export default class AddProductToMenuCategoryUseCase implements IAddProductToMenuCategoryUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("ProductRepository")
        private ProductRepository: IProductRepository,
        @inject("MenuProductRepository")
        private MenuProductRepository: IMenuProductRepository,
        @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, menuCategoryId: string, productId: string, menuId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        if (!menuCategoryId || !productId) {
            const error: IAppError = {
                statusCode: 400,
                message: "Preencha todos os campos."
            };

            throw error;
        }

        const menuProductAlreadyExists = await this.MenuProductRepository.findByMenuCategoryIdAndProductId(menuCategoryId, productId);

        if (menuProductAlreadyExists) {
            const error: IAppError = {
                statusCode: 404,
                message: "Este produto já está cadastrado nesta categoria."
            };

            throw error;
        }

        const positions = await this.MenuProductRepository.countAllMenuProductsHasInMenuCategory(menuCategoryId, menuId)

        const createdMenuProduct: Partial<IMenuProduct> = {
            isHighlight: false,
            position: positions + 1,
            userId: userId,
            menuCategoryId: menuCategoryId,
            menuId: menuId,
        }

        await this.MenuProductRepository.create(createdMenuProduct);

        return;
    }
}
