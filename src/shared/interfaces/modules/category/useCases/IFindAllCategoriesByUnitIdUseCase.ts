import { ICategory } from "../ICategory";

export interface IFindAllCategoriesByUnitIdUseCase {
    execute(token: string, unitId: string, page: number): Promise<any>;
}
