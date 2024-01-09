import { IMenu } from "../IMenu";

export interface IFindMenuByUnitIdUseCase {
    execute(token: string, unitId: string): Promise<IMenu>;
}
