import { IProductsVariations } from "../IProductsVariations";

export interface IFetchAllProductsVariationsUseCase {
    execute(token: string): Promise<IProductsVariations[] | []>;
}
