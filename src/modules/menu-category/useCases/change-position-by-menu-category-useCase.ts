import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/interfaces/globals/IAppError";
import { IChangePositionByMenuCategoryUseCase } from "../../../shared/interfaces/modules/menu-category/useCases/IChangePositionByMenuCategoryUseCase";
import { IMenuRepository } from "../../../shared/interfaces/modules/menu/repository/IMenuRepository";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { IJWTService } from "../../../shared/services/JWTService/IJWTService";

@injectable()
export default class ChangePositionByMenuCategoryUseCase implements IChangePositionByMenuCategoryUseCase, IAppError {
    statusCode: number;
    message: string;

    constructor(
        @inject("JWTService")
        private JWTService: IJWTService,
        @inject("MenuCategoryRepository")
        private MenuCategoryRepository: IMenuCategoryRepository,
        @inject("MenuRepository")
        private MenuRepository: IMenuRepository,
    ) {
        this.statusCode = 400;
        this.message = "";
    }

    public async execute(token: string, menuCategoryId: string, menuCategoryIdToChange: string, menuId: string, arrow: string): Promise<void> {
        if (!arrow) {
            const error: IAppError = {
                statusCode: 400,
                message: "Ocorreu um erro, tente novamente mais tarde."
            }

            throw error;
        }

        const { userId } = this.JWTService.decodeToken(token, true);

        const menu = await this.MenuRepository.findById(menuId);

        if (!menu) {
            const error: IAppError = {
                statusCode: 404,
                message: "Ocorreu um erro, tente novamente mais tarde."
            };

            throw error;
        }

        if (menu.userId !== userId) {
            const error: IAppError = {
                statusCode: 403,
                message: "Você não tem permissão para alterar a posição deste menu"
            };

            throw error;
        }

        const menuCategory = await this.MenuCategoryRepository.findById(menuCategoryId);

        if (!menuCategory) {
            const error: IAppError = {
                statusCode: 404,
                message: "Ocorreu um erro, tente novamente mais tarde."
            };

            throw error;
        }

        const menuCategoryToChange = await this.MenuCategoryRepository.findById(menuCategoryIdToChange);

        if (!menuCategoryToChange) {
            const error: IAppError = {
                statusCode: 404,
                message: "Ocorreu um erro, tente novamente mais tarde."
            };

            throw error;
        }

        if (arrow !== "up" && arrow !== "down") {
            const error: IAppError = {
                statusCode: 400,
                message: "Ocorreu um erro, tente novamente mais tarde."
            };

            throw error;
        }

        const [menuCategoryUpdated, menuCategoryToUpdated] = await Promise.all([
            await this.MenuCategoryRepository.update({ position: menuCategoryToChange.position }, menuCategoryId),
            await this.MenuCategoryRepository.update({ position: menuCategory.position }, menuCategoryIdToChange)
        ])

        return;
    }
}
