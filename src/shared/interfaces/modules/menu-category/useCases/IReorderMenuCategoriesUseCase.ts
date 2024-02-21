export interface IReorderMenuCategoriesUseCase {
    execute(menu_categories: any[], token: string, unitId: string): Promise<void>;
}
