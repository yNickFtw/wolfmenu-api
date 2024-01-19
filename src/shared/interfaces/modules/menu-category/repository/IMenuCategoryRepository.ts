import { IMenuCategory } from "../IMenuCategory";

export interface IMenuCategoryRepository {
    create(menuCategory: Partial<IMenuCategory>): Promise<void>;
    findByCategoryIdAndMenuId(categoryId: string, menuId: string): Promise<IMenuCategory | null>;
    countCategoriesFromMenu(menuId: string): Promise<number>;
    findAllByMenuId(menuId: string): Promise<IMenuCategory[] | []>;
    findById(id: string): Promise<IMenuCategory | null>;
    findByPosition(menuId: string, position: number): Promise<IMenuCategory | null>;
    update(menuCategory: Partial<IMenuCategory>, menuCategoryId: string): Promise<void>;
}