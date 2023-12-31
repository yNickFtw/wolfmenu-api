import { IProduct } from "../IProduct";

export interface IProductRepository {
    create(product: Partial<IProduct>): Promise<void>;
    findAllProductsByCategoryId(categoryId: string): Promise<IProduct[] | []>;
    countAllProductsByCategoryId(categoryId: string): Promise<number>;
}