import { IMenuCategory } from "../../../shared/interfaces/modules/menu-category/IMenuCategory";
import { IMenuCategoryRepository } from "../../../shared/interfaces/modules/menu-category/repository/IMenuCategoryRepository";
import { MenuProduct } from "../../menu-product/entity/menu-product.schema";
import { Product } from "../../product/entity/product.schema";
import { MenuCategory } from "../entity/menu-category.schema";

export default class MenuCategoryRepository implements IMenuCategoryRepository {
    public async create(menuCategory: Partial<IMenuCategory>): Promise<void> {
        await MenuCategory.create({ ...menuCategory });

        return
    }

    public async findByCategoryIdAndMenuId(categoryId: string, menuId: string): Promise<IMenuCategory | null> {
        const menuCategory = await MenuCategory.findOne({ where: { categoryId: categoryId, menuId: menuId } });

        return menuCategory as unknown as IMenuCategory;
    }

    public async countCategoriesFromMenu(menuId: string): Promise<number> {
        const count = await MenuCategory.count({ where: { menuId: menuId } });

        return count;
    }

    public async findAllByMenuId(menuId: string): Promise<IMenuCategory[] | []> {
        const menuCategories = await MenuCategory.findAll({ where: { menuId: menuId }, include: [{ model: MenuProduct, include: [{ model: Product }] }] });

        return menuCategories as unknown as IMenuCategory[];
    }
}