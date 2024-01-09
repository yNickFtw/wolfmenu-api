import { IProduct } from "../../../shared/interfaces/modules/product/IProduct";
import { IProductRepository } from "../../../shared/interfaces/modules/product/repository/IProductRepository";
import { Product } from "../entity/product.schema";

export default class ProductRepository implements IProductRepository {
    public async create(product: Partial<IProduct>): Promise<IProduct> {
        const productCreated = await Product.create({ ...product });

        return productCreated as unknown as IProduct;
    }

    public async findAllProductsByCategoryId(categoryId: string): Promise<IProduct[] | []> {
        const products = await Product.findAll({ where: { categoryId: categoryId } });

        return products as unknown as IProduct[];
    }

    public async countAllProductsByCategoryId(categoryId: string): Promise<number> {
        const productsQtd = await Product.count({ where: { categoryId: categoryId } });

        return productsQtd;
    }

    public async findById(productId: string): Promise<IProduct | null> {
        const product = await Product.findOne({ where: { id: productId } });

        return product as unknown as IProduct;
    }

    public async findAndCountAll(unitId: string, page: number, perPage: number): Promise<any> {
        const offset = (page - 1) * perPage;

        const products = await Product.findAndCountAll({
            where: { unitId: unitId },
            limit: perPage,
            offset: offset,
            order: [
                ["createdAt", "DESC"]
            ]
        })

        return products
    }

    public async countAllProductsByUnitId(unitId: string): Promise<number> {
        const products = await Product.count({ where: { unitId: unitId } });

        return products;
    }
}