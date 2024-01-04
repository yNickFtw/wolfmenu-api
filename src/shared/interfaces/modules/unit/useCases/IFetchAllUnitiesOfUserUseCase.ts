export interface IFetchAllUnitiesOfUserUseCase {
    execute(token: string): Promise<IUnit[] | []>;
}
