export interface IFindAllProductsByCategoryIdUseCase {
    execute(token: string, categoryId: string, page: number, totalRows: number): Promise<IFindAllProductsByCategoryIdDTO>;
}
