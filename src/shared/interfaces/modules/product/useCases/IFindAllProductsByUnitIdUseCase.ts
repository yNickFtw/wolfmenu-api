import { FindAllProductsByUnitIdDTO } from "../promises/FindAllProductsByUnitIdDTO";

export interface IFindAllProductsByUnitIdUseCase {
    execute(token: string, unitId: string, page: number, totalRows: number): Promise<FindAllProductsByUnitIdDTO>;
}
