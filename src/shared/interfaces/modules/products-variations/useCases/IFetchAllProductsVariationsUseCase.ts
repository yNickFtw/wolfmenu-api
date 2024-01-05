export interface IFetchAllProductsVariationsUseCase {
    execute(token: string): Promise<IProductsVariations[] | []>;
}
