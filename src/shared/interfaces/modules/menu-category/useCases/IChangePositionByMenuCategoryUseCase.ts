export interface IChangePositionByMenuCategoryUseCase {
    execute(token: string, menuCategoryId: string, menuCategoryIdToChange: string, menuId: string, arrow: string): Promise<void>;
}
