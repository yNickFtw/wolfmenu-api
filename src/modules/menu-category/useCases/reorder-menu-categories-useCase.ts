import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IReorderMenuCategoriesUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IReorderMenuCategoriesUseCase";
import { IUnitRepository } from "../../../shared/interfaces/modules/unit/repository/IUnitRepository";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class ReorderMenuCategoriesUseCase implements IReorderMenuCategoriesUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository,
        @inject("UnitRepository")
        private UnitRepository: IUnitRepository
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(menu_categories: any[], token: string, unitId: string): Promise<void> {
        const { userId } = this.JWTService.decodeToken(token, true);

        const unit = await this.UnitRepository.findById(unitId);

        if (!unit) {
            const error: IAppError = {
                statusCode: 404,
                message: "Unidade não encontrada."
            };

            throw error;
        }

        if (userId !== unit.userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para trocar as posições das categorias desta unidade."
            };

            throw error;
        }

        menu_categories.forEach(async (menu_category) => {
            await this.MenuCategoryRepository.update({ position: menu_category.position }, menu_category.id)
        })

        return;
    }
}
