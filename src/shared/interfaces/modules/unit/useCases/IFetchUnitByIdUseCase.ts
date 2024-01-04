export interface IFetchUnitByIdUseCase {
    execute(token: string, unitId: string): Promise<IUnit | null>;
}
