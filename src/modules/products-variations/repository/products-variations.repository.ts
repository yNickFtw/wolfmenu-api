import { IProductsVariations } from "../../../shared/interfaces/modules/products-variations/IProductsVariations";
import { IProductsVariationsRepository } from "../../../shared/interfaces/modules/products-variations/repository/IProductsVariationsRepository";
import { ProductsVariations } from "../entity/products-variations.schema";

export default class ProductsVariationsRepository implements IProductsVariationsRepository {
    public async create(productVariation: Partial<IProductsVariations>): Promise<void> {
        await ProductsVariations.create(productVariation);

        return;
    }

    public async findAllByUserId(userId: string): Promise<IProductsVariations[] | []> {
        const productsVariations = await ProductsVariations.findAll({ where: { userId: userId } });

        return productsVariations as unknown as IProductsVariations[];
    }
}