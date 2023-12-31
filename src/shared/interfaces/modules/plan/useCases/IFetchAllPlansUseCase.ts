export interface IFetchAllPlansUseCase {
    execute(): Promise<IPlan[] | []>;
}
