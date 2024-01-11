export interface IFindAllMenuCategoriesUseCase {
    execute(token: string, menuId: string): Promise<IMenuCategory[] | []>;
}
