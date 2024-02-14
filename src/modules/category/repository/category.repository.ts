import { ICategory } from "../../../shared/interfaces/modules/category/ICategory";
import { ICategoryRepository } from "../../../shared/interfaces/modules/category/repository/ICategoryRepository";
import { Product } from "../../product/entity/product.schema";
import { Category } from "../entity/category.schema";
import database from "../../../database/config";
import { QueryTypes, Sequelize } from "sequelize";

export default class CategoryRepository implements ICategoryRepository {
    public async create(category: Partial<ICategory>): Promise<void> {
        await Category.create({ ...category });

        return
    }

    public async countCategoriesByUnitId(unitId: string): Promise<number> {
        const categoriesQtd = Category.count({ where: { unitId: unitId } });

        return categoriesQtd;
    }

    public async findAllCategoriesByUnitId(unitId: string, page: number = 1, perPage: number): Promise<any> {
        const offset = (page - 1) * perPage;

        const categories = await Category.findAndCountAll({
            where: { unitId: unitId },
            limit: perPage,
            offset: offset,
            attributes: {
                include: [
                    [
                        Sequelize.literal('(SELECT COUNT(*) FROM products WHERE products.categoryId = Category.id)'),
                        'countProducts'
                    ]
                ],
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return categories;
    }

    public async findById(categoryId: string): Promise<ICategory | null> {
        const category = await Category.findOne({ where: { id: categoryId } });

        return category as unknown as ICategory;
    }

}