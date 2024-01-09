import { IProduct } from "../IProduct";

export interface IProductRepository {
    create(product: Partial<IProduct>): Promise<IProduct>;
    findAllProductsByCategoryId(categoryId: string): Promise<IProduct[] | []>;
    countAllProductsByCategoryId(categoryId: string): Promise<number>;
    countAllProductsByUnitId(unitId: string): Promise<number>;
    findById(productId: string): Promise<IProduct | null>;
    findAndCountAll(unitId: string, page: number, perPage: number): Promise<any>
}