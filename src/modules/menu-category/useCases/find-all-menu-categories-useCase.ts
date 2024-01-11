import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IFindAllMenuCategoriesUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IFindAllMenuCategoriesUseCase";
import { IMenuCategory } from "../../../shared/interfaces/modules/menu-category/IMenuCategory";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class FindAllMenuCategoriesUseCase implements IFindAllMenuCategoriesUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, menuId: string): Promise<IMenuCategory[] | []> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const menu = await this.MenuRepository.findById(menuId);

        if(!menu) {
            const error: IAppError = {
                statusCode: 404,
                message: "Cardápio não encontrado."
            };

            throw error;
        }

        if(menu.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para acessar informações desta cardápio."
            };

            throw error;
        }

        const menuCategories = await this.MenuCategoryRepository.findAllByMenuId(menuId);

        return menuCategories;
    }
}
