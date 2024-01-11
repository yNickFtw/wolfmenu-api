export interface IAddProductToMenuCategoryUseCase {
    execute(token: string, menuCategoryId: string, productId: string, menuId: string): Promise<void>;
}
