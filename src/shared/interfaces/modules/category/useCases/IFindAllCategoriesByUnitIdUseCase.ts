import { ICategory } from "../ICategory";

export interface IFindAllCategoriesByUnitIdUseCase {
    execute(token: string, unitId: string): Promise<any>;
}
