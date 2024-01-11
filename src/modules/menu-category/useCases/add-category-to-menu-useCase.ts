import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IAddCategoryToMenuUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IAddCategoryToMenuUseCase";
import { IUserRepository } from "../../../shared/interfaces/modules/user/repository/IUserRepository";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IMenuCategory } from "../../../shared/interfaces/modules/menu-category/IMenuCategory";

@injectable()
export default class AddCategoryToMenuUseCase implements IAddCategoryToMenuUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("CategoryRepository")
        private CategoryRepository: ICategoryRepository,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
        @inject("UserRepository")
        private UserRepository: IUserRepository,
        @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, categoryId: string, menuId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const category = await this.CategoryRepository.findById(categoryId);

        if (!category) {
            const error: IAppError = {
                statusCode: 404,
                message: "Categoria não encontrada."
            };

            throw error;
        }

        const menu = await this.MenuRepository.findById(menuId);

        if (!menu) {
            const error: IAppError = {
                statusCode: 404,
                message: "Categoria não encontrada."
            };

            throw error;
        }

        const menuCategoryExists = await this.MenuCategoryRepository.findByCategoryIdAndMenuId(categoryId, menuId);

        if(menuCategoryExists) {
            const error: IAppError = {
                statusCode: 400,
                message: "Esta categoria já está cadastrada no cardápio."
            };

            throw error;
        }

        const countCategories = await this.MenuCategoryRepository.countCategoriesFromMenu(menuId);

        const addCategoryToMenu: Partial<IMenuCategory> = {
            position: countCategories + 1,
            userId: userId,
            categoryId: categoryId,
            menuId: menuId
        }

        await this.MenuCategoryRepository.create(addCategoryToMenu);

        return;
    }
}
