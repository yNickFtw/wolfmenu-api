import { IMenuCategory } from "../IMenuCategory";

export interface IFindAllMenuCategoriesUseCase {
    execute(token: string, menuId: string): Promise<any>;
}
