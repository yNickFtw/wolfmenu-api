import { IProductsVariations } from "../IProductsVariations";

export interface IProductsVariationsRepository {
  create(productVariation: Partial<IProductsVariations>): Promise<void>;
  findAllByUserId(userId: string): Promise<IProductsVariations[] | []>;
}
