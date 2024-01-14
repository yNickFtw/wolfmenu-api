import { IMenuProduct } from "../IMenuProduct";

export interface IMenuProductRepository {
    create(menuProduct: Partial<IMenuProduct>): Promise<void>;
    findByMenuCategoryIdAndProductId(menuCategoryId: string, productId: string): Promise<IMenuProduct | null>;
    countAllMenuProductsHasInMenuCategory(menuCategoryId: string, menuId: string): Promise<number>;
}