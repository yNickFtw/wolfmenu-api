import { ICategory } from "../ICategory";

export interface ICategoryRepository {
    create(category: Partial<ICategory>): Promise<void>;
    countCategoriesByUnitId(unitId: string): Promise<number>;
    findAllCategoriesByUnitId(unitId: string): Promise<any>;
}