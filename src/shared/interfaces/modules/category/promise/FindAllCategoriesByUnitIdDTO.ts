import { ICategory } from "../ICategory";

export interface FindAllCategoriesByUnitIdDTO {
    categories: ICategory[];
    totalCount: number;
}