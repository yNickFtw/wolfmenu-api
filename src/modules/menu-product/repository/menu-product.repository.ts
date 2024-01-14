import { IMenuProduct } from "../../../shared/interfaces/modules/menu-product/IMenuProduct";
import { IMenuProductRepository } from "../../../shared/interfaces/modules/menu-product/repository/IMenuProductRepository";
import { MenuProduct } from "../entity/menu-product.schema";

export default class MenuProductRepository implements IMenuProductRepository {
    public async create(menuProduct: Partial<IMenuProduct>): Promise<void> {
        await MenuProduct.create({ ...menuProduct });

        return;
    }

    public async findByMenuCategoryIdAndProductId(menuCategoryId: string, productId: string): Promise<IMenuProduct | null> {
        const menuProduct = await MenuProduct.findOne({ where: { menuCategoryId: menuCategoryId, productId: productId } });

        return menuProduct as unknown as IMenuProduct;
    }

    public async countAllMenuProductsHasInMenuCategory(menuCategoryId: string, menuId: string): Promise<number> {
        const counts = await MenuProduct.count({ where: { menuCategoryId: menuCategoryId, menuId: menuId } });

        return counts;
    }
}