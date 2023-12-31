import { IProduct } from "../../../shared/interfaces/modules/product/IProduct";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { Product } from "../entity/product.schema";

export default class ProductRepository implements IProductRepository {
    public async create(product: Partial<IProduct>): Promise<void> {
        await Product.create({ ...product });

        return;
    }

    public async findAllProductsByCategoryId(categoryId: string): Promise<IProduct[] | []> {
        const products = await Product.findAll({ where: { categoryId:categoryId } });

        return products as unknown as IProduct[];
    }

    public async countAllProductsByCategoryId(categoryId: string): Promise<number> {
        const productsQtd = await Product.count({ where: { categoryId: categoryId } });

        return productsQtd;
    }
}