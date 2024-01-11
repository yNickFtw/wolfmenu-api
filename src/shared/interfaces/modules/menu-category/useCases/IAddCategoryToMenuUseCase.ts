export interface IAddCategoryToMenuUseCase {
    execute(token: string, categoryId: string, menuId: string): Promise<void>;
}
